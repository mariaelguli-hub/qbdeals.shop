import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="bg-brand-700 text-white py-16 lg:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-sm mb-4 opacity-90">Trusted by businesses worldwide &middot; 24/7 support</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
          Get your genuine QuickBooks Desktop today
        </h2>
        <p className="text-white/90 mb-8">
          One-time payment. Instant delivery. 30-day money-back guarantee. No subscription, ever.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
        >
          Buy now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
