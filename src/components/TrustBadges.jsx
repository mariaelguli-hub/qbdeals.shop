export default function TrustBadges() {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-brand-700">100%</div>
            <div className="text-sm text-gray-500 mt-1">Genuine licenses</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-brand-700">4.8★</div>
            <div className="text-sm text-gray-500 mt-1">Average rating</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-brand-700">22</div>
            <div className="text-sm text-gray-500 mt-1">Verified reviews</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-brand-700">24/7</div>
            <div className="text-sm text-gray-500 mt-1">Support</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap justify-center gap-5">
            <span className="flex items-center gap-1.5">🔒 SSL Secured</span>
            <span className="flex items-center gap-1.5">✓ Secure Payment</span>
            <span className="flex items-center gap-1.5">↩ 30-Day Money-Back</span>
            <span className="flex items-center gap-1.5">✓ Genuine License</span>
          </div>
          <div className="flex items-center gap-2">
            <span>We accept</span>
            <span className="bg-gray-800 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">VISA</span>
            <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">MC</span>
            <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">PayPal</span>
            <span className="bg-gray-900 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">Apple</span>
            <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">GPay</span>
          </div>
        </div>
      </div>
    </section>
  )
}
