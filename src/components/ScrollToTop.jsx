import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // 1. Auto scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // 2. Track scroll position for button visibility & circular progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      
      // Show button after scrolling down 300px
      if (scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Calculate scroll percentage for progress ring
      if (docHeight > 0) {
        const progress = (scrollTop / docHeight) * 100
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Calculate SVG Circle circumference
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative flex items-center justify-center w-12 h-12 bg-gray-900/90 text-white rounded-2xl shadow-xl shadow-emerald-950/20 backdrop-blur-md border border-white/20 hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {/* SVG Circular Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-gray-700/40"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-emerald-400 transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Glowing Arrow Icon */}
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
