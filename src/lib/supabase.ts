import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database helper functions using Supabase client
export const db = {
  // Articles
  async getArticles() {
    const { data, error } = await supabase
      .from('Article')
      .select(`
        *,
        athlete:Athlete(*),
        nilDeal:NILDeal(*),
        tags:ArticleTag(
          tag:Tag(*)
        )
      `)
      .eq('published', true)
      .order('publishedAt', { ascending: false })
      .limit(6)
    
    if (error) throw error
    return data || []
  },

  // Statistics
  async getStats() {
    const [articlesResult, dealsResult, athletesResult, processedResult] = await Promise.all([
      supabase.from('Article').select('id', { count: 'exact' }).eq('published', true),
      supabase.from('NILDeal').select('id', { count: 'exact' }).eq('verified', true),
      supabase.from('Athlete').select('id', { count: 'exact' }),
      supabase.from('NILDeal').select('id', { count: 'exact' }).eq('processed', true)
    ])

    return {
      articles: articlesResult.count || 0,
      deals: dealsResult.count || 0,
      athletes: athletesResult.count || 0,
      processed: processedResult.count || 0
    }
  },

  // Get article by slug
  async getArticleBySlug(slug: string) {
    const { data, error } = await supabase
      .from('Article')
      .select(`
        *,
        athlete:Athlete(*),
        nilDeal:NILDeal(*),
        tags:ArticleTag(
          tag:Tag(*)
        )
      `)
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  },

  // Get all published articles
  async getAllArticles() {
    const { data, error } = await supabase
      .from('Article')
      .select(`
        *,
        athlete:Athlete(*),
        nilDeal:NILDeal(*),
        tags:ArticleTag(
          tag:Tag(*)
        )
      `)
      .eq('published', true)
      .order('publishedAt', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Create new records
  async createAthlete(athlete: any) {
    const { data, error } = await supabase
      .from('Athlete')
      .insert(athlete)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async createNILDeal(deal: any) {
    const { data, error } = await supabase
      .from('NILDeal')
      .insert(deal)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async createArticle(article: any) {
    const { data, error } = await supabase
      .from('Article')
      .insert(article)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
} 