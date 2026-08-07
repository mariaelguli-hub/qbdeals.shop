import React from 'react'
import { motion } from 'framer-motion'
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

// Container Animation (Stagger effect for cards)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

// Single Card Animation
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export default function Features() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Why thousands choose us
          </h2>
          <p className="text-gray-500 mb-12">
            Everything you need to buy with total confidence.
          </p>
        </motion.div>

        {/* Animated Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {featuresList.map((f, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative p-6 border border-gray-200/80 rounded-2xl bg-white cursor-pointer
                         transition-all duration-300
                         hover:shadow-xl hover:shadow-brand-700/10 hover:border-brand-700/40"
            >
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand-700/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Animated Icon */}
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-700 mx-auto mb-4
                           transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white"
              >
                <f.icon className="w-6 h-6 stroke-[2]" />
              </motion.div>

              <div className="font-bold text-gray-900 mb-1.5 group-hover:text-brand-700 transition-colors">
                {f.title}
              </div>
              <div className="text-sm text-gray-500 leading-relaxed">
                {f.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
