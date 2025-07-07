import { NextRequest, NextResponse } from 'next/server'
import { nilDetector } from '@/lib/services/nil-detector'
import { articleGenerator } from '@/lib/services/article-generator'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting NIL detection and article generation automation...')
    
    // Verify webhook secret for security
    const authHeader = request.headers.get('authorization')
    const expectedSecret = process.env.WEBHOOK_SECRET
    
    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Step 1: Detect and save new NIL deals
    console.log('Step 1: Detecting NIL deals...')
    const results = await nilDetector.detectNewNILDeals()
    
    // Step 2: Generate articles for verified deals
    console.log('Step 2: Generating articles...')
    await articleGenerator.generatePendingArticles()
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      stats: {
        dealsDetected: results.detected,
        dealsVerified: results.verified,
        message: 'NIL detection and article generation completed successfully'
      }
    }
    
    console.log('✅ Automation completed:', response.stats)
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('❌ Automation error:', error)
    
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
    message: 'NIL Detection API - Use POST to trigger automation',
    endpoint: '/api/automation/detect-nil',
    method: 'POST',
    description: 'Automatically detects NIL deals and generates articles'
  })
} 