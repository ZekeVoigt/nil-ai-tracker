'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Tag, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  metaTitle: string
  metaDescription: string
  keywords: string
  wordCount: number
  readingTime: number
  publishedAt: string
  aiModel: string
  athlete: {
    name: string
    sport: string
    school: string
    position?: string
    year?: string
  }
  nilDeal: {
    title: string
    dealValue?: string
    dealType: string
    brand?: string
  }
  tags: Array<{
    tag: {
      name: string
      slug: string
    }
  }>
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: PageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticle()
  }, [params.slug])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.slug}`)
      if (!response.ok) {
        throw new Error('Article not found')
      }
      const data = await response.json()
      setArticle(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load article')
    } finally {
      setLoading(false)
    }
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

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-black mb-4">Article Not Found</h1>
          <p className="text-zinc-600 mb-8">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-black hover:text-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatContent = (content: string) => {
    // Convert markdown-style content to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/### (.*?)(\n|$)/g, '<h3 class="text-xl font-light text-black mt-8 mb-4">$1</h3>')
      .replace(/## (.*?)(\n|$)/g, '<h2 class="text-2xl font-light text-black mt-10 mb-6">$1</h2>')
      .replace(/\n\n/g, '</p><p class="mb-6">')
      .replace(/^/, '<p class="mb-6">')
      .replace(/$/, '</p>')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-black hover:text-zinc-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-light">Student Athlete Income</span>
          </Link>
        </div>
      </nav>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-light text-black leading-tight mb-6">
            {article.title}
          </h1>
          
          {article.excerpt && (
            <p className="text-xl text-zinc-600 font-light leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 border-b border-zinc-100 pb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedAt)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readingTime} min read
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.athlete.name}
            </div>
            <div className="text-zinc-400">
              {article.wordCount} words • Generated by {article.aiModel}
            </div>
          </div>
        </motion.header>

        {/* Athlete & Deal Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-50 rounded-lg p-6 mb-12"
        >
          <h2 className="text-lg font-light text-black mb-4">Deal Details</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-500">Athlete:</span>
              <p className="font-medium">{article.athlete.name}</p>
              <p className="text-zinc-600">{article.athlete.position} • {article.athlete.year}</p>
              <p className="text-zinc-600">{article.athlete.school}</p>
            </div>
            <div>
              <span className="text-zinc-500">Deal:</span>
              <p className="font-medium">{article.nilDeal.dealType}</p>
              {article.nilDeal.brand && <p className="text-zinc-600">with {article.nilDeal.brand}</p>}
              {article.nilDeal.dealValue && <p className="text-zinc-600">Value: {article.nilDeal.dealValue}</p>}
            </div>
          </div>
        </motion.section>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          <div 
            className="text-zinc-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />
        </motion.div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-zinc-100"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((articleTag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded-full"
                >
                  {articleTag.tag.name}
                </span>
              ))}
            </div>
          </motion.footer>
        )}
      </article>
    </div>
  )
} 