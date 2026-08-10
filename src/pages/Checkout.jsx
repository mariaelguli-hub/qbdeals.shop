import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react'

export default function Checkout() {
  return (
    <>
      <Helmet>
        <title>Secure Checkout — QB DEALS</title>
      </Helmet>

      <section className="py-12 lg:py-20 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 min-h-[85vh] relative overflow-hidden font-sans">
        
        {/* Background Decorative Mesh Glow */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back Button */}
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-emerald-700 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            <span>Back to cart</span>
          </Link>

          {/* Title Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/60">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Secure Checkout</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">Instant delivery to your email inbox</p>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200/60 text-xs font-black">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Encrypted</span>
            </div>
          </div>

          {/* 1️⃣ Contact Information Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-xl shadow-gray-200/50 mb-6"
          >
            <h2 className="font-extrabold text-gray-900 text-base mb-4 flex items-center justify-between">
              <span>Contact Information</span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md">Step 1 of 2</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address (For Instant License Delivery)
                </label>
                <input 
                  type="email" 
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all shadow-2xs" 
                  placeholder="you@example.com" 
                  required
                />
                <span className="text-[11px] text-gray-400 font-medium mt-1 inline-block">
                  ⚡ Your QuickBooks license key & download links will be sent here immediately.
                </span>
              </div>
            </div>
          </motion.div>

          {/* 2️⃣ Payment Details Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-xl shadow-gray-200/50 mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
              <h2 className="font-extrabold text-gray-900 text-base">Payment Method</h2>
              
              {/* 💳 Authentic Payment Logos */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* VISA */}
                <div className="h-7 px-2.5 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center shadow-2xs">
                  <span className="font-black italic text-[#1A1F71] text-xs tracking-tighter select-none font-sans">
                    VISA
                  </span>
                </div>

                {/* Mastercard */}
                <div className="h-7 px-2.5 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center shadow-2xs">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                    alt="Mastercard" 
                    className="h-3.5 w-auto object-contain"
                  />
                </div>

                {/* PayPal */}
                <div className="h-7 px-2.5 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center shadow-2xs">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                    alt="PayPal" 
                    className="h-3 w-auto object-contain"
                  />
                </div>

                {/* Apple Pay */}
                <div className="h-7 px-2.5 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center shadow-2xs">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                    alt="Apple Pay" 
                    className="h-3 w-auto object-contain"
                  />
                </div>

                {/* Google Pay */}
                <div className="h-7 px-2.5 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center shadow-2xs">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                    alt="Google Pay" 
                    className="h-3 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                  Card Number
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none pl-11 transition-all shadow-2xs font-mono" 
                    placeholder="0000 0000 0000 0000" 
                    required
                  />
                  <CreditCard className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    Expiry Date
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all shadow-2xs font-mono" 
                    placeholder="MM/YY" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1.5">
                    CVC Code
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all shadow-2xs font-mono" 
                    placeholder="123" 
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 🚀 High-Level Animated Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button className="group relative w-full inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 text-white font-black text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer mb-6">
              
              {/* Shimmer Light Beam Effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform transform skew-x-12" />
              
              <Lock className="w-5 h-5 shrink-0" />
              <span>Complete Purchase</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse ml-1" />
            </button>
          </motion.div>

          {/* 🔒 Bottom Micro Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-extrabold text-gray-500 text-center">
            <span className="flex items-center gap-1.5 text-gray-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Guaranteed Genuine License
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> Instant Email Delivery
            </span>
            <span className="flex items-center gap-1.5 text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 30-Day Money Back
            </span>
          </div>

        </div>
      </section>
    </>
  )
}
