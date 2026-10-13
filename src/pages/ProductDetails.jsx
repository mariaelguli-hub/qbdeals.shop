import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, Check, Zap, ShieldCheck, CheckCircle, 
  Lock, Sparkles, Star, ZoomIn, ChevronDown, Monitor, Cpu, HardDrive, Wifi, HelpCircle, Key, Download
} from 'lucide-react'
import products from '../data/products.json'
import { useCart } from '../hooks/useCart'

const whyUsFeatures = [
  { id: 0, icon: Zap, title: 'One-Time Purchase', desc: 'Pay once. No subscription, no monthly fees, no annual fees.' },
  { id: 1, icon: CheckCircle, title: 'Instant Email Delivery', desc: 'Receive your license key and download link within minutes.' },
  { id: 2, icon: Check, title: 'Genuine License', desc: 'Authentic license keys with full activation support.' },
  { id: 3, icon: ShieldCheck, title: 'Money-Back Guarantee', desc: "30-day guarantee. If it doesn't activate, we make it right." },
]

const systemRequirements = [
  { icon: Monitor, label: 'Operating System', value: 'Windows 8.1, Windows 10, or Windows 11 (32-bit & 64-bit)' },
  { icon: Cpu, label: 'Processor', value: 'At least 2.4 GHz processor (4 GHz recommended)' },
  { icon: HardDrive, label: 'RAM & Disk Space', value: 'Minimum 4 GB RAM (8GB Rec) / 2.5 GB free disk space' },
  { icon: Wifi, label: 'Internet Access', value: 'Required for payroll, online features, and updates' }
]

const faqs = [
  {
    q: "How do you provide the product at a lower price compared to the official website?",
    a: "We offer competitive pricing because we purchase Intuit ProAdvisor product keys in bulk directly from QuickBooks that are registered under our company. This allows us to pass on massive cost savings directly to you, providing 100% authentic software at a fraction of the cost."
  },
  {
    q: "Is it safe to buy from your website? Are the keys genuine?",
    a: "Absolutely. All the QuickBooks product keys we offer are legitimate, authorized, and 100% authentic. We maintain a secure, encrypted platform and offer a full Money-Back Guarantee if your key fails to activate."
  },
  {
    q: "Can I transfer my existing QuickBooks Data into this 2024 Desktop version?",
    a: "Yes! You can seamlessly transfer your existing QuickBooks data, company files, vendor information, and charts of accounts from previous versions or other editions to QuickBooks Desktop 2024 using Intuit's built-in migration tools."
  },
  {
    q: "Is this a one-time purchase or a subscription?",
    a: "This is a strictly ONE-TIME purchase for a lifetime license of the Desktop version. No monthly or annual subscription fees are required to use the core accounting features."
  },
  {
    q: "Do you offer customer support after the purchase?",
    a: "Yes, you will have free and unlimited customer support provided by our Intuit ProAdvisor experts. If you encounter any installation or activation issues, our dedicated team is here to help 24/7."
  }
]

const customerReviews = [
  { name: "John Rodriguez", date: "05/06/2024", text: "QuickBooks 2024 has saved me valuable time. The automation features are fantastic and the software adapts seamlessly to my business needs. The customer support is top-notch, providing quick solutions and instant delivery." },
  { name: "Emily Parker", date: "11/05/2024", text: "This has been a game-changer for my business. The robust features and easy navigation make financial management a breeze. I was skeptical about the price, but the key activated perfectly on the official site." },
  { name: "Jason Anderson", date: "16/04/2024", text: "Delivers exceptional value for my business. The feature set is comprehensive, and the software's reliability is unmatched. Got my license key in literally 2 minutes via email. Highly recommended!" }
]

export default function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
  
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const imgRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    const foundInJson = products.find((p) => p.slug === slug || String(p.id) === slug)

    if (foundInJson) {
      setProduct(foundInJson)
      if (foundInJson.variants && foundInJson.variants.length > 0) {
        setSelectedVariant(foundInJson.variants[0])
      }
      setLoading(false)
      return
    }

    const fetchFromCSV = async () => {
      try {
        const response = await fetch('/home-and-garden.csv')
        if (!response.ok) throw new Error('CSV not found')

        const text = await response.text()
        const lines = text.split('\n').filter(line => line.trim() !== '')

        if (lines.length > 1) {
          const parseCSVLine = (str) => {
            const row = []
            let inside = false
            let cur = ''
            for (let i = 0; i < str.length; i++) {
              const c = str[i]
              if (c === '"') inside = !inside
              else if (c === ',' && !inside) { row.push(cur.trim()); cur = '' }
              else cur += c
            }
            row.push(cur.trim())
            return row
          }

          const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().replace(/^"|"$/g, ''))
          const handleIdx = headers.findIndex(h => h === 'handle' || h === 'id' || h === 'slug')
          const titleIdx = headers.findIndex(h => h === 'title' || h === 'name')
          const priceIdx = headers.findIndex(h => h.includes('price'))
          const imgIdx = headers.findIndex(h => h.includes('image') || h.includes('src'))

          for (let i = 1; i < lines.length; i++) {
            const row = parseCSVLine(lines[i])
            const itemHandle = (handleIdx !== -1 && row[handleIdx]) ? row[handleIdx].replace(/^"|"$/g, '') : ''

            if (itemHandle === slug) {
              const itemTitle = (titleIdx !== -1 && row[titleIdx]) ? row[titleIdx].replace(/^"|"$/g, '') : slug.replace(/-/g, ' ')
              let itemPrice = (priceIdx !== -1 && row[priceIdx]) ? row[priceIdx].replace(/[^0-9.]/g, '') : '135.00'
              if (!itemPrice || itemPrice === '0') itemPrice = '135.00'
              
              const itemImg = (imgIdx !== -1 && row[imgIdx]) ? row[imgIdx].replace(/^"|"$/g, '') : ''

              const csvProduct = {
                id: slug,
                slug: slug,
                name: itemTitle.replace(/\b\w/g, l => l.toUpperCase()),
                category: 'BUSINESS & ACCOUNTING',
                description: `Embrace the future of accounting with ${itemTitle}. This powerful software is designed to streamline your business finances for a lifetime. Authentic item with one-time payment, instant email delivery, and 30-day money-back guarantee.`,
                image: itemImg || `https://placehold.co/500x500/f3f4f6/059669?text=${encodeURIComponent(itemTitle)}`,
                rating: 4.98,
                reviewsCount: 342,
                features: [
                  'Comprehensive Financial Management & Reporting',
                  'Streamlined Bank Feeds & Seamless Integration',
                  'Automated Data Backup and Recovery',
                  'One-Time Purchase — Lifetime Access'
                ],
                variants: [
                  {
                    id: 'standard-edition',
                    label: 'Standard Pack',
                    users: 1,
                    price: parseFloat(itemPrice) || 135.00,
                    comparePrice: (parseFloat(itemPrice) * 2.2) || 299.00
                  }
                ]
              }

              setProduct(csvProduct)
              setSelectedVariant(csvProduct.variants[0])
              setLoading(false)
              return
            }
          }
        }
      } catch (err) {
        console.error("Error reading CSV in product page:", err)
      }

      const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      const fallbackProduct = {
        id: slug,
        slug: slug,
        name: formattedTitle,
        category: 'BUSINESS & ACCOUNTING',
        description: `High quality ${formattedTitle}. Genuine license with instant email delivery.`,
        image: `https://placehold.co/500x500/f3f4f6/059669?text=${encodeURIComponent(formattedTitle)}`,
        rating: 4.96,
        reviewsCount: 112,
        features: [
          'Genuine License Guarantee',
          'Instant Email Delivery',
          '30-Day Money-Back Guarantee'
        ],
        variants: [
          {
            id: 'standard-item',
            label: 'Standard Edition',
            users: 1,
            price: 135.00,
            comparePrice: 299.00
          }
        ]
      }
      setProduct(fallbackProduct)
      setSelectedVariant(fallbackProduct.variants[0])
      setLoading(false)
    }

    fetchFromCSV()
  }, [slug])

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

  // 👈 Dala Jdida: katsift nichan l checkout bla modal
  const handleBuyNow = () => {
    const targetVariant = selectedVariant || (product.variants && product.variants[0])
    const cartItem = {
      id: `${product.id}-${targetVariant?.id || 'default'}`,
      name: `${product.name} (${targetVariant?.label || ''})`,
      price: targetVariant?.price || 135.00,
      image: product.image,
      quantity: 1
    }

    // katzid f sella u katsayft l checkout
    addToCart(cartItem)
    navigate('/checkout')
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium text-sm">Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link to="/shop" className="text-emerald-700 font-semibold hover:underline">
          &larr; Back to shop
        </Link>
      </div>
    )
  }

  const ActiveIcon = whyUsFeatures[activeTab].icon
  const ratingValue = product.rating || 4.96
  const reviewsCount = product.reviewsCount || 142

  return (
    <>
      <Helmet>
        <title>{product.name} — QB DEALS</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="bg-gray-50/50 min-h-screen">
        <section className="pt-12 pb-8 lg:pt-16 lg:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-emerald-700 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to products
            </Link>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Side: Image & Features Widget */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
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
                    className="w-full h-auto max-h-[480px] object-contain rounded-2xl transition-transform duration-200 ease-out bg-white"
                  />
                  <div className={`absolute bottom-3 right-3 bg-gray-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                    <ZoomIn className="w-3.5 h-3.5" /> Hover to zoom
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/60 border border-gray-100 relative overflow-hidden hidden md:block"
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <h3 className="font-extrabold text-gray-900 text-base">Why buy from us</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      100% Secure
                    </span>
                  </div>
                  <div className="relative min-h-[100px] flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full flex items-start gap-4 py-2"
                      >
                        <div className="p-3.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 shrink-0">
                          <ActiveIcon className="w-6 h-6 stroke-[2]" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-sm mb-1">{whyUsFeatures[activeTab].title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{whyUsFeatures[activeTab].desc}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      {whyUsFeatures.map((_, idx) => (
                        <button
                          key={idx} onClick={() => setActiveTab(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${activeTab === idx ? 'w-6 bg-emerald-600' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-gray-400">0{activeTab + 1} / 0{whyUsFeatures.length}</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Details & Actions */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="lg:col-span-7"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    {product.category}
                  </div>
                  <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Authorized Reseller
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="text-sm font-black text-gray-900">{ratingValue}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-semibold text-gray-500 underline decoration-gray-300 underline-offset-4 cursor-pointer">
                    ({reviewsCount} verified customer reviews)
                  </span>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base border-b border-gray-200 pb-6">
                  {product.description}
                </p>

                <div className="space-y-3 mb-6">
                  {(product.variants || []).map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id
                    return (
                      <div
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                          isSelected
                            ? 'bg-emerald-50/40 border-emerald-600 shadow-md shadow-emerald-600/10'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isSelected ? 'bg-emerald-600 text-white' : 'border border-gray-300'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <div className={`font-black text-sm sm:text-base transition-colors ${isSelected ? 'text-emerald-950' : 'text-gray-900'}`}>
                              {variant.label}
                            </div>
                            <div className="text-xs text-emerald-600 mt-0.5 font-bold flex items-center gap-1">
                              <Zap className="w-3 h-3 fill-emerald-600" /> Instant Email Delivery
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-2xl font-black ${isSelected ? 'text-emerald-700' : 'text-gray-900'}`}>
                            ${Number(variant.price).toFixed(2)}
                          </div>
                          {variant.comparePrice && (
                            <div className="text-xs text-gray-400 line-through">
                              ${Number(variant.comparePrice).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* ========================================================= */}
                {/* Buy Button (Direct Checkout - No Modal) */}
                {/* ========================================================= */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm mb-6">
                  <motion.div
                    whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
                    className="relative overflow-hidden rounded-2xl shadow-xl shadow-emerald-600/30 group cursor-pointer mb-5"
                  >
                    {/* 👈 hnaya bdlna onClick l handleBuyNow bach iddik nichan l checkout */}
                    <button 
                      onClick={handleBuyNow}
                      className="w-full relative py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white font-black text-lg tracking-wide flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform transform skew-x-12" />
                      <div className="p-1.5 bg-white/20 rounded-xl">
                        <Lock className="w-5 h-5 fill-white text-white" />
                      </div>
                      <span>Buy Now — Instant Delivery</span>
                    </button>
                  </motion.div>

                  <div className="flex flex-col items-center justify-center pt-1">
                    <p className="text-[11px] font-extrabold text-[#8fa4b5] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Guaranteed Safe & Secure Checkout
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-auto object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 w-auto object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5 w-auto object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-5 w-auto object-contain" />
                    </div>
                  </div>
                </div>
                {/* ========================================================= */}

                {/* HOW YOU WILL GET YOUR PRODUCT */}
                <div className="bg-[#f8fafd] border border-blue-100 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-lg font-black text-[#1a365d] mb-2 flex items-center gap-2">
                    <Download className="w-5 h-5 text-blue-600" /> How you will get your product?
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    After making the purchase, you will get the activation license <strong className="text-emerald-600 font-extrabold">INSTANTLY (within minutes)</strong> via email.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 pt-5 border-t border-blue-200/60">
                    <div>
                      <h4 className="font-extrabold text-[#1a365d] text-sm mb-4 leading-snug">
                        We provide 100% authentic Intuit QuickBooks license keys at a very affordable price.
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                          <span>The official product download link.</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm text-gray-700 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                          <span>We provide you the original key to activate the product without any issues.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -z-0" />
                      <div className="relative z-10">
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                          <Monitor className="w-3.5 h-3.5" /> Version USA & UK (Mac & Windows)
                        </div>
                        <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                          <Key className="w-4 h-4 text-gray-500" /> License Key format:
                        </div>
                        <div className="space-y-2 font-mono text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                          <div className="flex justify-between items-center pb-2 border-b border-gray-200 border-dashed">
                            <span className="text-gray-500 font-sans font-medium">License Number:</span>
                            <span className="font-black text-[#1a365d] tracking-wider">XXXX-XXXX-XXXX-XXX</span>
                          </div>
                          <div className="flex justify-between items-center pt-1">
                            <span className="text-gray-500 font-sans font-medium">Product Number:</span>
                            <span className="font-black text-[#1a365d] tracking-wider">XXX-XXX</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ProAdvisor Banner */}
                <div className="mt-6 bg-emerald-900 text-emerald-50 p-5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center shadow-lg shadow-emerald-900/10">
                  <div className="w-12 h-12 bg-emerald-800 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1">Intuit ProAdvisor Licenses</h4>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      We provide Intuit ProAdvisor licenses that are registered under our company. You enjoy all the benefits of an ORIGINAL Intuit license, ensuring your data is 100% secured locally on your desktop.
                    </p>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES & SYSTEM REQUIREMENTS SECTION */}
        <section className="py-12 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Product Features</h2>
              <div className="space-y-4">
                {(product.features || []).map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="p-1.5 bg-emerald-100 rounded-lg shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{feat}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">System Requirements</h2>
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-5">
                {systemRequirements.map((req, i) => {
                  const ReqIcon = req.icon
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 shrink-0">
                        <ReqIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 mb-0.5">{req.label}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{req.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="py-12 border-t border-gray-200 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {customerReviews.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-sm text-gray-700 italic leading-relaxed mb-6">"{review.text}"</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                    <span className="font-bold text-gray-900 text-sm">{review.name}</span>
                    <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-16 border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <HelpCircle className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-sm text-gray-500 mt-2">Everything you need to know about your purchase.</p>
            </div>
            
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-bold text-sm text-gray-900">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white"
                      >
                        <div className="p-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
