import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, ArrowLeft, Truck, Clock, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ShippingDelivery() {
  return (
    <>
      <Helmet>
        <title>Shipping & Delivery Policy — QB DEALS</title>
        <meta name="description" content="Shipping & Delivery Policy for QB DEALS digital licenses." />
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
                Shipping & Delivery Policy
              </h1>
              <p className="text-sm text-gray-400">
                Last Updated: August 2, 2026
              </p>
            </div>

            {/* Digital Products Only Banner */}
            <div className="bg-emerald-50/60 border border-emerald-200/60 p-5 rounded-2xl">
              <h2 className="text-lg font-bold text-emerald-950 mb-2 flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                Digital Products Only
              </h2>
              <p className="text-emerald-900 text-sm mb-3">
                All products available on our website are digital goods delivered electronically. We do not ship any physical products.
              </p>
              <p className="text-xs font-semibold text-emerald-800">
                Digital orders are fulfilled online and may be delivered through:
              </p>
              <ul className="list-disc pl-5 mt-1 text-xs text-emerald-800 space-y-1">
                <li>Instant on-screen order confirmation</li>
                <li>Email delivery to the address provided during checkout</li>
              </ul>
              <p className="text-xs text-emerald-700 mt-3 font-medium">
                Because our products are delivered digitally, delivery is free and typically immediate for customers worldwide, including customers in the United States.
              </p>
            </div>

            {/* Order Cut-Off Time */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                Order Cut-Off Time
              </h2>
              <p className="mb-2">
                Orders placed before <strong className="text-gray-900">5:00 PM Eastern Time (ET)</strong> are typically processed on the same business day.
              </p>
              <p>
                Orders placed after 5:00 PM ET are generally processed on the next business day.
              </p>
            </div>

            {/* Processing & Handling Time */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Processing & Handling Time
              </h2>
              <p className="mb-3">
                Our standard processing time is <strong className="text-gray-900">0–1 business day</strong>, Monday through Saturday.
              </p>
              <p>
                In most cases, digital products are delivered immediately after successful payment. However, some orders may require additional payment verification or security checks before delivery.
              </p>
            </div>

            {/* Delivery Time */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Delivery Time
              </h2>
              <p className="mb-3">
                Because all products are delivered digitally, there is no physical transit time.
              </p>
              <p>
                Once your order has been successfully processed, your license key, product information, or access details will be delivered electronically to the email address provided during checkout.
              </p>
            </div>

            {/* Public Holidays & Non-Business Days */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Public Holidays & Non-Business Days
              </h2>
              <p className="mb-2">
                Processing and delivery times may vary during public holidays and other non-business days.
              </p>
              <p>
                Orders placed during these periods will be processed as soon as normal business operations resume.
              </p>
            </div>

            {/* Delivery Issues */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                Delivery Issues
              </h2>
              <p className="mb-3">
                If you have not received your digital order, please:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                <li>Check your Spam, Junk, or Promotions folder.</li>
                <li>Confirm that the email address entered during checkout was correct.</li>
                <li>Allow additional time if your order is undergoing payment verification or security review.</li>
                <li>Contact our support team if your order is still missing.</li>
              </ul>
              <p className="text-sm font-medium text-gray-800">
                If necessary, we will review your order and resend the applicable delivery information at no additional cost.
              </p>
            </div>

            {/* Contact Us */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions regarding this Shipping & Delivery Policy, please contact us at:
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
