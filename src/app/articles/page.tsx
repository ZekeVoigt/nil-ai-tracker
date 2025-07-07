'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  excerpt: string
  slug: string
  wordCount: number
  readingTime: number
  publishedAt: string
  aiModel: string
  athlete: {
    name: string
    sport: string
    school: string
  }
  nilDeal: {
    dealValue?: string
    dealType: string
    brand?: string
  }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }
      const data = await response.json()
      setArticles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-black border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-black hover:text-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-light">Student Athlete Income</span>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-light text-black leading-tight mb-4">
            NIL Articles
          </h1>
          <p className="text-xl text-zinc-600 font-light">
            AI-generated analysis of the latest name, image, and likeness deals
          </p>
        </motion.header>

        {/* Articles Grid */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-zinc-600 mb-4">{error}</p>
            <button 
              onClick={fetchArticles}
              className="text-black hover:text-zinc-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h2 className="text-xl font-light text-black mb-2">No articles yet</h2>
            <p className="text-zinc-600">
              AI-generated articles will appear here as NIL deals are detected.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/articles/${article.slug}`}>
                  <div className="border border-zinc-200 rounded-lg p-6 hover:border-black transition-colors duration-300">
                    {/* Article Header */}
                    <div className="mb-4">
                      <h2 className="text-xl font-light text-black group-hover:text-zinc-600 transition-colors leading-tight mb-3">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Deal Info */}
                    <div className="bg-zinc-50 rounded p-3 mb-4 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-3 h-3 text-zinc-500" />
                        <span className="font-medium">{article.athlete.name}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-600">{article.athlete.sport}</span>
                      </div>
                      <div className="text-zinc-600">
                        {article.nilDeal.dealType}
                        {article.nilDeal.brand && ` with ${article.nilDeal.brand}`}
                        {article.nilDeal.dealValue && ` • ${article.nilDeal.dealValue}`}
                      </div>
                    </div>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <div className="flex items-center gap-4">
                        <span>{formatDate(article.publishedAt)}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readingTime} min
                        </div>
                      </div>
                      <span className="text-zinc-400">
                        {article.aiModel}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
} 