import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Building2, ShieldCheck, Zap, Award, Mail, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — QB DEALS</title>
        <meta name="description" content="QB DEALS is an independent retailer specializing in genuine QuickBooks Desktop licenses." />
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
                About QB DEALS
              </h1>
              <p className="text-sm text-gray-400">
                Your Trusted Independent Software License Provider
              </p>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                <strong className="text-gray-900">QB DEALS</strong> is an independent retailer specializing in genuine QuickBooks Desktop licenses. We believe software should be owned, not rented. That is why we offer one-time purchase licenses with lifetime activation — no subscriptions, no hidden fees.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Every license key is authentic and backed by our 30-day money-back guarantee. Our support team is available to help with installation and activation, trusted by accountants and small business owners across the United States.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-base mb-1">Genuine Licenses</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Authentic lifetime activation keys with no subscriptions or hidden fees.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <Zap className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-base mb-1">Instant Digital Delivery</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Fast electronic delivery right to your email address after purchase.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <Award className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-base mb-1">30-Day Guarantee</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Every order is backed by a 30-day money-back risk-free guarantee.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <Users className="w-6 h-6 text-emerald-600 mb-2" />
                <h3 className="font-bold text-gray-900 text-base mb-1">Trusted Support</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Assisting accountants and small business owners with installation.
                </p>
              </div>

            </div>

            {/* Independent Reseller Notice Box */}
            <div className="bg-amber-50/60 border border-amber-200/60 p-5 rounded-2xl">
              <h2 className="text-base font-bold text-amber-950 mb-1 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                Independent Reseller Notice
              </h2>
              <p className="text-amber-900 text-xs leading-relaxed">
                QB DEALS operates as an independent reseller of software licenses. We are not directly affiliated with, authorized by, or endorsed by Intuit Inc., QuickBooks, or any related trademark owners.
              </p>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Have Questions? Contact Us
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                If you have any questions about our licenses, feel free to reach out to our team:
              </p>
              <div className="inline-flex items-center gap-2 p-3.5 bg-emerald-50 rounded-xl text-emerald-900 font-semibold text-sm border border-emerald-200/60">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Email: <a href="mailto:contact@qbdeals.shop" className="underline hover:text-emerald-700">contact@qbdeals.shop</a></span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
