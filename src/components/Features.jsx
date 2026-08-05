import { Infinity, Zap, CheckCircle, ShieldCheck, Lock } from 'lucide-react'

const featuresList = [
  {
    icon: Infinity,
    title: 'One-Time Purchase',
    desc: 'Pay once. No subscription, no monthly fees, no annual fees.',
  },
  {
    icon: Zap,
    title: 'Instant Email Delivery',
    desc: 'Receive your license key and download link within minutes.',
  },
  {
    icon: CheckCircle,
    title: 'Genuine License',
    desc: 'Authentic license keys with full activation support.',
  },
  {
    icon: ShieldCheck,
    title: 'Money-Back Guarantee',
    desc: "30-day guarantee. If it doesn't activate, we make it right.",
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    desc: '256-bit SSL, PCI-compliant payments via Stripe & PayPal.',
  },
]

export default function Features() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
          Why thousands choose us
        </h2>
        <p className="text-gray-500 mb-12">
          Everything you need to buy with total confidence.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {featuresList.map((f, i) => (
            <div key={i} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 mx-auto mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-gray-900 mb-1.5">{f.title}</div>
              <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
