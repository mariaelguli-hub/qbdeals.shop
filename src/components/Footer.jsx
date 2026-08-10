import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mail, Phone, MapPin, ShieldCheck, Lock, RotateCcw, CheckCircle, Sparkles } from 'lucide-react'

export default function Footer() {
  const { pathname } = useLocation()

  // 📜 دالة Scroll to Top عند الضغط على اللوغو
  const handleLogoClick = (e) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-white text-gray-600 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* 🌟 HIGH-LEVEL ANIMATED LOGO WITH SCROLL TO TOP 🌟 */}
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="inline-flex items-center gap-3 group select-none py-1 cursor-pointer"
            >
              
              {/* Animated Logo Icon Box */}
              <div className="relative flex items-center justify-center">
                
                {/* Outer Glow Halo */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl blur-xs opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                
                {/* Main Icon Container */}
                <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white rounded-2xl flex items-center justify-center font-black text-base shadow-md shadow-emerald-950/20 group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 border border-emerald-400/30">
                  <span className="tracking-tighter font-mono">QB</span>
                  
                  {/* Micro Sparkle Indicator */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center shadow-xs">
                    <span className="w-1 h-1 bg-amber-900 rounded-full animate-ping" />
                  </span>
                </div>
              </div>

              {/* Logo Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-xl tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
                    QB<span className="text-emerald-600 group-hover:text-emerald-500 transition-colors">DEALS</span>
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
                </div>
                <span className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-widest -mt-1 opacity-80">
                  Official Software Store
                </span>
              </div>

            </Link>
            
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Genuine QuickBooks Desktop licenses. One-time purchase, instant delivery.
            </p>

            <div className="space-y-2.5 text-sm pt-2 text-gray-600">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <a href="mailto:support@qbdeals.shop" className="hover:text-emerald-700 transition-colors">
                  support@qbdeals.shop
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <a href="tel:+15053997162" className="hover:text-emerald-700 transition-colors">
                  +1 (505) 399-7162
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-gray-500">
                  Mandelbachtal Saarland 66399
                </span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-gray-900 font-bold text-sm mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="hover:text-emerald-700 transition-colors">All Products</Link></li>
              <li><Link to="/shop?cat=pro" className="hover:text-emerald-700 transition-colors">Pro</Link></li>
              <li><Link to="/shop?cat=enterprise" className="hover:text-emerald-700 transition-colors">Enterprise</Link></li>
              <li><Link to="/shop?cat=mac" className="hover:text-emerald-700 transition-colors">Mac</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-900 font-bold text-sm mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-emerald-700 transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-700 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-700 transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-delivery" className="hover:text-emerald-700 transition-colors">Shipping & Delivery</Link></li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="text-gray-900 font-bold text-sm mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-emerald-700 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-emerald-700 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-emerald-700 transition-colors">Refund Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-emerald-700 transition-colors">Return Policy</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-emerald-700 transition-colors">Cookie Policy</Link></li>
              <li><Link to="/gdpr-policy" className="hover:text-emerald-700 transition-colors">GDPR Policy</Link></li>
              <li><Link to="/legal-notice" className="hover:text-emerald-700 transition-colors">Legal Notice</Link></li>
              <li><Link to="/disclaimer" className="hover:text-emerald-700 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        {/* Middle Bar: Trust Badges & Authentic Payment Logos */}
        <div className="py-6 border-t border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-emerald-800">
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-600" /> SSL Secured
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Secure Payment
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-emerald-600" /> 30-Day Money-Back
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Genuine License
            </span>
          </div>

          {/* Perfect Authentic Payment Badges */}
          <div className="flex items-center gap-2">
            
            {/* VISA */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center">
              <span className="font-black italic text-[#1A1F71] text-base tracking-tighter select-none font-sans">
                VISA
              </span>
            </div>

            {/* Mastercard */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                alt="Mastercard" 
                className="h-5 w-auto object-contain"
              />
            </div>

            {/* PayPal */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                alt="PayPal" 
                className="h-4 w-auto object-contain"
              />
            </div>

            {/* Apple Pay */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                alt="Apple Pay" 
                className="h-4 w-auto object-contain"
              />
            </div>

            {/* Google Pay */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200/80 rounded-lg flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" 
                alt="Google Pay" 
                className="h-4 w-auto object-contain"
              />
            </div>

          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} QB DEALS. All rights reserved.</p>
          <p className="max-w-xl">
            QuickBooks and Intuit are trademarks of Intuit Inc. QB DEALS is an independent retailer and is not affiliated with Intuit.
          </p>
        </div>

      </div>
    </footer>
  )
}
