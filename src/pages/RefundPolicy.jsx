import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, RotateCcw, HelpCircle, AlertCircle, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund Policy — QB DEALS</title>
        <meta name="description" content="30-day money-back guarantee and refund policy for QB DEALS." />
      </Helmet>

      <section className="py-12 lg:py-20 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-emerald-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Main Card / Cadre */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-gray-200/60 border border-gray-100 text-gray-700 leading-relaxed space-y-8">
            
            {/* H1 Heading */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                Refund Policy
              </h1>
              <p className="text-sm text-gray-400">
                Last Updated: August 2, 2026
              </p>
            </div>

            {/* Overview / Guarantee Banner */}
            <div className="bg-emerald-50/60 border border-emerald-200/60 p-5 rounded-2xl">
              <h2 className="text-lg font-bold text-emerald-950 mb-2 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0" />
                30-Day Money-Back Guarantee
              </h2>
              <p className="text-emerald-900 text-sm leading-relaxed">
                We stand behind the quality of every license we offer. If your QuickBooks license does not activate as expected, or if you are not satisfied with your purchase for any reason, you may request a full refund within 30 days of purchase.
              </p>
            </div>

            {/* How to Request a Refund */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                How to Request a Refund
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                If you need to request a refund, please contact our support team at <a href="mailto:support@qbdeals.shop" className="text-emerald-600 font-semibold hover:underline">support@qbdeals.shop</a> and include your order details.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Once your request is approved, we will process the refund within <strong className="text-gray-900">3–5 business days</strong>.
              </p>
            </div>

            {/* Exceptions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                Exceptions
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Refund requests must be submitted within 30 days of purchase and are only available for licenses that have not been successfully activated.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Contact Support
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                Have questions or need assistance with your refund? Reach out to us directly:
              </p>
              <div className="inline-flex items-center gap-2 p-3.5 bg-emerald-50 rounded-xl text-emerald-900 font-semibold text-sm border border-emerald-200/60">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Email: <a href="mailto:support@qbdeals.shop" className="underline hover:text-emerald-700">support@qbdeals.shop</a></span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
