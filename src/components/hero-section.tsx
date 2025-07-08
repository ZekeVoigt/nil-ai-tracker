"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="bg-white py-32 md:py-48">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-8 py-6"
      >
        <div className="flex justify-between items-center">
          
          
         
        </div>
      </motion.nav>

      <div className="container mx-auto px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-7xl font-light text-black mb-8 tracking-tight">
              Student Athlete Income
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-xl md:text-2xl text-zinc-600 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
              AI-powered NIL deal tracking and analysis
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-6 py-3 bg-zinc-50 text-zinc-700 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-zinc-400 rounded-full mr-3 animate-pulse"></div>
              AI monitoring active
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 