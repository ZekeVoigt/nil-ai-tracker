"use client"

import { motion } from "framer-motion"

interface StatsSectionProps {
  stats: {
    articles: number
    deals: number
    athletes: number
    processed: number
  }
}

export function StatsSection({ stats }: StatsSectionProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const statItems = [
    { value: formatNumber(stats.articles), label: "Articles" },
    { value: formatNumber(stats.deals), label: "NIL Deals" },
    { value: formatNumber(stats.athletes), label: "Athletes" },
    { value: stats.processed > 0 ? `${Math.round((stats.processed / stats.deals) * 100)}%` : '0%', label: "Processing Rate" }
  ]

  return (
    <section className="bg-zinc-50 py-24">
      <div className="container mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16"
        >
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-5xl font-light text-black mb-3 tracking-tight">
                {item.value}
              </div>
              <div className="text-sm md:text-base text-zinc-600 font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 