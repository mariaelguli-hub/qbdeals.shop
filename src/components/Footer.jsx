import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ShieldCheck, Lock, RotateCcw, CheckCircle2 } from 'lucide-react'

const shopLinks = [
  { to: '/shop', label: 'All Products' },
  { to: '/shop', label: 'Pro' },
  { to: '/shop', label: 'Enterprise' },
  { to: '/shop', label: 'Mac' },
]

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact Us' },
]

const legalLinks = [
  { to: '/refund-policy', label: 'Refund Policy' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-conditions', label: 'Terms & Conditions' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand-700 mb-4">
              <div className="w-8 h-8 bg-brand-700 text-white rounded-md flex items-center justify-center text-sm font-extrabold">
                QB
              </div>
              QB DEALS
            </Link>
            <p className="text-sm text-gray-500 mb-5">
              Genuine QuickBooks Desktop licenses. One-time purchase, instant delivery.
            </p>
            <div className="space-y-2.5 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@qbdeals.shop
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +1 (505) 399-7162
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Alexanderstraße 40, 10179 Berlin, Germany Berlin Berlin 10179</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-bold text-sm text-gray-900 mb-4">Shop</div>
            <div className="space-y-2.5 text-sm text-gray-500">
              {shopLinks.map((link) => (
                <Link key={link.label} to={link.to} className="block hover:text-brand-700 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-bold text-sm text-gray-900 mb-4">Company</div>
            <div className="space-y-2.5 text-sm text-gray-500">
              {companyLinks.map((link) => (
                <Link key={link.label} to={link.to} className="block hover:text-brand-700 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-bold text-sm text-gray-900 mb-4">Legal</div>
            <div className="space-y-2.5 text-sm text-gray-500">
              {legalLinks.map((link) => (
                <Link key={link.label} to={link.to} className="block hover:text-brand-700 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges & Payment Methods */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-5 font-medium">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-600" /> SSL Secured</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secure Payment</span>
            <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-emerald-600" /> 30-Day Money-Back</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Genuine License</span>
          </div>

{/* Payment Logos */}
          <div className="flex items-center gap-2">
            {/* Visa */}
            <div className="h-8 px-2.5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
              <svg className="h-3.5 w-auto" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.882 0.288L9.082 11.664H6.126L3.714 2.508C3.558 1.884 3.42 1.656 2.898 1.368C2.016 0.888 0.942 0.456 0 0.252L0.054 0.288H4.992C5.646 0.288 6.222 0.72 6.36 1.452L7.56 7.944L10.98 0.288H13.882ZM25.26 8.244C25.272 5.124 20.916 4.944 20.94 3.552C20.952 3.132 21.366 2.676 22.314 2.556C22.782 2.496 24.072 2.436 25.326 3.012L25.86 0.588C25.128 0.324 24.18 0.084 22.98 0.084C20.088 0.084 18.036 1.62 18.018 3.804C18.006 5.436 19.476 6.348 20.58 6.888C21.72 7.44 22.104 7.788 22.092 8.292C22.08 9.06 21.168 9.408 20.316 9.42C18.912 9.444 18.09 9.048 17.436 8.748L16.884 11.244C17.58 11.568 18.846 11.844 20.178 11.856C23.274 11.856 25.248 10.332 25.26 8.244ZM32.72 11.664H35.268L33.048 0.288H30.72C30.204 0.288 29.778 0.588 29.58 1.056L25.29 11.664H28.242L28.83 10.02H32.448L32.72 11.664ZM29.646 7.74L31.134 3.636L31.992 7.74H29.646ZM17.658 0.288L15.354 11.664H12.516L14.82 0.288H17.658Z" fill="#1434CB"/>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="h-8 px-2.5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 object-contain" />
            </div>

            {/* PayPal */}
            <div className="h-8 px-2.5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3.5 object-contain" />
            </div>

            {/* Apple Pay */}
            <div className="h-8 px-2.5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-3.5 object-contain" />
            </div>

            {/* Google Pay */}
            <div className="h-8 px-2.5 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-3.5 object-contain" />
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
          <div>&copy; 2026 QB DEALS. All rights reserved.</div>
          <div className="text-right text-[11px] text-gray-400">
            QuickBooks and Intuit are trademarks of Intuit Inc. QB DEALS is an independent retailer and is not affiliated with Intuit.
          </div>
        </div>

      </div>
    </footer>
  )
}
