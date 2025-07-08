import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('🔄 Starting automated NIL monitoring cycle...')

    // Trigger the scraping automation
    const scrapeResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/automation/scrape-now`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const scrapeResult = await scrapeResponse.json()

    // Log the monitoring activity
    await supabase
      .from('ProcessingLog')
      .insert({
        status: scrapeResult.success ? 'completed' : 'failed',
        message: scrapeResult.message,
        errorDetails: scrapeResult.success ? null : scrapeResult.error,
        processingTime: new Date().toISOString(),
        metadata: JSON.stringify({
          scrapedDeals: scrapeResult.data?.scrapedDeals || 0,
          generatedArticles: scrapeResult.data?.generatedArticles || 0,
          timestamp: new Date().toISOString()
        })
      })

    return NextResponse.json({
      success: true,
      message: 'Monitoring cycle completed',
      data: {
        monitoringTime: new Date().toISOString(),
        scrapeResult: scrapeResult,
        nextRun: 'In 30 minutes'
      }
    })

  } catch (error) {
    console.error('❌ Monitoring error:', error)
    
    // Log the error
    await supabase
      .from('ProcessingLog')
      .insert({
        status: 'failed',
        message: 'Monitoring cycle failed',
        errorDetails: error instanceof Error ? error.message : 'Unknown error',
        processingTime: new Date().toISOString()
      })
    
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
  try {
    // Get recent monitoring logs
    const { data: logs } = await supabase
      .from('ProcessingLog')
      .select('*')
      .order('processingTime', { ascending: false })
      .limit(10)

    // Get stats
    const { data: totalDeals } = await supabase
      .from('NILDeal')
      .select('id', { count: 'exact', head: true })

    const { data: totalArticles } = await supabase
      .from('Article')
      .select('id', { count: 'exact', head: true })

    const { data: recentDeals } = await supabase
      .from('NILDeal')
      .select(`
        *,
        athlete:Athlete(*)
      `)
      .order('announcementDate', { ascending: false })
      .limit(5)

    return NextResponse.json({
      message: 'NIL Monitoring Status',
      monitoring: {
        active: true,
        frequency: 'Every 30 minutes',
        sources: [
          'ESPN College Sports',
          'On3 NIL',
          '247Sports',
          'The Athletic',
          'Sportico NIL'
        ]
      },
      stats: {
        totalDeals: totalDeals?.length || 0,
        totalArticles: totalArticles?.length || 0,
        recentActivity: logs || []
      },
      recentDeals: recentDeals || []
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get monitoring status' },
      { status: 500 }
    )
  }
} 