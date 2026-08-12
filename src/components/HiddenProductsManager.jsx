import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, EyeOff, ExternalLink, Trash2, PackageCheck } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function HiddenProductsManager() {
  const [hiddenProducts, setHiddenProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('qb_hidden_products_csv')
    if (saved) {
      try {
        setHiddenProducts(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const text = event.target.result
        const lines = text.split('\n').filter(line => line.trim() !== '')
        if (lines.length < 2) {
          toast.error('الملف خاوي!')
          setLoading(false)
          return
        }

        const parsedProducts = []

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',')
          const cleanRow = row.map(cell => cell ? cell.trim().replace(/^"|"$/g, '').replace(/""/g, '"') : '')

          if (cleanRow.length >= 2) {
            const id = cleanRow[0] || `hidden-${i}`
            const title = cleanRow[1] || 'Product Title'
            const description = cleanRow[2] || ''
            let rawLink = cleanRow[3] || ''
            const imageLink = cleanRow[4] || '/images/pro.jpg'
            const price = cleanRow[6] || '127.00 USD'

            // 🔗 إصلاح الـ Link بـ # تلقائياً لتفادي 404
            let safeLink = rawLink
            if (rawLink.startsWith('http') && !rawLink.includes('#')) {
              const urlParts = rawLink.split('qbdeals.shop')
              if (urlParts.length > 1) {
                safeLink = `https://qbdeals.shop/#${urlParts[1]}`
              }
            }

            parsedProducts.push({
              id,
              title,
              description,
              link: safeLink,
              image_link: imageLink,
              price,
              isHidden: true
            })
          }
        }

        setHiddenProducts(parsedProducts)
        localStorage.setItem('qb_hidden_products_csv', JSON.stringify(parsedProducts))
        toast.success(`تم استخراج ${parsedProducts.length} منتج مخفي بنجاح!`)
      } catch (err) {
        console.error(err)
        toast.error('حدث خطأ أثناء قراءة الملف!')
      } finally {
        setLoading(false)
      }
    }

    reader.readAsText(file)
  }

  const clearHiddenProducts = () => {
    if (window.confirm('واش متأكد بغيتي تمسح القائمة المخفية؟')) {
      setHiddenProducts([])
      localStorage.removeItem('qb_hidden_products_csv')
      toast.success('تم المسح!')
    }
  }

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-emerald-600" /> Hidden Products Catalog (Admin Only)
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            منتجات مخفية بـ روابط خالية من الـ 404 وصور بدون خلفيات بيضاء مزعجة.
          </p>
        </div>

        {hiddenProducts.length > 0 && (
          <button
            onClick={clearHiddenProducts}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Catalog
          </button>
        )}
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-2xl p-6 text-center transition-all bg-gray-50/50 group">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csv-hidden-input"
        />
        <label htmlFor="csv-hidden-input" className="cursor-pointer space-y-3 block">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm font-black text-gray-900 block">رفع ملف home-and-garden.csv</span>
            <span className="text-xs text-gray-400 font-medium">سيتم معالجة العناوين والروابط وإزالة خلفيات الصور تلقائياً</span>
          </div>
        </label>
      </div>

      {/* Grid المعاينة للصور العصرية */}
      {hiddenProducts.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span className="flex items-center gap-1.5 text-gray-700">
              <PackageCheck className="w-4 h-4 text-emerald-600" /> Total Items: {hiddenProducts.length}
            </span>
            <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-mono">Status: Private Catalog</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-1">
            {hiddenProducts.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-gray-200/80 bg-gray-50/40 hover:bg-white flex items-center gap-4 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all">
                
                {/* 🎨 Container الشفاف للصور (إزالة الخلفية البيضاء وتناسق الـ Border) */}
                <div className="w-16 h-16 rounded-xl border border-gray-200/60 bg-white p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                  <img
                    src={p.image_link}
                    alt={p.title}
                    className="w-full h-full object-contain mix-blend-multiply filter contrast-105"
                    onError={(e) => { 
                      e.target.src = '/images/pro.jpg' 
                      e.target.className = 'w-full h-full object-contain'
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs truncate">{p.title}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{p.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-xs font-black text-emerald-700">{p.price}</span>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" /> Test Link (#)
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
