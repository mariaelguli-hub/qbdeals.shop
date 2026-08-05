import { Search, CreditCard, Mail, Download } from 'lucide-react'

const steps = [
  {
    num: 1,
    icon: Search,
    title: 'Choose your product',
    desc: 'Pick the QuickBooks Desktop edition that fits your business.',
  },
  {
    num: 2,
    icon: CreditCard,
    title: 'Secure payment',
    desc: 'Pay safely with card (Stripe) or PayPal — encrypted end-to-end.',
  },
  {
    num: 3,
    icon: Mail,
    title: 'Receive your license',
    desc: 'Your genuine key and download link arrive by email in minutes.',
  },
  {
    num: 4,
    icon: Download,
    title: 'Download & activate',
    desc: "Install, enter your key, and you're ready — with 24/7 support.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How it works</h2>
        <p className="text-gray-500 mb-12">From purchase to activation in four simple steps.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {steps.map((step) => (
            <div key={step.num} className="p-6 border border-gray-200 rounded-xl">
              <div className="w-9 h-9 bg-brand-700 text-white rounded-lg flex items-center justify-center font-extrabold text-sm mb-4">
                {step.num}
              </div>
              <div className="font-bold text-gray-900 mb-1.5">{step.title}</div>
              <div className="text-sm text-gray-500 leading-relaxed">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
