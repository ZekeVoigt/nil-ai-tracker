import { db } from '@/lib/supabase'
import { ArticleCard } from '@/components/article-card'
import { HeroSection } from '@/components/hero-section'
import { StatsSection } from '@/components/stats-section'
import Link from 'next/link'

// Force dynamic rendering instead of static generation
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let latestArticles: any[] = []
  let totalArticles = 0
  let totalDeals = 0
  let totalAthletes = 0
  let processedDeals = 0

  try {
    // Fetch latest articles using Supabase client
    latestArticles = await db.getArticles()

    // Fetch platform statistics using Supabase client
    const stats = await db.getStats()
    totalArticles = stats.articles
    totalDeals = stats.deals
    totalAthletes = stats.athletes
    processedDeals = stats.processed
  } catch (error) {
    console.error('Database connection error:', error)
    // Continue with sample data for display
  }

  // If no articles from database, show sample articles for demo
  if (latestArticles.length === 0) {
    latestArticles = [
      {
        id: '1',
        title: "LSU Star Gymnast Livvy Dunne Signs Multi-Million Dollar NIL Deal with Nike",
        excerpt: "LSU gymnastics star Livvy Dunne announces record-breaking $2.5M NIL partnership with Nike, setting new standards for Olympic sports marketing.",
        slug: "livvy-dunne-nike-nil-deal-lsu-gymnastics",
        publishedAt: new Date().toISOString(),
        readingTime: 3,
        athlete: {
          name: "Livvy Dunne",
          sport: "Gymnastics",
          school: "Louisiana State University"
        },
        nilDeal: {
          dealValue: "$2.5M",
          dealType: "Endorsement",
          brand: "Nike"
        }
      },
      {
        id: '2',
        title: "Stanford Basketball's Haley Jones Partners with Adidas for Exclusive Footwear Deal",
        excerpt: "Stanford basketball star Haley Jones signs exclusive NIL deal with Adidas, featuring custom footwear and community outreach programs.",
        slug: "haley-jones-adidas-nil-deal-stanford-basketball",
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        readingTime: 2,
        athlete: {
          name: "Haley Jones",
          sport: "Basketball",
          school: "Stanford University"
        },
        nilDeal: {
          dealValue: "Undisclosed",
          dealType: "Footwear & Apparel",
          brand: "Adidas"
        }
      },
      {
        id: '3',
        title: "Alabama QB Bryce Young's Record NIL Portfolio Reaches $3.2 Million",
        excerpt: "Alabama quarterback Bryce Young's NIL portfolio surpasses $3.2 million, setting new standards for college athlete earning potential.",
        slug: "bryce-young-nil-portfolio-3-2-million-alabama",
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        readingTime: 3,
        athlete: {
          name: "Bryce Young",
          sport: "Football",
          school: "University of Alabama"
        },
        nilDeal: {
          dealValue: "$3.2M",
          dealType: "Multiple Partnerships",
          brand: "Various"
        }
      },
      {
        id: '4',
        title: "UConn Basketball Star Paige Bueckers Signs Exclusive Deal with Gatorade",
        excerpt: "UConn basketball star Paige Bueckers becomes Gatorade's first college basketball ambassador in groundbreaking NIL partnership.",
        slug: "paige-bueckers-gatorade-nil-deal-uconn-basketball",
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        readingTime: 2,
        athlete: {
          name: "Paige Bueckers",
          sport: "Basketball",
          school: "University of Connecticut"
        },
        nilDeal: {
          dealValue: "Undisclosed",
          dealType: "Sports Drink Partnership",
          brand: "Gatorade"
        }
      },
      {
        id: '5',
        title: "Duke Basketball Phenom Paolo Banchero Partners with Under Armour",
        excerpt: "Duke basketball star Paolo Banchero signs major NIL deal with Under Armour, strengthening brand's college basketball presence.",
        slug: "paolo-banchero-under-armour-nil-deal-duke-basketball",
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        readingTime: 2,
        athlete: {
          name: "Paolo Banchero",
          sport: "Basketball",
          school: "Duke University"
        },
        nilDeal: {
          dealValue: "Undisclosed",
          dealType: "Footwear & Apparel",
          brand: "Under Armour"
        }
      },
      {
        id: '6',
        title: "Oregon Track Star Sydney McLaughlin Partners with New Balance",
        excerpt: "Oregon track star Sydney McLaughlin partners with New Balance in groundbreaking NIL deal focused on performance innovation.",
        slug: "sydney-mclaughlin-new-balance-nil-deal-oregon-track",
        publishedAt: new Date(Date.now() - 432000000).toISOString(),
        readingTime: 2,
        athlete: {
          name: "Sydney McLaughlin",
          sport: "Track & Field",
          school: "University of Oregon"
        },
        nilDeal: {
          dealValue: "Undisclosed",
          dealType: "Performance Footwear",
          brand: "New Balance"
        }
      },
      {
        id: '7',
        title: "Texas Football QB Quinn Ewers Signs Multi-Platform Deal with Red Bull",
        excerpt: "Texas quarterback Quinn Ewers signs innovative multi-platform NIL deal with Red Bull focusing on content creation and performance.",
        slug: "quinn-ewers-red-bull-nil-deal-texas-football",
        publishedAt: new Date(Date.now() - 518400000).toISOString(),
        readingTime: 3,
        athlete: {
          name: "Quinn Ewers",
          sport: "Football",
          school: "University of Texas"
        },
        nilDeal: {
          dealValue: "Undisclosed",
          dealType: "Content & Performance",
          brand: "Red Bull"
        }
      },
      {
        id: '8',
        title: "UCLA Gymnastics Captain Nia Dennis Partners with Athleta for Empowerment Campaign",
        excerpt: "UCLA gymnastics captain Nia Dennis partners with Athleta for groundbreaking NIL deal focused on empowerment and mental health advocacy.",
        slug: "nia-dennis-athleta-nil-deal-ucla-gymnastics-empowerment",
        publishedAt: new Date(Date.now() - 604800000).toISOString(),
        readingTime: 2,
        athlete: {
          name: "Nia Dennis",
          sport: "Gymnastics",
          school: "University of California, Los Angeles"
        },
        nilDeal: {
          dealValue: "Undisclosed",
          dealType: "Advocacy & Empowerment",
          brand: "Athleta"
        }
      }
    ]
    
    // Update stats to reflect sample data
    totalArticles = 8
    totalDeals = 5
    totalAthletes = 8
    processedDeals = 5
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Statistics Section */}
      <StatsSection 
        stats={{
          articles: totalArticles,
          deals: totalDeals,
          athletes: totalAthletes,
          processed: processedDeals
        }}
      />

      {/* Articles Section - Always Show */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-6 tracking-tight">
              Latest Coverage
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light">
              Real-time NIL deal analysis and reporting
            </p>
          </div>

          {/* Grid of 8 Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {latestArticles.slice(0, 8).map((article: any) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* View All Articles Button */}
          <div className="text-center mt-16">
            <Link 
              href="/articles"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-zinc-800 transition-colors duration-300 font-light rounded-lg"
            >
              View All Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
