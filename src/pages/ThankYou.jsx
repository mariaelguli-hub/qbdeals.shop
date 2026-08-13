import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, ShieldCheck, Mail, Copy, Check, Download, ArrowLeft, Key } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ThankYou() {
  const [searchParams] = useSearchParams()
  const [copied, setCopied] = useState(false)

  // 🆔 جلب المعلمات الديناميكية من الرابط
  const orderId = searchParams.get('id') || searchParams.get('tx') || `TXN-${Math.floor(100000 + Math.random() * 900000)}`
  const amount = searchParams.get('amount') || searchParams.get('amt') || '159.00'
  const productName = searchParams.get('product') || 'QuickBooks Desktop License'

  useEffect(() => {
    // 🔒 منع تكرار إرسال التراكينغ لو دار الزبون Refresh
    const trackedKey = `qb_tracked_${orderId}`
    const alreadyTracked = localStorage.getItem(trackedKey)

    if (!alreadyTracked && typeof window !== 'undefined' && window.gtag) {
      // 📢 إرسال حدث التحويل الحقيقي لـ Google Ads مع الـ ID والثمن المباشر
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18323871651/ngvwCKKG0eAcEKOvwKFE',
        'value': parseFloat(amount),
        'currency': 'USD',
        'transaction_id': orderId
      })

      // حفظ الـ ID فـ المتصفح باش ما يتعاودش يتسجل
      localStorage.setItem(trackedKey, 'true')
    }
  }, [orderId, amount])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Order ID copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Helmet>
        <title>Order Confirmed — QB DEALS</title>
      </Helmet>

      <div className="min-h-[85vh] bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          
          {/* HEADER BANNER */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-center text-white space-y-3 relative">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Payment Confirmed!
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium">
              Thank you for choosing QB DEALS. Your order is processed.
            </p>
          </div>

          {/* ORDER DETAILS CONTAINER */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* ORDER SUMMARY BOX */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Transaction ID</span>
                <button 
                  onClick={() => copyToClipboard(orderId)}
                  className="font-mono font-bold text-gray-900 flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                >
                  #{orderId} {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                </button>
              </div>

              <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-200/60">
                <span className="text-gray-500 font-medium">Product</span>
                <span className="font-semibold text-gray-800">{productName}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Amount Paid</span>
                <span className="font-extrabold text-emerald-600 text-sm">${amount} USD</span>
              </div>
            </div>

            {/* DELIVERY STATUS INFO */}
            <div className="bg-emerald-50/70 border border-emerald-200/60 p-4 rounded-2xl flex items-start gap-3.5">
              <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-emerald-900">Instant Email Delivery</h4>
                <p className="text-emerald-800/80 leading-relaxed">
                  Your official license key and secure software download link are being dispatched to your email address right now. Please check your inbox and spam folder.
                </p>
              </div>
            </div>

            {/* LICENSE PLACEHOLDER BOX */}
            <div className="border border-dashed border-gray-300 rounded-2xl p-4 text-center space-y-2 bg-white">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700">
                <Key className="w-4 h-4 text-emerald-600" /> Digital License Status:
              </div>
              <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-xl inline-block">
                Activated & Dispatched via Email
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-2">
              <Link
                to="/"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Store
              </Link>
            </div>

            {/* GUARANTEE FOOTER */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 30-Day Money-Back Guarantee Included
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
