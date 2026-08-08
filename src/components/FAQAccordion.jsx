import React, { useState } from 'react'
import { ChevronDown, HelpCircle, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'Is this a one-time purchase or a subscription?',
    answer: 'All our licenses are genuine, one-time purchases. You pay once and own the license key — there are no monthly, yearly, or recurring subscription fees.'
  },
  {
    question: 'How fast is delivery?',
    answer: 'Delivery is instant! Once your order and payment are processed, your license key, download details, and setup instructions are sent directly to your email address.'
  },
  {
    question: 'Are the licenses genuine?',
    answer: 'Yes, 100%. All QuickBooks licenses we offer are authentic, official, and guaranteed to activate fully without issues.'
  },
  {
    question: 'Which payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover) through a fully secure, encrypted checkout process.'
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer: 'Yes! We stand behind our software with a 30-day money-back guarantee. If your license key fails to activate as described, you will receive a full refund.'
  },
  {
    question: 'Is there support if I need help installing?',
    answer: 'Absolutely! Our dedicated technical support team is available via email to guide you step-by-step through download, installation, and license activation.'
  }
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${
              isOpen 
                ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' 
                : 'border-gray-200/80 hover:border-emerald-300 hover:shadow'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus:outline-none group"
            >
              <span className={`text-base sm:text-lg font-bold transition-colors ${
                isOpen ? 'text-emerald-900' : 'text-gray-900 group-hover:text-emerald-800'
              }`}>
                {faq.question}
              </span>
              <div className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                isOpen ? 'bg-emerald-100 text-emerald-700 rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-emerald-50 group-hover:text-emerald-600'
              }`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>

            {/* Smooth Animation Grid */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 sm:px-8 pb-6 text-gray-600 leading-relaxed text-sm sm:text-base border-t border-gray-100/80 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Footer link section */}
      <div className="text-center pt-8 text-sm text-gray-500">
        Still have questions?{' '}
        <Link to="/contact" className="text-emerald-700 font-semibold underline hover:text-emerald-800 transition-colors">
          contact us
        </Link>.
      </div>
    </div>
  )
}
