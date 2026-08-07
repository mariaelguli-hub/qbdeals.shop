import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ShieldCheck, Lock, RotateCcw, CheckCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-extrabold text-emerald-800 tracking-tight">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                QB
              </span>
              <span className="text-emerald-700">QB DEALS</span>
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
                  Alexanderstraße 40, 10179 Berlin, Germany
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
            
            {/* VISA - Perfect Clean Vector */}
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
