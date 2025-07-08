import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST() {
  try {
    console.log('🧪 Creating test NIL deal and generating article...')
    
    // Create a test athlete
    const { data: existingAthlete } = await supabase
      .from('Athlete')
      .select('*')
      .eq('name', 'Jordan Smith')
      .eq('school', 'University of Alabama')
      .single()

    let athlete = existingAthlete

    if (!athlete) {
      const { data: newAthlete, error: athleteError } = await supabase
        .from('Athlete')
        .insert({
          name: "Jordan Smith",
          sport: "Football",
          school: "University of Alabama",
          position: "Quarterback",
          year: "Junior",
          verified: true
        })
        .select()
        .single()

      if (athleteError) throw athleteError
      athlete = newAthlete
    }

    // Create a test NIL deal
    const { data: nilDeal, error: dealError } = await supabase
      .from('NILDeal')
      .insert({
        title: "Jordan Smith Signs Major NIL Deal with Nike",
        description: "Alabama quarterback Jordan Smith announces partnership with Nike for exclusive apparel and training gear deal.",
        dealValue: "$250,000",
        dealType: "Endorsement",
        brand: "Nike",
        announcementDate: new Date().toISOString(),
        sourceUrl: "https://example.com/nil-deal",
        verified: true,
        confidence: 0.95,
        status: 'pending',
        processed: false,
        sourceType: 'news',
        rawData: JSON.stringify({
          source: "Test Deal",
          timestamp: new Date().toISOString()
        }),
        athleteId: athlete.id
      })
      .select()
      .single()

    if (dealError) throw dealError

    console.log('✅ Test NIL deal created, generating article...')

    // Generate article using Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Write a comprehensive 600-800 word SEO-optimized article about this NIL deal:

Title: ${nilDeal.title}
Athlete: ${athlete.name} - ${athlete.position}, ${athlete.school}
Brand: ${nilDeal.brand}
Deal Value: ${nilDeal.dealValue}
Deal Type: ${nilDeal.dealType}

Include:
- Detailed analysis of the deal's significance
- Background on the athlete and their achievements
- Impact on college sports and NIL landscape
- What this means for future deals
- SEO-friendly structure with subheadings

Format as a professional sports journalism article.`

    const result = await model.generateContent(prompt)
    const articleContent = result.response.text()

    // Create article slug
    const slug = nilDeal.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Insert article
    const { data: article, error: articleError } = await supabase
      .from('Article')
      .insert({
        title: nilDeal.title,
        content: articleContent,
        excerpt: nilDeal.description,
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
      .select()
      .single()

    if (articleError) throw articleError

    // Mark deal as processed
    const { error: updateError } = await supabase
      .from('NILDeal')
      .update({ 
        processed: true,
        status: 'published'
      })
      .eq('id', nilDeal.id)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      message: "Test NIL deal and article created successfully!",
      data: {
        athlete: athlete.name,
        deal: nilDeal.title,
        dealValue: nilDeal.dealValue,
        article: {
          title: article.title,
          slug: article.slug,
          wordCount: article.wordCount,
          url: `http://localhost:3000/articles/${article.slug}`
        }
      }
    })
  } catch (error) {
    console.error('❌ Test error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test NIL Deal Generator',
    endpoint: '/api/test-nil',
    method: 'POST',
    description: 'Creates a sample NIL deal and generates an article to demonstrate the AI system'
  })
} 