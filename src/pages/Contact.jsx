import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us — TaxUSA</title>
        <meta name="description" content="Get in touch with TaxUSA support. We're here to help 24/7." />
      </Helmet>
      <section className="py-16 lg:py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Contact Us</h1>
            <p className="text-gray-500">Have questions? We're here to help 24/7.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <Mail className="w-5 h-5 text-brand-700 mb-3" />
                <div className="font-semibold text-gray-900 text-sm mb-1">Email</div>
                <div className="text-sm text-gray-500">support@taxusa.shop</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <Phone className="w-5 h-5 text-brand-700 mb-3" />
                <div className="font-semibold text-gray-900 text-sm mb-1">Phone</div>
                <div className="text-sm text-gray-500">+1 (505) 399-7162</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <MapPin className="w-5 h-5 text-brand-700 mb-3" />
                <div className="font-semibold text-gray-900 text-sm mb-1">Address</div>
                <div className="text-sm text-gray-500">4479 New Creek Road, Birmingham, AL 35203</div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-xl border border-gray-200">
              <h2 className="font-bold text-gray-900 mb-6">Send us a message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none" placeholder="Tell us more..." />
                </div>
                <button type="submit" className="btn-primary">
                  <Send className="w-4 h-4" /> Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
