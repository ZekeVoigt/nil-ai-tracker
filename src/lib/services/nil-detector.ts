import { prisma } from '@/lib/database'
import { GoogleGenerativeAI } from '@google/generative-ai'
import FirecrawlApp from '@mendable/firecrawl-js'

interface NILDealDetection {
  athlete: string
  title: string
  description: string
  dealValue?: string
  dealType: string
  brand?: string
  school?: string
  sport?: string
  confidence: number
  sourceUrl: string
  rawText: string
}

export class NILDetector {
  private firecrawl: FirecrawlApp
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    this.firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  /**
   * Monitor multiple sources for new NIL deals
   */
  async detectNewNILDeals(): Promise<{ detected: number; verified: number }> {
    console.log('🔍 Starting NIL deal detection across sources...')

    const sources = [
      'https://www.espn.com/college-sports/story/_/id/nil',
      'https://www.on3.com/nil/',
      'https://247sports.com/nil-deals/',
      'https://www.athleticbusiness.com/recruiting/nil',
      'https://www.sportico.com/personalities/nil/'
    ]

    let totalDetected = 0
    let totalVerified = 0

    for (const sourceUrl of sources) {
      try {
        console.log(`📡 Scanning ${sourceUrl}...`)
        
        const scrapedData = await this.scrapeSource(sourceUrl)
        const detections = await this.analyzeContent(scrapedData, sourceUrl)
        
        totalDetected += detections.length

        for (const detection of detections) {
          if (detection.confidence >= 0.85) {
            await this.saveNILDeal(detection)
            totalVerified++
          }
        }

        // Rate limit to be respectful
        await new Promise(resolve => setTimeout(resolve, 3000))
      } catch (error) {
        console.error(`Error processing ${sourceUrl}:`, error)
      }
    }

    console.log(`✅ Detection complete: ${totalDetected} detected, ${totalVerified} verified`)
    return { detected: totalDetected, verified: totalVerified }
  }

  /**
   * Scrape content from a source using Firecrawl
   */
  private async scrapeSource(url: string): Promise<string> {
    try {
      const scrapeResult = await this.firecrawl.scrapeUrl(url, {
        formats: ['markdown'],
        onlyMainContent: true
      })

      if ('markdown' in scrapeResult) {
        return scrapeResult.markdown || ''
      }
      return ''
    } catch (error) {
      console.error(`Scraping error for ${url}:`, error)
      return ''
    }
  }

  /**
   * Analyze scraped content for NIL deals using Gemini
   */
  private async analyzeContent(content: string, sourceUrl: string): Promise<NILDealDetection[]> {
    if (!content || content.length < 100) {
      return []
    }

    try {
      const prompt = `You are an expert at detecting NIL (Name, Image, Likeness) deals in sports content. Analyze the following content and extract any legitimate NIL deals mentioned.

For each NIL deal found, provide details in this JSON format:
{
  "deals": [
    {
      "athlete": "Full athlete name",
      "title": "Brief description of the deal",
      "description": "Detailed description",
      "dealValue": "Dollar amount if mentioned, or null",
      "dealType": "Type (Endorsement, Appearance, Social Media, etc.)",
      "brand": "Company/brand name if mentioned",
      "school": "University/college if mentioned",
      "sport": "Sport if mentioned",
      "confidence": 0.95
    }
  ]
}

CONTENT TO ANALYZE:
${content.substring(0, 8000)}

Rules:
1. Only include LEGITIMATE NIL deals, not rumors or speculation
2. Confidence should be 0.0-1.0 (1.0 = absolutely certain)
3. Only include deals with confidence >= 0.75
4. If no deals found, return {"deals": []}
5. Respond ONLY with valid JSON`

      const result = await this.model.generateContent(prompt)
      const responseText = result.response.text()

      try {
        // Clean up markdown formatting from Gemini response
        const cleanedText = responseText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim()
        
        const parsed = JSON.parse(cleanedText)
        
        return (parsed.deals || []).map((deal: any) => ({
          ...deal,
          sourceUrl,
          rawText: content.substring(0, 1000)
        }))
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError)
        return []
      }
    } catch (error) {
      console.error('Error analyzing content:', error)
      return []
    }
  }

  /**
   * Save verified NIL deal to database
   */
  private async saveNILDeal(detection: NILDealDetection): Promise<void> {
    try {
      // Find or create athlete
      let athlete = await prisma.athlete.findFirst({
        where: {
          name: detection.athlete,
          school: detection.school || undefined
        }
      })

      if (!athlete) {
        athlete = await prisma.athlete.create({
          data: {
            name: detection.athlete,
            sport: detection.sport || 'Unknown',
            school: detection.school || 'Unknown',
            verified: false
          }
        })
      }

      // Check if deal already exists
      const existingDeal = await prisma.nILDeal.findFirst({
        where: {
          title: detection.title,
          athleteId: athlete.id
        }
      })

      if (existingDeal) {
        console.log(`Deal already exists: ${detection.title}`)
        return
      }

      // Create new NIL deal
      await prisma.nILDeal.create({
        data: {
          title: detection.title,
          description: detection.description,
          dealValue: detection.dealValue,
          dealType: detection.dealType,
          brand: detection.brand,
          announcementDate: new Date(),
          sourceUrl: detection.sourceUrl,
          verified: true,
          confidence: detection.confidence,
          status: 'pending',
          processed: false,
          sourceType: 'ai_detected',
          rawData: JSON.stringify({
            rawText: detection.rawText,
            detectionTime: new Date().toISOString()
          }),
          athleteId: athlete.id
        }
      })

      console.log(`✅ Saved NIL deal: ${detection.athlete} - ${detection.title}`)
    } catch (error) {
      console.error('Error saving NIL deal:', error)
    }
  }

  /**
   * Verify deal authenticity using cross-reference
   */
  private async verifyDealAuthenticity(detection: NILDealDetection): Promise<boolean> {
    try {
      const prompt = `Verify if this NIL deal is legitimate and authentic:

Athlete: ${detection.athlete}
Deal: ${detection.title}
Brand: ${detection.brand || 'N/A'}
Value: ${detection.dealValue || 'N/A'}
Source: ${detection.sourceUrl}

Based on the information provided, is this a legitimate NIL deal? Consider:
1. Source credibility
2. Deal details consistency
3. Athlete and brand alignment
4. Realistic deal value

Respond with only "VERIFIED" or "REJECTED" followed by a confidence score 0.0-1.0`

      const result = await this.model.generateContent(prompt)
      const response = result.response.text()

      return response.includes('VERIFIED') && parseFloat(response.split(' ')[1] || '0') >= 0.8
    } catch (error) {
      console.error('Error verifying deal:', error)
      return false
    }
  }
}

export const nilDetector = new NILDetector() 