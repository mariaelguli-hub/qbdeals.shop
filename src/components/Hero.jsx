import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, ShieldCheck, CheckCircle, Star, ArrowRight, Sparkles, Mail, Download, Shield, Timer } from 'lucide-react'

// الكلمات المتغيرة
const animatedWords = ['one-time payment', 'no subscription', 'instant delivery', 'lifetime key']

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
  const [wordIndex, setWordIndex] = useState(0)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // 🔄 Auto-switch animated words
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length)
    }, 2800)
    return () => clearInterval(wordInterval)
  }, [])

  // 🔄 Auto-slide for features
  useEffect(() => {
    const cardInterval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % whyUsFeatures.length)
    }, 4000)
    return () => clearInterval(cardInterval)
  }, [])

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
    <section className="relative py-12 lg:py-24 bg-emerald-50/20 overflow-hidden perspective-1000">
      
      {/* 🟦 1. Modern Grid Background Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `radial-gradient(#10b981 0.75px, transparent 0.75px), linear-gradient(to right, #05966912 1px, transparent 1px), linear-gradient(to bottom, #05966912 1px, transparent 1px)`,
          backgroundSize: '24px 24px, 32px 32px, 32px 32px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)'
        }}
      />

      {/* 🟢 2. Soft Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Animated Hero Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 text-left"
          >
            {/* Rating Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/80 mb-5 shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <span className="text-xs font-black text-emerald-950 tracking-tight">4.8/5 from 22 verified reviews</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse ml-0.5" />
            </motion.div>

            {/* Main Title */}
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-5 tracking-tight leading-[1.2]">
              Genuine QuickBooks Desktop 2024 —{' '}
              <span className="inline-flex items-center overflow-visible py-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700 font-black px-2 pb-1 inline-block overflow-visible"
                  >
                    {animatedWords[wordIndex]}
                    <span className="absolute left-0 bottom-0 w-full h-[3.5px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-full shadow-xs" />
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-7 max-w-2xl">
              Stop paying yearly. Get an authentic QuickBooks Desktop license key delivered to your inbox in minutes — no subscription, no monthly fees, backed by a 30-day money-back guarantee.
            </motion.p>

            {/* Perks List */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-xs sm:text-sm font-extrabold text-gray-800 mb-8">
              <span className="flex items-center gap-1.5 text-emerald-800 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-emerald-200/60 shadow-2xs">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> No subscription
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-emerald-200/60 shadow-2xs">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Instant delivery
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-emerald-200/60 shadow-2xs">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Genuine license
              </span>
            </motion.div>

            {/* CTAs */}
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200/90 text-gray-800 font-extrabold text-base hover:bg-white hover:border-gray-300 shadow-2xs hover:shadow-md transition-all duration-200"
              >
                <span>View all products</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </motion.div>

          {/* 🌟 Right Side: High-Level Animated 3D Floating Dashboard Card 🌟 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -12 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 relative perspective-1000"
          >
            {/* 3D Main Container */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-2xl shadow-emerald-950/15 border border-gray-200/80 transition-all duration-500 hover:rotate-1"
            >
              
              {/* Top Header Row */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center font-mono font-black text-white text-lg shadow-md shadow-emerald-900/20">
                    QB
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight">
                      QuickBooks Desktop
                    </h3>
                    <span className="text-xs text-gray-400 font-medium">Pro Plus 2024 · License key</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-200/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  ACTIVE
                </span>
              </div>

              {/* Status Step 1 */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-emerald-200/80 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm">License key delivered</h4>
                      <p className="text-[11px] text-gray-400 font-medium">To your inbox in 2 min</p>
                    </div>
                  </div>
                  <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                </div>

                {/* Status Step 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-emerald-200/80 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm">Installer ready to download</h4>
                      <p className="text-[11px] text-gray-400 font-medium">Windows & macOS</p>
                    </div>
                  </div>
                  <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                </div>

                {/* Status Step 3 */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-emerald-200/80 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                      <Zap className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm">Activation complete</h4>
                      <p className="text-[11px] text-gray-400 font-medium">Genuine key — lifetime</p>
                    </div>
                  </div>
                  <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-extrabold text-gray-400">One-time purchase</span>
                <span className="font-black text-emerald-600 text-base font-mono">From $127.00</span>
              </div>

            </motion.div>

            {/* 💃 FLOATING 3D BADGE 1 (Top Right - Money Back Guarantee) */}
            <motion.div 
              animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-3 sm:-right-6 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl shadow-emerald-950/10 border border-emerald-100 flex items-center gap-3 z-20"
            >
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-black text-gray-900 text-xs">30-day guarantee</h5>
                <p className="text-[10px] text-gray-400 font-bold">Money-back, no risk</p>
              </div>
            </motion.div>

            {/* 💃 FLOATING 3D BADGE 2 (Bottom Left - Instant Delivery) */}
            <motion.div 
              animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-6 -left-3 sm:-left-6 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl shadow-emerald-950/10 border border-emerald-100 flex items-center gap-3 z-20"
            >
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-black text-gray-900 text-xs">Instant delivery</h5>
                <p className="text-[10px] text-gray-400 font-bold">Avg. 2 min</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
