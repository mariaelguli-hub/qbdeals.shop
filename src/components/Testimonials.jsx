import testimonials from '../data/testimonials.json'
import { Star, BadgeCheck } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">What our customers say</h2>
        <p className="text-gray-500 mb-12">Real feedback from businesses like yours.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex text-brand-600 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="font-bold text-gray-900 mb-2">{t.title}</div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-100 text-brand-800 rounded-full flex items-center justify-center text-xs font-bold">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.location}</div>
                </div>
                {t.verified && (
                  <span className="ml-auto flex items-center gap-1 text-xs text-brand-700 font-medium">
                    <BadgeCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
