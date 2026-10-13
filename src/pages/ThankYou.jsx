import React, { useEffect, useState } from 'react'
import { useSearchParams, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, ShieldCheck, Mail, Copy, Check, ArrowLeft, Key, MessageSquare, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ThankYou() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [copied, setCopied] = useState(false)

  // 🧠 Deep Integration: جلب البيانات الحقيقية من صفحة الدفع (Checkout State)
  const stateData = location.state || {}
  
  const orderId = stateData.orderId || searchParams.get('id') || `TXN-${Math.floor(100000 + Math.random() * 900000)}`
  const amount = stateData.amount || searchParams.get('amount') || '135.00'
  const customerEmail = stateData.email || searchParams.get('email') || 'your email inbox'
  const osType = stateData.os || 'Desktop'
  const productName = `QuickBooks ${osType} License 2024`

  useEffect(() => {
    // 🔒 منع تكرار إرسال التراكينغ لو دار الزبون Refresh
    const trackedKey = `qb_tracked_${orderId}`
    const alreadyTracked = localStorage.getItem(trackedKey)

    if (!alreadyTracked && typeof window !== 'undefined' && window.gtag) {
      // 📢 إرسال حدث التحويل الحقيقي لـ Google Ads مع الـ ID والثمن الحقيقي اللي دفع الزبون
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18323871651/ngvwCKKG0eAcEKOvwKFE',
        'value': parseFloat(amount),
        'currency': 'USD',
        'transaction_id': orderId
      })

      localStorage.setItem(trackedKey, 'true')
    }
  }, [orderId, amount])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Order ID copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  // دالة لفتح الشات في حال واجه مشكلة (بدل أن يفتح Dispute في بايبال)
  const openLiveChat = () => {
    toast('Please click the Chat icon at the bottom right of your screen.', { icon: '💬' });
  }

  return (
    <>
      <Helmet>
        <title>Order Confirmed — QB DEALS</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
        <div className="max-w-2xl w-full bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
          
          {/* HEADER BANNER */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 p-8 text-center text-white space-y-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto shadow-inner mb-4">
                <CheckCircle2 className="w-12 h-12 text-white stroke-[2.5]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Payment Successful!
              </h1>
              <p className="text-emerald-50 text-sm sm:text-base font-medium mt-2">
                Thank you for choosing QB DEALS. Your order has been securely processed.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* 📧 DELIVERY STATUS INFO (Dispute Prevention) */}
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="bg-blue-100 p-2.5 rounded-full shrink-0 mt-0.5">
                <Mail className="w-6 h-6 text-blue-700" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-blue-900 text-base">Your license has been sent!</h4>
                <p className="text-blue-800/80 text-sm leading-relaxed">
                  We have dispatched your official license key and download link to: <br/>
                  <strong className="text-blue-900 bg-blue-100/50 px-2 py-0.5 rounded inline-block mt-1">{customerEmail}</strong>
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 p-2 rounded-lg mt-3 border border-amber-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Important: Please check your <u>Spam/Junk folder</u> if you don't see it in your Inbox.</span>
                </div>
              </div>
            </div>

            {/* 🛒 ORDER SUMMARY BOX */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-600" /> Order Summary
              </h3>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Transaction ID</span>
                <button 
                  onClick={() => copyToClipboard(orderId)}
                  className="font-mono font-bold text-gray-900 flex items-center gap-1.5 hover:text-emerald-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
                >
                  #{orderId} {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Product</span>
                <span className="font-bold text-gray-800 text-right max-w-[60%]">{productName}</span>
              </div>

              <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Total Paid</span>
                <span className="font-black text-emerald-600 text-lg">${Number(amount).toFixed(2)} USD</span>
              </div>
            </div>

            {/* 💬 ACTION BUTTONS (Support vs Home) */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <Link
                to="/"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> Return to Store
              </Link>
              
              <button
                onClick={openLiveChat}
                className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" /> Didn't receive it?
              </button>
            </div>

            {/* GUARANTEE FOOTER */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium text-center pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Secure transaction • 30-Day Guarantee
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
