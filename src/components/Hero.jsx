import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, ShieldCheck, CheckCircle, Star, ArrowRight } from 'lucide-react'

const whyUsFeatures = [
  {
    id: 0,
    icon: Zap,
    title: 'One-Time Purchase',
    desc: 'Pay once. No subscription, no monthly fees, no annual fees.',
  },
  {
    id: 1,
    icon: CheckCircle,
    title: 'Instant Email Delivery',
    desc: 'Receive your license key and download link within minutes.',
  },
  {
    id: 2,
    icon: Check,
    title: 'Genuine License',
    desc: 'Authentic license keys with full activation support.',
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'Money-Back Guarantee',
    desc: "30-day guarantee. If it doesn't activate, we make it right.",
  },
]

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0)

  // Auto-slide for the right card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % whyUsFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const ActiveIcon = whyUsFeatures[activeTab].icon

  // Animation Variants for Left Text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-12 lg:py-20 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Animated Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {/* Animated Rating badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 mb-6 shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-emerald-950">4.8/5 from 22 verified reviews</span>
            </motion.div>

            {/* Main Title Animation */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.15]">
              Genuine QuickBooks Desktop 2024 —{' '}
              <motion.span 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-emerald-600 inline-block"
              >
                one-time payment
              </motion.span>
            </motion.h1>
            
            {/* Subtitle Animation */}
            <motion.p variants={itemVariants} className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              Stop paying yearly. Get an authentic QuickBooks Desktop license key delivered to your inbox in minutes — no subscription, no monthly fees, backed by a 30-day money-back guarantee.
            </motion.p>

            {/* Perks Animation */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-bold text-gray-700 mb-9">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> No subscription
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Instant delivery
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Genuine license
              </span>
            </motion.div>

            {/* CTAs Animation */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#buy"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-5 h-5 fill-current" /> Buy now — from $127.00
              </a>
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold text-base hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                View all products
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side: Animated Horizontal Slide Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-gray-200/80 border border-gray-100 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg">
                  Why buy from us
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Best Selling
                </span>
              </div>

              {/* Horizontal Slide Content */}
              <div className="relative min-h-[105px] flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="w-full flex items-start gap-4 py-2"
                  >
                    <div className="p-3.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 shrink-0">
                      <ActiveIcon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-sm sm:text-base mb-1">
                        {whyUsFeatures[activeTab].title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {whyUsFeatures[activeTab].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots Navigation */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  {whyUsFeatures.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeTab === idx ? 'w-6 bg-emerald-600' : 'w-2 bg-gray-200 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-bold text-gray-400">
                  0{activeTab + 1} / 0{whyUsFeatures.length}
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
