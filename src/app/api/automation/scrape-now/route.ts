import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { adminDb } from '@/lib/supabase-admin'
import { GoogleGenerativeAI } from '@google/generative-ai'
import FirecrawlApp from '@mendable/firecrawl-js'

// Real-time NIL monitoring sources
const NIL_SOURCES = [
  'https://www.espn.com/college-sports/',
  'https://www.on3.com/nil/',
  'https://247sports.com/college/',
  'https://theathletic.com/college-football/',
  'https://www.sportico.com/tag/nil/',
  'https://www.on3.com/college/news/',
  'https://www.si.com/college/',
  'https://www.cbssports.com/college-football/',
  'https://www.espn.com/college-football/',
  'https://www.espn.com/mens-college-basketball/'
]

export async function POST() {
  try {
    console.log('🕷️ Starting real-time NIL deal scraping...')

    // Initialize services
    const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY! })
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    let scrapedDeals: any[] = []
    let generatedArticles: any[] = []

    // Scrape each source for NIL content
    for (const url of NIL_SOURCES) {
      try {
        console.log(`📡 Scraping: ${url}`)
        
        const scrapeResult = await firecrawl.scrapeUrl(url, {
          formats: ['markdown'],
          onlyMainContent: true
        })

        if (scrapeResult.success && (scrapeResult as any).data?.markdown) {
          // Analyze content for NIL deals using AI
          const analysisPrompt = `You are an expert sports journalist analyzing content for NIL (Name, Image, Likeness) deals. Look for ANY mentions of:

- Student athletes signing with brands, companies, or sponsors
- Endorsement deals, partnerships, or sponsorships involving college athletes
- Social media collaborations, merchandise deals, or appearance fees
- Any athlete-brand relationships or commercial agreements
- Athletes partnering with businesses, apps, or products
- Collectibles, trading cards, or memorabilia deals involving current college athletes
- Any financial arrangements between college athletes and external entities

Content to analyze:
${(scrapeResult as any).data.markdown.slice(0, 4000)}

For each NIL deal found (be liberal in detection), provide:
{
  "athleteName": "Full name",
  "school": "University name", 
  "brand": "Company/Brand name",
  "sport": "Sport played",
  "dealValue": "Amount if mentioned or 'Undisclosed'",
  "dealType": "Type of deal (endorsement, partnership, social media, etc.)",
  "confidence": 0.6-0.95 (be generous with confidence for any athlete-brand mention)
}

Return as JSON array. Look carefully for ANY athlete-brand connections, partnerships, or commercial activities.`

          const analysisResult = await model.generateContent(analysisPrompt)
          let analysisText = analysisResult.response.text()
          
          // Clean up markdown formatting
          analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
          
          try {
            const detectedDeals = JSON.parse(analysisText)
            
            if (Array.isArray(detectedDeals) && detectedDeals.length > 0) {
              console.log(`✅ Found ${detectedDeals.length} potential NIL deals from ${url}`)
              
              for (const deal of detectedDeals) {
                if (deal.confidence && deal.confidence >= 0.60) {
                  scrapedDeals.push({
                    ...deal,
                    sourceUrl: url,
                    scrapedAt: new Date().toISOString()
                  })
                }
              }
            }
          } catch (parseError) {
            console.log(`⚠️ Could not parse AI analysis for ${url}`)
          }
        }
      } catch (scrapeError) {
        console.log(`❌ Error scraping ${url}:`, scrapeError)
      }
    }

    console.log(`🎯 Found ${scrapedDeals.length} high-confidence NIL deals`)

    // Process each detected deal
    for (const dealData of scrapedDeals) {
      try {
        // Check if athlete exists, create if not
        let athlete = await adminDb.findAthlete(dealData.athleteName, dealData.school)

        if (!athlete) {
          athlete = await adminDb.createAthlete({
            name: dealData.athleteName,
            sport: dealData.sport || 'Unknown',
            school: dealData.school || 'Unknown',
            verified: false
          })
          console.log(`✅ Created new athlete: ${dealData.athleteName}`)
        }

        // Check if deal already exists
        const existingDeal = await adminDb.findNILDeal(athlete.id, dealData.brand)

        if (existingDeal) {
          console.log(`⏭️ Deal already exists for ${dealData.athleteName} with ${dealData.brand}`)
          continue
        }

        // Create new NIL deal
        const dealTitle = `${dealData.athleteName} Signs NIL Deal with ${dealData.brand}`
        
        const nilDeal = await adminDb.createNILDeal({
          title: dealTitle,
          description: `${dealData.athleteName} announces new partnership with ${dealData.brand}`,
          dealValue: dealData.dealValue || 'Undisclosed',
          dealType: dealData.dealType || 'Partnership',
          brand: dealData.brand,
          announcementDate: new Date().toISOString(),
          sourceUrl: dealData.sourceUrl,
          verified: dealData.confidence >= 0.9,
          confidence: dealData.confidence,
          status: 'pending',
          processed: false,
          sourceType: 'automated_scraping',
          athleteId: athlete.id
        })

        console.log(`✅ Created NIL deal: ${dealTitle}`)

        // Generate article for the deal
        const articlePrompt = `Write a comprehensive 700-900 word SEO-optimized news article about this NIL deal:

Title: ${dealTitle}
Athlete: ${dealData.athleteName}
School: ${dealData.school}
Sport: ${dealData.sport}
Brand: ${dealData.brand}
Deal Value: ${dealData.dealValue || 'Undisclosed'}
Deal Type: ${dealData.dealType}

Include:
- Engaging headline and lead paragraph
- Background on the athlete and their achievements
- Details about the partnership and what it includes
- Analysis of the deal's significance in college sports
- Impact on NIL landscape and future opportunities
- Quotes analysis (create realistic commentary)
- SEO-friendly subheadings
- Professional sports journalism tone

Write as if this just happened and is breaking news.`

        const articleResult = await model.generateContent(articlePrompt)
        const articleContent = articleResult.response.text()

        // Create article slug
        const slug = dealTitle.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
          .substring(0, 100)

        // Insert article
        const article = await adminDb.createArticle({
          title: dealTitle,
          content: articleContent,
          excerpt: `${dealData.athleteName} announces new NIL partnership with ${dealData.brand}, marking another significant deal in college sports.`,
          slug: slug,
          wordCount: articleContent.split(' ').length,
          readingTime: Math.ceil(articleContent.split(' ').length / 200),
          published: true,
          publishedAt: new Date().toISOString(),
          aiGenerated: true,
          aiModel: 'gemini-1.5-flash',
          nilDealId: nilDeal.id,
          athleteId: athlete.id
        })

        console.log(`✅ Created article: ${article.title}`)

        // Mark deal as processed
        await adminDb.updateNILDeal(nilDeal.id, { 
          processed: true,
          status: 'published'
        })

        generatedArticles.push({
          title: article.title,
          slug: article.slug,
          athlete: dealData.athleteName,
          brand: dealData.brand,
          url: `https://studentathleteincome.com/articles/${article.slug}`
        })

        console.log(`📰 Generated article: ${dealTitle}`)

      } catch (dealError) {
        console.error(`❌ Error processing deal for ${dealData.athleteName}:`, dealError)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Real-time scraping complete! Found ${scrapedDeals.length} deals, generated ${generatedArticles.length} articles`,
      data: {
        scrapedDeals: scrapedDeals.length,
        generatedArticles: generatedArticles.length,
        articles: generatedArticles,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Real-time scraping error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Real-Time NIL Deal Scraper',
    endpoint: '/api/automation/scrape-now',
    method: 'POST',
    description: 'Scrapes live sports websites for NIL deals and automatically generates articles',
    sources: NIL_SOURCES
  })
} 