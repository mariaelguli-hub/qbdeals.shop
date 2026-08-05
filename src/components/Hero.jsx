import { Link } from 'react-router-dom'
import { ArrowRight, Infinity, Zap, CheckCircle, ShieldCheck } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-800 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              ⭐ 4.8/5 from 22 verified reviews
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 leading-[1.1] mb-6">
              Genuine QuickBooks Desktop 2024 —{' '}
              <span className="text-brand-700">one-time payment</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl">
              Stop paying yearly. Get an authentic QuickBooks Desktop license key delivered to your inbox in minutes — no subscription, no monthly fees, backed by a 30-day money-back guarantee.
            </p>
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-600" /> No subscription
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-600" /> Instant delivery
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-600" /> Genuine license
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">
                Buy now — from $137.00 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/shop" className="btn-secondary">
                View all products
              </Link>
            </div>
          </div>

          {/* Right - Why buy card */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Why buy from us</h3>
              <span className="badge-green">Best Selling</span>
            </div>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-700 shrink-0">
                  <Infinity className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">One-Time Purchase</div>
                  <div className="text-sm text-gray-500">Pay once. No subscription, no monthly fees, no annual fees.</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-700 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">Instant Email Delivery</div>
                  <div className="text-sm text-gray-500">Receive your license key and download link within minutes.</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-700 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">Genuine License</div>
                  <div className="text-sm text-gray-500">Authentic license keys with full activation support.</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">Money-Back Guarantee</div>
                  <div className="text-sm text-gray-500">30-day guarantee. If it doesn't activate, we make it right.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
