import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Zap, Infinity as InfinityIcon, CheckCircle, ShieldCheck } from 'lucide-react'
import products from '../data/products.json'

const whyUsFeatures = [
  {
    id: 0,
    icon: InfinityIcon,
    title: 'One-Time Purchase',
    desc: 'Pay once. No subscription, no monthly fees, no annual fees.',
  },
  {
    id: 1,
    icon: Zap,
    title: 'Instant Email Delivery',
    desc: 'Receive your license key and download link within minutes.',
  },
  {
    id: 2,
    icon: CheckCircle,
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

  // Auto-slide horizontal every 4 seconds
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
            
            {/* Left Side: Image + Horizontal Slide Widget */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Product Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-gray-200/80 p-8 flex items-center justify-center shadow-sm"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-80 object-contain hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x400/1a7a1a/ffffff?text=${encodeURIComponent(product.category)}`
                  }}
                />
              </motion.div>

              {/* Real Horizontal Slide Widget */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/60 border border-gray-100 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="font-extrabold text-gray-900 text-base">
                    Why buy from us
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Best Selling
                  </span>
                </div>

                {/* Horizontal Slide Container */}
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
                        {React.createElement(whyUsFeatures[activeTab].icon, { className: "w-6 h-6 stroke-[2]" })}
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
              </motion.div>

            </div>

            {/* Right Side: Product Details & Pricing */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                {product.category}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {product.name}
              </h1>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2.5 mb-8 bg-white p-5 rounded-2xl border border-gray-100">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Pricing Variants */}
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

              {/* Buy Button */}
              <button className="btn-primary w-full justify-center py-4 text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2">
                <Zap className="w-5 h-5 fill-current" /> Buy now
              </button>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
