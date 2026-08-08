import React from 'react'
import { ShieldCheck, Zap, CreditCard, RotateCcw } from 'lucide-react'

export function TopBar() {
  return (
    <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-100 text-xs py-2 border-b border-emerald-800/40 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Row */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-6 text-[11px] sm:text-xs font-semibold tracking-wide">
          
          {/* Feature 1 */}
          <div className="flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
            <span>Secure Checkout</span>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 group-hover:scale-110 transition-transform shrink-0" />
            <span>Instant Email Delivery</span>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
            <CreditCard className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
            <span>One-Time Payment</span>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-1.5 text-emerald-100/90 hover:text-white transition-colors cursor-default group">
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
            <span>30-Day Money-Back Guarantee</span>
          </div>

        </div>

      </div>
    </div>
  )
}
