"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    excerpt: string | null
    slug: string
    publishedAt: Date | null
    readingTime: number | null
    athlete: {
      name: string
      sport: string
      school: string
    } | null
    nilDeal: {
      dealValue: string | null
      dealType: string
      brand: string | null
    } | null
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="group hover:bg-zinc-50 transition-all duration-300 border-zinc-200 h-full">
        <CardHeader className="pb-4">
          <h3 className="font-light text-xl leading-tight text-black group-hover:text-zinc-700 transition-colors line-clamp-2">
            <a href={`/articles/${article.slug}`} className="hover:underline">
              {article.title}
            </a>
          </h3>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Athlete Info */}
          {article.athlete && (
            <div className="mb-4">
              <p className="font-medium text-sm text-black">
                {article.athlete.name}
              </p>
              <p className="text-xs text-zinc-600">
                {article.athlete.sport} • {article.athlete.school}
              </p>
            </div>
          )}

          {/* Article Excerpt */}
          {article.excerpt && (
            <p className="text-zinc-600 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
              {article.excerpt}
            </p>
          )}

          {/* Deal Value */}
          {article.nilDeal && article.nilDeal.dealValue && (
            <div className="mb-4">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium">
                Deal Value
              </p>
              <p className="text-sm font-medium text-black">
                {article.nilDeal.dealValue}
              </p>
            </div>
          )}

          {/* Article Meta */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mt-auto">
            <div className="flex items-center space-x-3">
              {article.readingTime && (
                <span>{article.readingTime} min read</span>
              )}
            </div>
            
            {article.publishedAt && (
              <span>
                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 