import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, ShieldCheck, CheckCircle, Star, ArrowRight, Sparkles } from 'lucide-react'

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

  // 🔄 Auto-slide for right card
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
    <section className="relative py-12 lg:py-24 bg-emerald-50/20 overflow-hidden">
      
      {/* 🟦 1. Modern Grid Background Pattern (المربعات الهندسية الناعمة) */}
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
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Animated Hero Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-left"
          >
            {/* Rating Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/80 mb-5 shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
              <span className="text-xs font-black text-emerald-950 tracking-tight">4.8/5 from 22 verified reviews</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse ml-0.5" />
            </motion.div>

            {/* Main Title with Perfect Overflow & Clean Padding */}
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
                    {/* Subtly Glowing Underline Accent */}
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

          {/* Right Side: Animated Horizontal Slide Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/10 border border-gray-200/80 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg">
                  Why buy from us
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Best Choice
                </span>
              </div>

              {/* Horizontal Slide Content */}
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

              {/* Dots Navigation */}
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
