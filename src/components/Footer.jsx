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

          {/* Authentic Payment Badge SVGs */}
          <div className="flex items-center gap-2">
            
            {/* VISA */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-auto" viewBox="0 0 36 12" fill="none">
                <path d="M13.882 0.284L9.088 11.66H6.182L3.74 2.502C3.593 1.928 3.447 1.71 3.011 1.472C2.288 1.077 1.07 0.709 0 0.472L0.082 0.284H5.068C5.72 0.284 6.279 0.718 6.425 1.436L7.662 8.016L10.686 0.284H13.882ZM25.753 8.356C25.766 5.176 21.36 4.996 21.387 3.568C21.4 3.136 21.823 2.668 22.75 2.548C23.212 2.488 24.502 2.436 25.86 3.064L26.417 0.472C25.655 0.198 24.689 0 23.477 0C20.62 0 18.591 1.516 18.563 3.68C18.523 5.288 19.992 6.184 21.094 6.724C22.223 7.276 22.604 7.628 22.59 8.128C22.57 8.896 21.658 9.236 20.801 9.248C19.346 9.272 18.502 8.856 17.822 8.544L17.25 11.232C18.041 11.596 19.511 11.904 21.034 11.916C24.082 11.916 26.069 10.412 25.753 8.356ZM33.313 11.66H36L33.647 0.284H31.185C30.573 0.284 30.056 0.64 29.825 1.192L25.485 11.66H28.669L29.308 9.892H33.204L33.313 11.66ZM30.165 7.544L31.812 3.012L32.75 7.544H30.165ZM18.25 0.284L15.75 11.66H12.72L15.22 0.284H18.25Z" fill="#1434CB"/>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
              <svg className="h-5 w-auto" viewBox="0 0 24 16" fill="none">
                <circle cx="7" cy="8" r="7" fill="#EB001B"/>
                <circle cx="17" cy="8" r="7" fill="#F79E1B"/>
                <path d="M12 2.126C10.707 3.612 9.932 5.672 9.932 8C9.932 10.328 10.707 12.388 12 13.874C13.293 12.388 14.068 10.328 14.068 8C14.068 5.672 13.293 3.612 12 2.126Z" fill="#FF5F00"/>
              </svg>
            </div>

            {/* PayPal */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-auto" viewBox="0 0 40 12" fill="none">
                <path d="M6.3 0H2.1C1.8 0 1.5 0.2 1.4 0.5L0 9.7C0 9.9 0.1 10.1 0.3 10.1H2.4C2.7 10.1 3 9.9 3.1 9.6L3.7 5.7C3.8 5.4 4.1 5.2 4.4 5.2H5.8C8.1 5.2 9.6 4.1 10.1 1.9C10.3 1 10 0.4 9.3 0.2C8.6 0 7.4 0 6.3 0Z" fill="#003087"/>
                <path d="M14.3 0H10.1C9.8 0 9.5 0.2 9.4 0.5L8 9.7C0 9.9 8.1 10.1 8.3 10.1H10.4C10.7 10.1 11 9.9 11.1 9.6L11.7 5.7C11.8 5.4 12.1 5.2 12.4 5.2H13.8C16.1 5.2 17.6 4.1 18.1 1.9C18.3 1 18 0.4 17.3 0.2C16.6 0 15.4 0 14.3 0Z" fill="#0079C1"/>
              </svg>
            </div>

            {/* Apple Pay */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
              <span className="font-extrabold text-gray-900 text-xs tracking-tight flex items-center gap-1">
                <svg className="h-3.5 w-auto fill-gray-900" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.37-6.08-3.37-2.73-7.29-7.46-11.77-14.19-6.3-9.58-11.16-20.12-14.58-31.62-3.42-11.5-5.13-22.36-5.13-32.58 0-14.38 3.51-26.35 10.53-35.91 7.02-9.56 16.03-14.44 27.03-14.64 4.8 0 10.02 1.25 15.66 3.75 5.64 2.5 9.47 3.75 11.5 3.75 1.82 0 5.76-1.3 11.82-3.9 6.06-2.6 11.19-3.8 15.39-3.6 11.58.82 20.81 5.09 27.69 12.82-10.22 6.18-15.22 14.88-15.01 26.1.2 8.78 3.58 16.18 10.14 22.2 6.56 6.02 14.44 9.48 23.64 10.38-2.22 6.59-4.8 13.06-7.75 19.41zM119.22 31.84c0-7.07 2.58-13.88 7.74-20.43 5.16-6.55 11.75-10.66 19.78-12.33.19 1.13.29 2.12.29 2.97 0 6.94-2.62 13.78-7.86 20.52-5.24 6.74-11.8 10.87-19.68 12.39-.07-.94-.27-2.01-.27-3.12z" />
                </svg>
                Pay
              </span>
            </div>

            {/* Google Pay */}
            <div className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
              <span className="font-bold text-gray-700 text-xs tracking-tight flex items-center gap-1">
                <span className="text-blue-600 font-extrabold">G</span> Pay
              </span>
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
