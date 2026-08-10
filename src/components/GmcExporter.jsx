import React, { useState } from 'react'
import { Download, Lock, CheckCircle2 } from 'lucide-react'
import products from '../data/products.json' // 👈 بدّل المسار لملف المنتجات ديالك إلا كان فبلاصة أخرى

export default function GmcExporter() {
  const [pin, setPin] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)

  // 🔑 كود السر ديال الأدمن (تقدر تبدلو باللي بغيتي)
  const ADMIN_SECRET = '123456' 

  const handleLogin = (e) => {
    e.preventDefault()
    if (pin === ADMIN_SECRET) {
      setIsAuthorized(true)
    } else {
      alert('Code PIN خاطئ!')
    }
  }

  // 📄 دالة تحويل البيانات لـ CSV الخاص بـ Google Merchant Center
  const exportToGMC = () => {
    const domain = 'https://qbdeals.shop'

    // 1. العناوين المطلوبة من جوجل
    const headers = [
      'id',
      'title',
      'description',
      'link',
      'image_link',
      'availability',
      'price',
      'brand',
      'condition',
      'google_product_category'
    ]

    // 2. تجهيز كل منتج بنفس معايير GMC
    const rows = products.map((p) => {
      const cleanDesc = (p.description || '').replace(/"/g, '""')
      const priceFormatted = `${Number(p.price || 127).toFixed(2)} USD`
      const productLink = `${domain}/product/${p.slug || p.id}`
      const imageLink = p.image && p.image.startsWith('http') ? p.image : `${domain}${p.image || '/images/pro.jpg'}`

      return [
        `"${p.id}"`,
        `"${p.title}"`,
        `"${cleanDesc}"`,
        `"${productLink}"`,
        `"${imageLink}"`,
        '"in_stock"',
        `"${priceFormatted}"`,
        '"QuickBooks"',
        '"new"',
        '"Software > Business & Productivity Software"'
      ].join(',')
    })

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n')
    
    // 3. تحميل الملف تلقائياً
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `gmc_products_feed_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-3xl border border-gray-200 shadow-xl my-10 font-sans">
      <h3 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
        <Lock className="w-5 h-5 text-emerald-600" /> Admin GMC Feed Exporter
      </h3>
      <p className="text-xs text-gray-500 mb-6">
        Download your official Google Merchant Center product feed CSV.
      </p>

      {!isAuthorized ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Admin PIN Code"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gray-900 text-white font-extrabold text-sm rounded-xl hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            Unlock Access
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Access Granted
          </div>
          <button
            onClick={exportToGMC}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download GMC Feed (.CSV)
          </button>
        </div>
      )}
    </div>
  )
}
