import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

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
                TU
              </div>
              Tax USA
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
                <span>4479 New Creek Road Birmingham Alabama 35203 United States</span>
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

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap justify-center gap-5">
            <span>SSL Secured</span>
            <span>Secure Payment</span>
            <span>30-Day Money-Back</span>
            <span>Genuine License</span>
          </div>
          <div>&copy; 2026 TaxUSA. All rights reserved.</div>
        </div>
        <div className="mt-2 text-right text-[11px] text-gray-400">
          QuickBooks and Intuit are trademarks of Intuit Inc. TaxUSA is an independent retailer and is not affiliated with Intuit.
        </div>
      </div>
    </footer>
  )
}
