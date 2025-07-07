import { prisma } from '@/lib/database'
import { ArticleCard } from '@/components/article-card'
import { HeroSection } from '@/components/hero-section'
import { StatsSection } from '@/components/stats-section'

export default async function HomePage() {
  // Fetch latest articles
  const latestArticles = await prisma.article.findMany({
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
    },
    take: 6
  })

  // Fetch platform statistics
  const stats = await Promise.all([
    prisma.article.count({ where: { published: true } }),
    prisma.nILDeal.count({ where: { verified: true } }),
    prisma.athlete.count(),
    prisma.nILDeal.count({ where: { processed: true } })
  ])

  const [totalArticles, totalDeals, totalAthletes, processedDeals] = stats

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

      {/* Articles Section */}
      {latestArticles.length > 0 && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* View All Articles Link */}
            <div className="text-center mt-12">
              <a 
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 text-black hover:border-black transition-colors duration-300 font-light"
              >
                View All Articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {latestArticles.length === 0 && (
        <section className="bg-white py-32">
          <div className="container mx-auto px-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-zinc-300 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-light text-zinc-800 mb-4">
                Monitoring Active
              </h3>
              <p className="text-zinc-600 font-light">
                AI is scanning for the latest NIL deals
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
