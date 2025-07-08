'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MonitoringStats {
  totalDeals: number
  totalArticles: number
  recentActivity: any[]
}

interface RecentDeal {
  id: string
  title: string
  brand: string
  dealValue: string
  announcementDate: string
  athlete: {
    name: string
    school: string
    sport: string
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState<MonitoringStats | null>(null)
  const [recentDeals, setRecentDeals] = useState<RecentDeal[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>('')
  const [isManualScraping, setIsManualScraping] = useState(false)

  useEffect(() => {
    fetchMonitoringStatus()
    const interval = setInterval(fetchMonitoringStatus, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchMonitoringStatus = async () => {
    try {
      const response = await fetch('/api/automation/monitor')
      const data = await response.json()
      
      if (data.stats) {
        setStats(data.stats)
      }
      if (data.recentDeals) {
        setRecentDeals(data.recentDeals)
      }
      setLastUpdate(new Date().toLocaleTimeString())
      setIsMonitoring(true)
    } catch (error) {
      console.error('Failed to fetch monitoring status:', error)
      setIsMonitoring(false)
    }
  }

  const triggerManualScrape = async () => {
    setIsManualScraping(true)
    try {
      const response = await fetch('/api/automation/scrape-now', {
        method: 'POST'
      })
      const result = await response.json()
      
      alert(`Manual scrape completed!\n\nDeals found: ${result.data?.scrapedDeals || 0}\nArticles generated: ${result.data?.generatedArticles || 0}`)
      
      // Refresh stats
      await fetchMonitoringStatus()
    } catch (error) {
      alert('Manual scrape failed: ' + error)
    } finally {
      setIsManualScraping(false)
    }
  }

  const startMonitoring = async () => {
    try {
      const response = await fetch('/api/automation/monitor', {
        method: 'POST'
      })
      const result = await response.json()
      
      if (result.success) {
        alert('Monitoring cycle started!')
        await fetchMonitoringStatus()
      }
    } catch (error) {
      alert('Failed to start monitoring: ' + error)
    }
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light text-black mb-2">
            NIL Automation Dashboard
          </h1>
          <p className="text-zinc-600 font-light">
            Real-time monitoring and control center for studentathleteincome.com
          </p>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-50 p-6 rounded-lg border border-zinc-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <h3 className="font-light text-black">Monitoring Status</h3>
            </div>
            <p className="text-2xl font-light text-black">
              {isMonitoring ? 'Active' : 'Inactive'}
            </p>
            <p className="text-sm text-zinc-600 mt-1">
              Last update: {lastUpdate || 'Never'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-50 p-6 rounded-lg border border-zinc-200"
          >
            <h3 className="font-light text-black mb-2">Total NIL Deals</h3>
            <p className="text-3xl font-light text-black">
              {stats?.totalDeals || 0}
            </p>
            <p className="text-sm text-zinc-600 mt-1">Discovered & verified</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-50 p-6 rounded-lg border border-zinc-200"
          >
            <h3 className="font-light text-black mb-2">Articles Generated</h3>
            <p className="text-3xl font-light text-black">
              {stats?.totalArticles || 0}
            </p>
            <p className="text-sm text-zinc-600 mt-1">AI-powered content</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-50 p-6 rounded-lg border border-zinc-200"
          >
            <h3 className="font-light text-black mb-2">Sources Monitored</h3>
            <p className="text-3xl font-light text-black">5</p>
            <p className="text-sm text-zinc-600 mt-1">Major sports websites</p>
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-50 p-6 rounded-lg border border-zinc-200 mb-8"
        >
          <h2 className="text-2xl font-light text-black mb-4">Automation Controls</h2>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={triggerManualScrape}
              disabled={isManualScraping}
              className="bg-black text-white px-6 py-3 rounded font-light hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {isManualScraping ? 'Scraping...' : 'Manual Scrape Now'}
            </button>
            
            <button
              onClick={startMonitoring}
              className="bg-zinc-200 text-black px-6 py-3 rounded font-light hover:bg-zinc-300 transition-colors"
            >
              Start Monitoring Cycle
            </button>
            
            <a
              href="/api/automation/monitor"
              className="bg-zinc-200 text-black px-6 py-3 rounded font-light hover:bg-zinc-300 transition-colors inline-block"
            >
              View Monitoring API
            </a>
          </div>
        </motion.div>

        {/* Recent Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-200">
            <h2 className="text-2xl font-light text-black">Recent NIL Deals</h2>
            <p className="text-zinc-600 font-light mt-1">Latest deals discovered by the automation system</p>
          </div>
          
          <div className="divide-y divide-zinc-200">
            {recentDeals.length > 0 ? (
              recentDeals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-6 hover:bg-zinc-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-light text-black text-lg mb-1">
                        {deal.title}
                      </h3>
                      <p className="text-zinc-600 font-light mb-2">
                        {deal.athlete.name} • {deal.athlete.school} • {deal.athlete.sport}
                      </p>
                      <div className="flex gap-4 text-sm text-zinc-500">
                        <span>Brand: {deal.brand}</span>
                        <span>Value: {deal.dealValue}</span>
                        <span>Date: {new Date(deal.announcementDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-zinc-500">
                <p className="font-light">No NIL deals found yet.</p>
                <p className="text-sm mt-1">Run a manual scrape or wait for the next monitoring cycle.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Monitoring Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-zinc-50 p-6 rounded-lg border border-zinc-200"
        >
          <h2 className="text-2xl font-light text-black mb-4">Monitored Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'ESPN College Sports',
              'On3 NIL',
              '247Sports',
              'The Athletic',
              'Sportico NIL'
            ].map((source, index) => (
              <div key={source} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-zinc-700 font-light">{source}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 