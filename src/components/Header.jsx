import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingCart, ShieldCheck, Zap, CreditCard, RotateCcw, Sparkles } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // 📜 دالة Scroll to Top عند الضغط على اللوغو
  const handleLogoClick = (e) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // 📜 دالة الـ Scroll Down الجذري والحل المضمون لمشكلة 404
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/80 shadow-xs">
      
      {/* TOP BAR (Clean Mobile Responsive Layout) */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-100 text-xs py-2 border-b border-emerald-800/40 shadow-xs relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center sm:justify-between gap-y-2 gap-x-4 text-[11px] sm:text-xs font-semibold tracking-wide">
            
            {/* Item 1: Visible everywhere */}
            <div className="flex items-center gap-1.5 text-emerald-100/90 cursor-default group">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>Secure Checkout</span>
            </div>

            {/* Item 2: Visible everywhere */}
            <div className="flex items-center gap-1.5 text-emerald-100/90 cursor-default group">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 group-hover:scale-110 transition-transform shrink-0" />
              <span>Instant Email Delivery</span>
            </div>

            {/* Item 3: Hidden on mobile, visible from sm screen */}
            <div className="hidden sm:flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>One-Time Payment</span>
            </div>

            {/* Item 4: Hidden on mobile, visible from md screen */}
            <div className="hidden md:flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>30-Day Money-Back Guarantee</span>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN HEADER NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* 🌟 HIGH-LEVEL ANIMATED LOGO WITH SCROLL TO TOP 🌟 */}
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group select-none py-1 cursor-pointer"
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  pathname === link.to
                    ? 'text-emerald-700 font-extrabold'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                {link.label}
                {pathname === link.to && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </Link>
            ))}
            
            <button
              onClick={scrollToProducts}
              className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Products
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* SHOP NOW BUTTON WITH ANIMATION & SCROLL DOWN */}
            <button
              onClick={scrollToProducts}
              className="hidden sm:inline-flex relative items-center justify-center px-6 py-2.5 text-sm font-extrabold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl overflow-hidden shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <span className="relative z-10 flex items-center gap-1.5">
                Shop now
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100"
            >
              {mobileOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-bold ${
                  pathname === link.to
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileOpen(false)
                scrollToProducts()
              }}
              className="block w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Products
            </button>

            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50"
            >
              <ShoppingCart className="w-4 h-4" /> Cart
            </Link>

            <button
              onClick={() => {
                setMobileOpen(false)
                scrollToProducts()
              }}
              className="w-full mt-3 inline-flex items-center justify-center py-3 text-sm font-extrabold text-white bg-emerald-600 rounded-xl shadow-md active:scale-95 transition-all"
            >
              Shop now
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
