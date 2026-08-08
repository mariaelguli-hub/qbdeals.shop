import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, ArrowLeft, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer — QB DEALS</title>
        <meta name="description" content="Disclaimer for QB DEALS regarding independent reselling and trademark notices." />
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

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-gray-200/60 border border-gray-100 text-gray-700 leading-relaxed space-y-8">
            
            {/* H1 Heading */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                Disclaimer
              </h1>
              <p className="text-sm text-gray-400">
                Last Updated: August 2, 2026
              </p>
            </div>

            {/* Independent Reseller Notice */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                Independent Reseller Notice
              </h2>
              <p className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-2xl text-amber-950 text-sm font-medium leading-relaxed">
                QB DEALS operates as an independent reseller of software licenses. We are not affiliated with, authorized by, endorsed by, or sponsored by Intuit Inc., QuickBooks, or any of their subsidiaries, affiliates, or related entities.
              </p>
            </div>

            {/* Trademark Notice */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Trademark Notice
              </h2>
              <p className="mb-3">
                All trademarks, service marks, product names, logos, and other brand features displayed on this website are the property of their respective owners.
              </p>
              <p>
                The use of these names, trademarks, logos, or other brand elements on this website is solely for identification and informational purposes. Such use does not imply any affiliation, partnership, authorization, endorsement, or sponsorship by the respective trademark owners.
              </p>
            </div>

            {/* Product Disclaimer */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Product Disclaimer
              </h2>
              <p className="mb-3">
                All software licenses offered through this website are sold by QB DEALS as an independent reseller.
              </p>
              <p>
                By purchasing a license through our website, you acknowledge and understand that your purchase is made through an independent reseller and not directly from the original software publisher or brand owner.
              </p>
            </div>

            {/* Contact Us */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions regarding this Disclaimer, please contact us at:
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
