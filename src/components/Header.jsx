import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, ShieldCheck, Zap, CreditCard, RotateCcw } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  // 📜 دالة الـ Smooth Scroll لقسم المنتجات
  const handleShopClick = () => {
    if (pathname === '/') {
      const productsSection = document.getElementById('products') || document.querySelector('section')
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.location.href = '/shop'
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      
      {/* 🚀 TOP BAR UPGRADE 🚀 */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-100 text-xs py-2 border-b border-emerald-800/40 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-6 text-[11px] sm:text-xs font-semibold tracking-wide">
            
            <div className="flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>Secure Checkout</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 group-hover:scale-110 transition-transform shrink-0" />
              <span>Instant Email Delivery</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>One-Time Payment</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>30-Day Money-Back Guarantee</span>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN HEADER NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand-700">
            <div className="w-8 h-8 bg-brand-700 text-white rounded-md flex items-center justify-center text-sm font-extrabold">
              QB
            </div>
            QB DEALS
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? 'text-brand-700 font-semibold'
                    : 'text-gray-600 hover:text-brand-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </Link>

            {/* 🌟 SHOP NOW BUTTON WITH ANIMATION & SMOOTH SCROLL 🌟 */}
            <button
              onClick={handleShopClick}
              className="hidden sm:inline-flex relative items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl overflow-hidden shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse hover:animate-none group cursor-pointer"
            >
              {/* تأثير لمعان ضوئي يمر على الزر */}
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <span className="relative z-10 flex items-center gap-1.5">
                Shop now
              </span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === link.to
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <ShoppingCart className="w-4 h-4" /> Cart
            </Link>

            {/* Mobile Shop Now Button */}
            <button
              onClick={() => {
                setMobileOpen(false)
                handleShopClick()
              }}
              className="w-full mt-2 inline-flex items-center justify-center py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl shadow-md active:scale-95 transition-all"
            >
              Shop now
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
