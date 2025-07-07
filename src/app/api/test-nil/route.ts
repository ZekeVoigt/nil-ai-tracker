import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { articleGenerator } from '@/lib/services/article-generator'

export async function POST() {
  try {
    console.log('🧪 Creating test NIL deal and generating article...')
    
    // Create a test athlete
    let athlete = await prisma.athlete.findFirst({
      where: {
        name: "Jordan Smith",
        school: "University of Alabama"
      }
    })

    if (!athlete) {
      athlete = await prisma.athlete.create({
        data: {
          name: "Jordan Smith",
          sport: "Football",
          school: "University of Alabama",
          position: "Quarterback",
          year: "Junior",
          verified: true
        }
      })
    }

    // Create a test NIL deal
    const nilDeal = await prisma.nILDeal.create({
      data: {
        title: "Jordan Smith Signs Major NIL Deal with Nike",
        description: "Alabama quarterback Jordan Smith announces partnership with Nike for exclusive apparel and training gear deal.",
        dealValue: "$250,000",
        dealType: "Endorsement",
        brand: "Nike",
        announcementDate: new Date(),
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
      }
    })

    console.log('✅ Test NIL deal created, generating article...')

    // Generate article for this deal
    await articleGenerator.generateArticleForDeal({
      ...nilDeal,
      athlete: athlete
    })

    // Mark as processed
    await prisma.nILDeal.update({
      where: { id: nilDeal.id },
      data: { 
        processed: true,
        status: 'published'
      }
    })

    // Get the generated article
    const article = await prisma.article.findFirst({
      where: { nilDealId: nilDeal.id },
      include: {
        athlete: true,
        nilDeal: true
      }
    })

    return NextResponse.json({
      success: true,
      message: "Test NIL deal and article created successfully!",
      data: {
        athlete: athlete.name,
        deal: nilDeal.title,
        dealValue: nilDeal.dealValue,
        article: article ? {
          title: article.title,
          slug: article.slug,
          wordCount: article.wordCount,
          url: `http://localhost:3000/articles/${article.slug}`
        } : null
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