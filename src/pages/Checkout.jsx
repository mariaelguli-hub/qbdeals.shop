import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CreditCard } from 'lucide-react'

export default function Checkout() {
  return (
    <>
      <Helmet>
        <title>Checkout — qbdeals</title>
      </Helmet>
      <section className="py-12 lg:py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to cart
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Checkout</h1>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="you@example.com" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-4">Payment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                <div className="relative">
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none pl-10" placeholder="0000 0000 0000 0000" />
                  <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="123" />
                </div>
              </div>
            </div>
          </div>

          <button className="w-full btn-primary justify-center py-4 text-base">
            Complete purchase
          </button>
        </div>
      </section>
    </>
  )
}
