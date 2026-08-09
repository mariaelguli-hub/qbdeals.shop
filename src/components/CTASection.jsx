import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Zap, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTASection() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const scrollToProducts = () => {
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

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white">
      
      {/* 🌟 Background Decorative Glow Waves */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Trust Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-500/40 text-emerald-200 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Trusted by businesses worldwide • 24/7 support</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white mb-6"
        >
          Get your genuine <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">QuickBooks Desktop</span> today
        </motion.h2>

        {/* Subtitle Line */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-emerald-100/80 text-base sm:text-xl font-medium max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          One-time payment. Instant delivery. 30-day money-back guarantee. No subscription, ever.
        </motion.p>

        {/* Trust Points Bullets */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-bold text-emerald-200 mb-10"
        >
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Genuine License Key
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" /> Instant Email Delivery
          </span>
          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 30-Day Money Back
          </span>
        </motion.div>

        {/* ⚡ Glowing White Buy Now Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="inline-block"
        >
          <button
            onClick={scrollToProducts}
            className="group relative inline-flex items-center gap-3 px-10 py-4 text-emerald-950 font-black text-base sm:text-lg bg-white rounded-2xl shadow-2xl shadow-emerald-950/50 hover:shadow-emerald-400/30 overflow-hidden cursor-pointer transition-all duration-300"
          >
            {/* Glossy Shimmer Light Beam Effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-emerald-100/60 to-transparent transition-transform transform skew-x-12" />

            <Zap className="w-5 h-5 fill-emerald-800 text-emerald-800 animate-bounce" />
            <span>Buy now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  )
}
