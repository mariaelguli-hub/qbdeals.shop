export default function AnnouncementBar() {
  return (
    <div className="bg-brand-700 text-white text-center py-2 px-4 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
        <span className="flex items-center gap-1.5">🔒 Secure checkout</span>
        <span className="flex items-center gap-1.5">⚡ Instant email delivery</span>
        <span className="flex items-center gap-1.5">💳 One-time payment</span>
        <span className="flex items-center gap-1.5">✅ 30-day money-back guarantee</span>
      </div>
    </div>
  )
}
