import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Verify webhook secret (for security)
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.WEBHOOK_SECRET || 'nil-automation-2025'}`
    
    if (authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🔔 Webhook triggered: Starting scheduled NIL monitoring...')

    // Trigger the monitoring cycle
    const monitorResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/automation/monitor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const monitorResult = await monitorResponse.json()

    console.log('✅ Webhook completed:', monitorResult)

    return NextResponse.json({
      success: true,
      message: 'Scheduled monitoring completed via webhook',
      result: monitorResult,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Webhook error:', error)
    
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
    message: 'NIL Automation Webhook',
    endpoint: '/api/webhook/cron',
    method: 'POST',
    description: 'Webhook for scheduled NIL deal monitoring',
    authentication: 'Bearer token required',
    usage: 'Can be called by cron jobs, Vercel cron, or other scheduling services'
  })
} 