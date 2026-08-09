import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Zap, ShieldCheck, CheckCircle, RefreshCw, Lock, Sparkles, Star, ZoomIn } from 'lucide-react'
import products from '../data/products.json'

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

export default function ProductDetails() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const [activeTab, setActiveTab] = useState(0)

  // Zoom States
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const imgRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!imgRef.current) return
    const { left, top, width, height } = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % whyUsFeatures.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link to="/shop" className="text-brand-700 font-semibold hover:underline">
          &larr; Back to shop
        </Link>
      </div>
    )
  }

  const ActiveIcon = whyUsFeatures[activeTab].icon
  const ratingValue = product.rating || 4.95
  const reviewsCount = product.reviewsCount || 128

  return (
    <>
      <Helmet>
        <title>{product.name} — QB Deals</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <section className="py-12 lg:py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to products
          </Link>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Side: Full Image Display (No Crop) + Zoom */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Product Image Container (Fit Image Exactly) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                ref={imgRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="bg-white rounded-3xl border border-gray-200/80 p-3 flex items-center justify-center shadow-sm relative overflow-hidden cursor-crosshair group min-h-[350px]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isHovered ? 'scale(2.2)' : 'scale(1)',
                  }}
                  className="w-full h-auto max-h-[480px] object-contain rounded-2xl transition-transform duration-200 ease-out"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x400/1a7a1a/ffffff?text=${encodeURIComponent(product.category)}`
                  }}
                />

                {/* Zoom Hint */}
                <div className={`absolute bottom-3 right-3 bg-gray-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                  <ZoomIn className="w-3.5 h-3.5" /> Hover to zoom
                </div>
              </motion.div>

              {/* Horizontal Slide Widget */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/60 border border-gray-100 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="font-extrabold text-gray-900 text-base">
                    Why buy from us
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Best Selling
                  </span>
                </div>

                <div className="relative min-h-[100px] flex items-center overflow-hidden">
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
                        <h4 className="font-extrabold text-gray-900 text-sm mb-1">
                          {whyUsFeatures[activeTab].title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {whyUsFeatures[activeTab].desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

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
              </motion.div>

            </div>

            {/* Right Side: Product Details & Pricing */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  {product.category}
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  In Stock • Instant Delivery
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {product.name}
              </h1>

              {/* Golden Star Rating Section */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-black text-gray-900">{ratingValue}</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-semibold text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-emerald-700 transition-colors cursor-pointer">
                  ({reviewsCount} verified reviews)
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <ul className="space-y-2.5 mb-8 bg-white p-5 rounded-2xl border border-gray-100">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 mb-8">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:border-emerald-500 transition-colors cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {variant.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {variant.users} user license
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-black text-gray-900">
                        ${variant.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400 line-through">
                        ${variant.comparePrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buy Now Button */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="relative overflow-hidden rounded-2xl shadow-xl shadow-emerald-600/30 group cursor-pointer"
              >
                <button className="w-full relative py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white font-black text-base tracking-wide flex items-center justify-center gap-3 transition-all duration-300">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform transform skew-x-12" />
                  
                  <div className="p-1.5 bg-white/20 rounded-xl">
                    <Zap className="w-5 h-5 fill-white text-white animate-bounce" />
                  </div>
                  <span>Buy Now — Instant Delivery</span>
                </button>
              </motion.div>

              {/* Payment Badges & Trust Board */}
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-center gap-1.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                      Guaranteed Safe & Secure Checkout
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-emerald-500 hover:scale-105 transition-all">
                      <span className="font-black italic text-[#1A1F71] text-sm tracking-tighter select-none font-sans">
                        VISA
                      </span>
                    </div>

                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-emerald-500 hover:scale-105 transition-all">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                        alt="Mastercard" 
                        className="h-5 w-auto object-contain"
                      />
                    </div>

                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-emerald-500 hover:scale-105 transition-all">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                        alt="PayPal" 
                        className="h-4 w-auto object-contain"
                      />
                    </div>

                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-emerald-500 hover:scale-105 transition-all">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                        alt="Apple Pay" 
                        className="h-4 w-auto object-contain"
                      />
                    </div>

                    <div className="h-11 bg-white border border-gray-200/90 rounded-xl flex items-center justify-center shadow-xs hover:border-emerald-500 hover:scale-105 transition-all">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                        alt="Google Pay" 
                        className="h-4 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/40 border border-emerald-200/80 rounded-2xl p-5 shadow-lg shadow-emerald-900/5 backdrop-blur-md">
                  <div className="absolute -right-12 -top-12 w-36 h-36 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-blue-400/10 rounded-full blur-3xl"></div>

                  <div className="relative z-10 flex items-center justify-between mb-4 pb-3 border-b border-emerald-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-600/30">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">
                        100% Safe & Secure Purchase Guarantee
                      </h4>
                    </div>
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-bounce" />
                  </div>

                  <div className="relative z-10 space-y-3 text-xs text-gray-700">
                    <div className="flex items-start gap-3 group bg-white/60 p-2.5 rounded-xl border border-emerald-100/60 hover:bg-white hover:shadow-sm transition-all">
                      <div className="mt-0.5 text-emerald-600 font-bold bg-emerald-100 rounded-full p-1 group-hover:scale-110 transition-transform shadow-xs">
                        <Zap className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">100% Activation Guarantee</span> — License activates successfully or your money back.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group bg-white/60 p-2.5 rounded-xl border border-emerald-100/60 hover:bg-white hover:shadow-sm transition-all">
                      <div className="mt-0.5 text-emerald-600 font-bold bg-emerald-100 rounded-full p-1 group-hover:scale-110 transition-transform shadow-xs">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">Instant Delivery by Email</span> — Receive your license key within minutes.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group bg-white/60 p-2.5 rounded-xl border border-emerald-100/60 hover:bg-white hover:shadow-sm transition-all">
                      <div className="mt-0.5 text-emerald-600 font-bold bg-emerald-100 rounded-full p-1 group-hover:scale-110 transition-transform shadow-xs">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">Free Re-Activation</span> — Change or reinstall your PC anytime.
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-4 pt-3 border-t border-emerald-100/80 flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-semibold">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>Secure checkout</span>
                    <span className="text-emerald-400">•</span>
                    <span>Encrypted payments</span>
                    <span className="text-emerald-400">•</span>
                    <span>Trusted by thousands</span>
                  </div>
                </div>

              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
