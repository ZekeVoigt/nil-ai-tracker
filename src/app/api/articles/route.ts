import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true
      },
      include: {
        athlete: true,
        nilDeal: true,
        tags: {
          include: {
            tag: true
          }
        }
      },
      orderBy: {
        publishedAt: 'desc'
      }
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 