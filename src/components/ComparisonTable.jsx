import React from 'react'
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const rows = [
  { feature: 'One-time payment', us: true, retail: false, other: 'Sometimes' },
  { feature: 'No subscription / no yearly fees', us: true, retail: false, other: 'Sometimes' },
  { feature: 'Instant email delivery', us: true, retail: 'Varies', other: 'Varies' },
  { feature: 'Genuine license key', us: true, retail: true, other: 'Unclear' },
  { feature: '24/7 human support', us: true, retail: 'Limited', other: 'Limited' },
  { feature: '30-day money-back guarantee', us: true, retail: 'Varies', other: 'Rare' },
  { feature: 'Save up to 90%', us: true, retail: false, other: 'Varies' },
]

function Cell({ value, isUs }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${
          isUs ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-700'
        }`}>
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    )
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
          <X className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    )
  }
  return <span className="font-semibold text-gray-400 text-xs sm:text-sm">{value}</span>
}

export default function ComparisonTable() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Badge & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-black uppercase tracking-widest mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Smart Comparison</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Why we're the smarter choice
          </h2>
          
          <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed">
            See how we compare to yearly subscriptions and other stores.
          </p>
        </motion.div>

        {/* 📊 High-Level Comparison Table Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl border border-gray-200/80 shadow-xl shadow-gray-200/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              
              {/* Table Header */}
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60 text-xs sm:text-sm">
                  <th className="py-6 px-6 font-extrabold text-gray-900 w-2/5 align-middle">
                    Feature
                  </th>
                  
                  {/* Our Store Highlighted Header (With Clean Badge Inside) */}
                  <th className="py-4 px-6 text-center bg-emerald-500/10 border-x border-emerald-500/20 align-middle">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="bg-emerald-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                        Best Choice
                      </span>
                      <div className="flex items-center gap-1.5 font-black text-emerald-700 text-sm sm:text-base">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Our Store</span>
                      </div>
                    </div>
                  </th>

                  <th className="py-6 px-6 font-bold text-gray-500 text-center align-middle">
                    Retail Subscription
                  </th>

                  <th className="py-6 px-6 font-bold text-gray-500 text-center align-middle">
                    Other Stores
                  </th>
                </tr>
              </thead>

              {/* Table Rows */}
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {rows.map((row, i) => (
                  <tr 
                    key={i} 
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    {/* Feature Title */}
                    <td className="py-4 px-6 font-bold text-gray-800 group-hover:text-emerald-900 transition-colors">
                      {row.feature}
                    </td>

                    {/* Our Store Result (Highlighted Column) */}
                    <td className="py-4 px-6 text-center bg-emerald-500/5 border-x border-emerald-500/15">
                      <Cell value={row.us} isUs={true} />
                    </td>

                    {/* Retail Subscription Result */}
                    <td className="py-4 px-6 text-center text-gray-500">
                      <Cell value={row.retail} isUs={false} />
                    </td>

                    {/* Other Stores Result */}
                    <td className="py-4 px-6 text-center text-gray-500">
                      <Cell value={row.other} isUs={false} />
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
