import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Mail, Lock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-xl font-black text-white tracking-tight">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                Q
              </span>
              QB DEALS
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Your trusted source for 100% genuine software licenses. One-time payment, instant email delivery, and 24/7 dedicated customer support.
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-emerald-400 pt-2">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> 100% Genuine</span>
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> SSL Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-emerald-400 transition-colors">Shop All Licenses</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition-colors">FAQ & Support</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages - Column 1 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Legal & Policy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-emerald-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-emerald-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/gdpr-policy" className="hover:text-emerald-400 transition-colors">
                  GDPR Policy
                </Link>
              </li>
              <li>
                <Link to="/legal-notice" className="hover:text-emerald-400 transition-colors">
                  Legal Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Pages - Column 2 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Customer Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/refund-policy" className="hover:text-emerald-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-emerald-400 transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-delivery" className="hover:text-emerald-400 transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-emerald-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} QB DEALS. All rights reserved.
          </p>
          <p className="max-w-md">
            Disclaimer: All trademarks, logos, and brand names are the property of their respective owners.
          </p>
        </div>

      </div>
    </footer>
  )
}
