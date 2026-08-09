import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin, Send, ArrowLeft, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { supabase } from '../utils/supabase'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let userIp = 'Unknown'
    let userLocation = 'Unknown'

    // 🌐 1. جلب الـ IP
    try {
      const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) })
      const data = await res.json()
      if (data?.ip) userIp = data.ip
    } catch (e) {
      try {
        const resAlt = await fetch('https://api.bigdatacloud.net/data/client-ip', { signal: AbortSignal.timeout(3000) })
        const dataAlt = await resAlt.json()
        if (dataAlt?.ipString) userIp = dataAlt.ipString
      } catch (e2) {}
    }

    // 📍 2. جلب الموقع
    if (userIp !== 'Unknown') {
      try {
        const locRes = await fetch(`https://ipwho.is/${userIp}`, { signal: AbortSignal.timeout(3000) })
        const locData = await locRes.json()
        if (locData && locData.success) {
          const city = locData.city || locData.region || ''
          userLocation = `${city ? city + ', ' : ''}${locData.country || ''}`.trim()
        }
      } catch (e) {}
    }

    // 📤 إرسال البيانات إلى Supabase
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: 'unread',
            ip_address: userIp,
            location: userLocation
          }
        ])

      if (error) throw error

      toast.success('Message sent successfully!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error('Failed to send message. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — QB DEALS</title>
        <meta name="description" content="Get in touch with QB DEALS support team." />
      </Helmet>

      <section className="py-12 lg:py-20 bg-gray-50/50 min-h-[70vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-emerald-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Contact Us
            </h1>
            <p className="text-base text-gray-500 max-w-lg mx-auto">
              Have questions or need assistance with your order? We're here to help!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1">Email Us</div>
                <p className="text-xs text-gray-500 mb-2">Our team usually responds within a few hours.</p>
                <a href="mailto:contact@qbdeals.shop" className="text-sm font-semibold text-emerald-700 hover:underline">
                  contact@qbdeals.shop
                </a>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1">Phone Support</div>
                <p className="text-xs text-gray-500 mb-2">Mon - Sat from 9am to 6pm EST.</p>
                <span className="text-sm font-semibold text-gray-800">+1 (505) 399-7162</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1">Office Address</div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  4479 New Creek Road,<br />
                  Birmingham, AL 35203
                </p>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/60">
              <div className="flex items-center gap-2.5 mb-6 border-b border-gray-100 pb-4">
                <MessageSquare className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-gray-900">Send us a message</h2>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-gray-50/50 focus:bg-white" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-gray-50/50 focus:bg-white" 
                      placeholder="you@example.com" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-gray-50/50 focus:bg-white" 
                    placeholder="How can we help you?" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea 
                    rows={5} 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-gray-50/50 focus:bg-white resize-none" 
                    placeholder="Provide details about your query or order..." 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
