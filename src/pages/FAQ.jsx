import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import FAQAccordion from '../components/FAQAccordion'

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions — QB DEALS</title>
        <meta name="description" content="Find answers to common questions about QuickBooks Desktop licenses, delivery, and support." />
      </Helmet>

      <section className="py-12 lg:py-20 bg-gray-50/50 min-h-[70vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-emerald-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Header text */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100/60 text-emerald-800 rounded-2xl mb-4">
              <HelpCircle className="w-7 h-7" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-base text-gray-500 max-w-lg mx-auto">
              Everything you need to know before you buy your license.
            </p>
          </div>

          {/* Accordion Component */}
          <FAQAccordion />

        </div>
      </section>
    </>
  )
}
