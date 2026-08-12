import React, { useState, useEffect } from 'react'
import { ExternalLink, RefreshCw, EyeOff, AlertTriangle, Link2, Image as ImageIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function HiddenExplorer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // 1. قراءة CSV وتوليد الـ Hidden Links والصور
  const fetchAndParseCSV = async () => {
    setLoading(true)
    setError(false)
    setProducts([])

    try {
      // قراءة الملف المباشر من public/
      const response = await fetch('/home-and-garden.csv')
      
      if (!response.ok) {
        throw new Error('لم يتم العثور على home-and-garden.csv داخل مجلد public/')
      }

      const text = await response.text()
      const lines = text.split('\n').filter(line => line.trim() !== '')
      
      if (lines.length < 2) {
        throw new Error('ملف CSV خاوي!')
      }

      const parsedProducts = []

      // قراءة الهيدر لمعرفة الأعمدة
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^"|"$/g, ''))
      
      const idIdx = headers.findIndex(h => h === 'id' || h === 'handle' || h === 'sku')
      const titleIdx = headers.findIndex(h => h === 'title' || h === 'name' || h === 'product_name')
      const priceIdx = headers.findIndex(h => h === 'price' || h === 'amount')
      const imageIdx = headers.findIndex(h => h === 'image' || h === 'image_link' || h === 'img' || h === 'photo')

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',')
        const cleanRow = row.map(cell => cell ? cell.trim().replace(/^"|"$/g, '').replace(/""/g, '"') : '')

        if (cleanRow.length >= 1) {
          const rawId = (idIdx !== -1 && cleanRow[idIdx]) ? cleanRow[idIdx] : `item-${i}`
          const title = (titleIdx !== -1 && cleanRow[titleIdx]) ? cleanRow[titleIdx] : (cleanRow[1] || `Product ${i}`)
          const price = (priceIdx !== -1 && cleanRow[priceIdx]) ? cleanRow[priceIdx] : (cleanRow[2] || '—')
          const imgUrl = (imageIdx !== -1 && cleanRow[imageIdx]) ? cleanRow[imageIdx] : '/images/pro.jpg'

          // 🔗 رابط مخفي مجند بـ #
          const generatedHiddenLink = `/#/product/${rawId}`

          parsedProducts.push({
            id: rawId,
            title,
            price,
            image: imgUrl,
            generatedLink: generatedHiddenLink
          })
        }
      }

      setProducts(parsedProducts)
      toast.success(`تم استخراج ${parsedProducts.length} منتج مع الصور بنجاح!`)
    } catch (err) {
      console.error(err)
      setError(true)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAndParseCSV()
  }, [])

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6 text-left font-sans my-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-xs">
            <EyeOff className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
              Hidden Products & Images Explorer (Admin Only)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              الملف: <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">public/home-and-garden.csv</span>
            </p>
          </div>
        </div>

        <button
          onClick={fetchAndParseCSV}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Generating...' : 'Re-Generate Links'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 text-xs text-red-700 bg-red-50 p-4 rounded-2xl border border-red-200">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">خطأ فـ قراءة home-and-garden.csv</span>
            تأكد باللي درتي <code className="bg-white px-1.5 py-0.5 rounded border border-red-200 font-mono">git push</code> لـ GitHub لملف CSV.
          </div>
        </div>
      )}

      {/* Table مع دعم الصور بـ Borders عصرية */}
      {!error && products.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-2">
            <span>عدد المنتجات المكتشفة: {products.length}</span>
            <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-mono">Status: Images & # Links Ready</span>
          </div>

          <div className="bg-gray-50/50 rounded-2xl border border-gray-200/80 overflow-x-auto max-h-[500px] overflow-y-auto shadow-2xs">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100/80 text-gray-600 text-xs uppercase border-b border-gray-200">
                  <th className="p-4 font-black">Product Image</th>
                  <th className="p-4 font-black">ID / Handle</th>
                  <th className="p-4 font-black">Product Name</th>
                  <th className="p-4 font-black">Price</th>
                  <th className="p-4 font-black text-right">Generated Hidden Link (#)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {products.map((p, idx) => (
                  <tr key={idx} className="hover:bg-white transition-colors">
                    
                    {/* 🖼️ Frame الصـورة المنظم بـ Border وبلا خلفيات بيضاء */}
                    <td className="p-3">
                      <div className="w-14 h-14 rounded-xl border border-gray-200 bg-white p-1 flex items-center justify-center overflow-hidden shadow-2xs">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-contain mix-blend-multiply"
                          onError={(e) => {
                            e.target.src = '/images/pro.jpg'
                          }}
                        />
                      </div>
                    </td>

                    <td className="p-4 font-mono text-xs text-gray-500">{p.id}</td>
                    <td className="p-4 text-gray-900 font-bold text-xs max-w-xs truncate">{p.title}</td>
                    <td className="p-4 font-black text-emerald-700 font-mono text-xs">{p.price}</td>
                    <td className="p-4 text-right">
                      <a
                        href={p.generatedLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200/80 rounded-xl text-xs font-bold text-emerald-800 transition-all shadow-2xs"
                      >
                        <Link2 className="w-3.5 h-3.5" /> Open Hidden URL
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  )
}
