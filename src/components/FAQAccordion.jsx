import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import faqs from '../data/faq.json'

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-gray-900 text-sm">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(null)

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Frequently asked questions</h2>
        <p className="text-gray-500 mb-10">Everything you need to know before you buy.</p>
        <div className="space-y-3 text-left">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Still have questions?{' '}
          <a href="/faq" className="text-brand-700 font-semibold underline">See all FAQs</a>{' '}
          or{' '}
          <a href="/contact" className="text-brand-700 font-semibold underline">contact us</a>.
        </p>
      </div>
    </section>
  )
}
