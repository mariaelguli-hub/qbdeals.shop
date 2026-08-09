import React from 'react'
import testimonials from '../data/testimonials.json'
import { Star, BadgeCheck, Sparkles, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Badge & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-black uppercase tracking-widest mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Verified Customer Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            What our customers say
          </h2>
          
          <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed">
            Real feedback from businesses like yours.
          </p>
        </motion.div>

        {/* 💬 Testimonials Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-2xl hover:shadow-emerald-950/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              
              {/* Top Quote Accent Icon */}
              <div className="absolute top-6 right-6 text-emerald-100 group-hover:text-emerald-200/60 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 rotate-180" />
              </div>

              <div>
                {/* Golden Stars Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 stroke-amber-400" />
                  ))}
                </div>

                {/* Review Title */}
                <h3 className="font-extrabold text-gray-900 text-base mb-2 group-hover:text-emerald-800 transition-colors">
                  {t.title}
                </h3>

                {/* Review Body Text */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 line-clamp-6 font-medium relative z-10">
                  "{t.text}"
                </p>
              </div>

              {/* User Profile Info Footer */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-auto">
                
                <div className="flex items-center gap-3">
                  {/* Avatar Circle with Initials */}
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center text-xs font-black shadow-md shadow-emerald-900/10 border border-emerald-400/30 shrink-0">
                    {t.initials}
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug">
                      {t.name}
                    </div>
                    <div className="text-[11px] font-semibold text-gray-400">
                      {t.location}
                    </div>
                  </div>
                </div>

                {/* Verified Buyer Badge */}
                {t.verified && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[10px] font-black uppercase tracking-wider shrink-0">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    <span>Verified</span>
                  </div>
                )}

              </div>

              {/* Bottom Subtle Gradient Bar Accent */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
