import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, ShieldCheck, CheckCircle, Star, ArrowRight, Sparkles } from 'lucide-react'

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
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const scrollToProducts = (e) => {
    e.preventDefault()
    const doScroll = () => {
      const target = document.getElementById('products') || 
                     document.getElementById('all-products') || 
                     document.querySelector('section:nth-of-type(2)') ||
                     document.querySelector('main')

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 600, behavior: 'smooth' })
      }
    }

    if (pathname === '/') {
      doScroll()
    } else {
      navigate('/')
      setTimeout(doScroll, 300)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % whyUsFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const ActiveIcon = whyUsFeatures[activeTab].icon

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-10 lg:py-20 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 mb-5 shadow-2xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <span className="text-xs font-black text-emerald-950 tracking-tight">4.8/5 from 22 verified reviews</span>
              <Sparkles className="w-3 h-3 text-emerald-600 animate-pulse ml-0.5" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5 tracking-tight leading-[1.15]">
              Genuine QuickBooks Desktop 2024 —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 inline-block">
                one-time payment
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-7 max-w-2xl">
              Stop paying yearly. Get an authentic QuickBooks Desktop license key delivered to your inbox in minutes — no subscription, no monthly fees, backed by a 30-day money-back guarantee.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-extrabold text-gray-800 mb-8">
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-lg border border-emerald-200/50">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> No subscription
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-lg border border-emerald-200/50">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Instant delivery
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-lg border border-emerald-200/50">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Genuine license
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={scrollToProducts}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 text-white font-extrabold text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform transform skew-x-12" />
                <Zap className="w-5 h-5 fill-white animate-bounce shrink-0" /> 
                <span>Buy now — from $127.00</span>
              </button>

              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border border-gray-200 text-gray-800 font-extrabold text-base hover:bg-gray-50 hover:border-gray-300 shadow-2xs hover:shadow-md transition-all duration-200"
              >
                <span>View all products</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/10 border border-gray-200/80 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg">
                  Why buy from us
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Best Choice
                </span>
              </div>

              <div className="relative min-h-[110px] flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="w-full flex items-start gap-4 py-2"
                  >
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-md shadow-emerald-900/20 shrink-0 border border-emerald-400/30">
                      <ActiveIcon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-base mb-1">
                        {whyUsFeatures[activeTab].title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
                        {whyUsFeatures[activeTab].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between pt-5 mt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  {whyUsFeatures.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeTab === idx ? 'w-6 bg-emerald-600' : 'w-2 bg-gray-200 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-black text-gray-400 font-mono">
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
