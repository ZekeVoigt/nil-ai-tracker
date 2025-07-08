import { createClient } from '@supabase/supabase-js'

// Admin client for automation - bypasses RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Admin database helper functions that bypass RLS
export const adminDb = {
  // Create athlete with admin privileges
  async createAthlete(athlete: any) {
    const { data, error } = await supabaseAdmin
      .from('Athlete')
      .insert(athlete)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Create NIL deal with admin privileges
  async createNILDeal(deal: any) {
    const { data, error } = await supabaseAdmin
      .from('NILDeal')
      .insert(deal)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Create article with admin privileges
  async createArticle(article: any) {
    const { data, error } = await supabaseAdmin
      .from('Article')
      .insert(article)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Find athlete by name and school
  async findAthlete(name: string, school?: string) {
    let query = supabaseAdmin
      .from('Athlete')
      .select('*')
      .eq('name', name)
    
    if (school) {
      query = query.eq('school', school)
    }

    const { data, error } = await query.single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Find existing NIL deal
  async findNILDeal(athleteId: string, brand: string) {
    const { data, error } = await supabaseAdmin
      .from('NILDeal')
      .select('*')
      .eq('athleteId', athleteId)
      .eq('brand', brand)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  // Update NIL deal with admin privileges
  async updateNILDeal(id: string, updates: any) {
    const { data, error } = await supabaseAdmin
      .from('NILDeal')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get stats for dashboard
  async getStats() {
    const [articlesResult, dealsResult, athletesResult, processedResult] = await Promise.all([
      supabaseAdmin.from('Article').select('id', { count: 'exact' }).eq('published', true),
      supabaseAdmin.from('NILDeal').select('id', { count: 'exact' }).eq('verified', true),
      supabaseAdmin.from('Athlete').select('id', { count: 'exact' }),
      supabaseAdmin.from('NILDeal').select('id', { count: 'exact' }).eq('processed', true)
    ])

    return {
      articles: articlesResult.count || 0,
      deals: dealsResult.count || 0,
      athletes: athletesResult.count || 0,
      processed: processedResult.count || 0
    }
  }
} 