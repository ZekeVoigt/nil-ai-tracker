import { prisma } from '@/lib/database'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface ArticleData {
  title: string
  content: string
  excerpt: string
  slug: string
  metaTitle: string
  metaDescription: string
  keywords: string
  wordCount: number
  readingTime: number
  featuredImage?: string
}

export class ArticleGenerator {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  /**
   * Generate articles for all unprocessed NIL deals
   */
  async generatePendingArticles(): Promise<void> {
    console.log('📝 Starting article generation for pending NIL deals...')

    const pendingDeals = await prisma.nILDeal.findMany({
      where: {
        processed: false,
        status: 'pending',
        verified: true
      },
      include: {
        athlete: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`Found ${pendingDeals.length} pending deals to process`)

    for (const deal of pendingDeals) {
      try {
        await this.generateArticleForDeal(deal)
        
        // Mark deal as processed
        await prisma.nILDeal.update({
          where: { id: deal.id },
          data: { 
            processed: true,
            status: 'published'
          }
        })

        // Add small delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (error) {
        console.error(`Error generating article for deal ${deal.id}:`, error)
        
        // Mark as failed
        await prisma.nILDeal.update({
          where: { id: deal.id },
          data: { status: 'rejected' }
        })
      }
    }
  }

  /**
   * Generate a comprehensive article for a specific NIL deal
   */
  async generateArticleForDeal(deal: any): Promise<void> {
    console.log(`Generating article for: ${deal.athlete.name} - ${deal.title}`)

    // Research additional context about the athlete and deal
    const context = await this.gatherDealContext(deal)
    
    // Generate the article
    const articleData = await this.createArticleContent(deal, context)
    
    // Save to database
    await this.saveArticle(articleData, deal)
    
    console.log(`✅ Article generated: ${articleData.title}`)
  }

  /**
   * Gather additional context about the deal and athlete
   */
  private async gatherDealContext(deal: any): Promise<string> {
    try {
      const prompt = `You are a sports journalist researching context for a NIL deal article. Provide relevant background information about the athlete, their sport, their school, and the significance of this type of deal. Focus on factual, newsworthy context that would enhance an article.

Research context for this NIL deal:

Athlete: ${deal.athlete.name}
Sport: ${deal.athlete.sport}
School: ${deal.athlete.school}
Position: ${deal.athlete.position || 'N/A'}
Year: ${deal.athlete.year || 'N/A'}
Deal: ${deal.title}
Deal Type: ${deal.dealType}
Brand: ${deal.brand || 'N/A'}
Deal Value: ${deal.dealValue || 'Undisclosed'}

Provide relevant context about:
1. The athlete's background and achievements
2. The significance of this deal in college sports
3. The brand/company involved
4. Current NIL landscape trends
5. Impact on the athlete's sport/school

Keep responses factual and avoid speculation.`

      const result = await this.model.generateContent(prompt)
      return result.response.text() || ''
    } catch (error) {
      console.error('Error gathering context:', error)
      return ''
    }
  }

  /**
   * Create comprehensive article content
   */
  private async createArticleContent(
    deal: any, 
    context: string
  ): Promise<ArticleData> {
    try {
      const prompt = `You are a professional sports journalist writing for StudentAthleteIncome.com. Create a comprehensive, engaging article about a NIL deal that is:

1. NEWSWORTHY: Focus on the significance and impact
2. SEO-OPTIMIZED: Include relevant keywords naturally
3. WELL-STRUCTURED: Use proper headings and paragraphs
4. FACTUAL: Stick to confirmed information
5. ENGAGING: Write for both casual fans and NIL enthusiasts

Article should be 600-1000 words and include:
- Compelling headline
- Strong lead paragraph
- Deal details
- Athlete background
- Industry context
- Future implications
- Conclusion

Format as JSON with these fields:
{
  "title": "SEO-optimized headline",
  "content": "Full article in markdown format",
  "excerpt": "2-3 sentence summary",
  "keywords": "comma-separated keywords",
  "metaTitle": "SEO title (60 chars max)",
  "metaDescription": "SEO description (160 chars max)"
}

Write an article about this NIL deal:

DEAL INFORMATION:
- Athlete: ${deal.athlete.name}
- Sport: ${deal.athlete.sport}
- School: ${deal.athlete.school}
- Position: ${deal.athlete.position || 'N/A'}
- Class: ${deal.athlete.year || 'N/A'}
- Deal: ${deal.title}
- Type: ${deal.dealType}
- Brand: ${deal.brand || 'N/A'}
- Value: ${deal.dealValue || 'Undisclosed'}
- Description: ${deal.description || 'N/A'}

ADDITIONAL CONTEXT:
${context}

Create a professional, engaging article that informs readers about this NIL deal and its significance in college sports. Respond ONLY with valid JSON.`

      const result = await this.model.generateContent(prompt)
      const responseText = result.response.text()
      
      try {
        // Clean up markdown formatting from Gemini response
        const cleanedText = responseText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim()
        
        const articleJson = JSON.parse(cleanedText)
        
        // Calculate reading time and word count
        const wordCount = articleJson.content.split(/\s+/).length
        const readingTime = Math.ceil(wordCount / 200) // Average reading speed
        
        // Generate slug
        const slug = this.generateSlug(articleJson.title)
        
        return {
          ...articleJson,
          slug,
          wordCount,
          readingTime
        }
      } catch (parseError) {
        throw new Error(`Failed to parse article JSON: ${parseError}`)
      }
    } catch (error) {
      console.error('Error creating article content:', error)
      throw error
    }
  }

  /**
   * Generate URL-friendly slug from title
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50)
  }

  /**
   * Save article to database
   */
  private async saveArticle(articleData: ArticleData, deal: any): Promise<void> {
    try {
      // Ensure slug is unique
      let finalSlug = articleData.slug
      let counter = 1
      
      while (await prisma.article.findFirst({ where: { slug: finalSlug } })) {
        finalSlug = `${articleData.slug}-${counter}`
        counter++
      }

      await prisma.article.create({
        data: {
          title: articleData.title,
          content: articleData.content,
          excerpt: articleData.excerpt,
          slug: finalSlug,
          metaTitle: articleData.metaTitle,
          metaDescription: articleData.metaDescription,
          keywords: articleData.keywords,
          wordCount: articleData.wordCount,
          readingTime: articleData.readingTime,
          featuredImage: articleData.featuredImage,
          published: true,
          publishedAt: new Date(),
          aiGenerated: true,
          aiModel: 'gemini-1.5-flash',
          nilDealId: deal.id,
          athleteId: deal.athleteId
        }
      })

      // Add relevant tags
      await this.addArticleTags(finalSlug, deal)
    } catch (error) {
      console.error('Error saving article:', error)
      throw error
    }
  }

  /**
   * Add relevant tags to the article
   */
  private async addArticleTags(articleSlug: string, deal: any): Promise<void> {
    const article = await prisma.article.findFirst({ where: { slug: articleSlug } })
    if (!article) return

    const tagNames = [
      'NIL',
      deal.athlete.sport,
      deal.athlete.school.replace(/\s+/g, '-'),
      deal.dealType,
      ...(deal.brand ? [deal.brand] : [])
    ]

    for (const tagName of tagNames) {
      try {
        const tagSlug = this.generateSlug(tagName)
        
        // Create tag if it doesn't exist
        let tag = await prisma.tag.findFirst({ where: { slug: tagSlug } })
        if (!tag) {
          tag = await prisma.tag.create({
            data: {
              name: tagName,
              slug: tagSlug
            }
          })
        }

        // Link article to tag
        await prisma.articleTag.create({
          data: {
            articleId: article.id,
            tagId: tag.id
          }
        }).catch(() => {
          // Ignore duplicate key errors
        })
      } catch (error) {
        console.error(`Error adding tag ${tagName}:`, error)
      }
    }
  }

  /**
   * Generate a featured image for the article (placeholder for now)
   */
  private async generateFeaturedImage(deal: any): Promise<string | undefined> {
    // This could integrate with image generation APIs
    // For now, return undefined to use default images
    return undefined
  }
}

export const articleGenerator = new ArticleGenerator() 