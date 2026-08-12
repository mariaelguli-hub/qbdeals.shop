import React, { useState, useEffect } from 'react'
import { RefreshCw, EyeOff, AlertTriangle, Link2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function HiddenExplorer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Parsing CSV المحترف للتعامل مع الإقتباسات والـ HTML
  const parseCSVLine = (text) => {
    const lines = []
    let row = []
    let inQuotes = false
    let current = ''

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const nextChar = text[i + 1]

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim())
        current = ''
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') i++
        row.push(current.trim())
        if (row.length > 1 || row[0] !== '') lines.push(row)
        row = []
        current = ''
      } else {
        current += char
      }
    }
    if (current !== '' || row.length > 0) {
      row.push(current.trim())
      lines.push(row)
    }
    return lines
  }

  const fetchAndParseCSV = async () => {
    setLoading(true)
    setError(false)
    setProducts([])

    try {
      const response = await fetch('/home-and-garden.csv')
      if (!response.ok) {
        throw new Error('الملف home-and-garden.csv غير موجود داخل public/')
      }

      const text = await response.text()
      const rows = parseCSVLine(text)

      if (rows.length < 2) throw new Error('ملف CSV خاوي!')

      const headers = rows[0].map(h => h.toLowerCase().replace(/^"|"$/g, ''))

      // تحديد مواقع الأعمدة بالظبط
      const handleIdx = headers.findIndex(h => h === 'handle' || h === 'id' || h === 'slug')
      const titleIdx = headers.findIndex(h => h === 'title' || h === 'name')
      const priceIdx = headers.findIndex(h => h.includes('price') || h.includes('variant price'))
      const imgIdx = headers.findIndex(h => h.includes('image') || h.includes('src') || h.includes('img'))

      const parsed = []
      const seenHandles = new Set()

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i]
        if (!row || row.length < 2) continue

        const handle = (handleIdx !== -1 && row[handleIdx]) ? row[handleIdx] : row[0]
        if (!handle || seenHandles.has(handle)) continue // تجنب تكرار الفاريانتس

        const title = (titleIdx !== -1 && row[titleIdx]) ? row[titleIdx] : handle.replace(/-/g, ' ')
        
        let price = (priceIdx !== -1 && row[priceIdx]) ? row[priceIdx] : '127.00'
        price = price.replace(/[^0-9.]/g, '') || '127.00'

        let imgSrc = (imgIdx !== -1 && row[imgIdx]) ? row[imgIdx] : ''
        if (!imgSrc) {
          imgSrc = '/images/pro.jpg'
        }

        seenHandles.add(handle)

        parsed.push({
          id: handle,
          title: title,
          price: `$${parseFloat(price).toFixed(2)} USD`,
          image: imgSrc,
          link: `/#/product/${handle}`
        })
      }

      setProducts(parsed)
      toast.success(`تم استخراج ${parsed.length} منتج بنجاح!`)
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
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h3 className="font-extrabold text-gray-900 text-lg">Hidden Catalog Explorer</h3>
          <p className="text-xs text-gray-500 font-mono">public/home-and-garden.csv ({products.length} Items)</p>
        </div>

        <button
          onClick={fetchAndParseCSV}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh CSV
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200">
          تأكد أن home-and-garden.csv كاين فـ المجلد public/
        </div>
      )}

      {!error && products.length > 0 && (
        <div className="bg-gray-50/50 rounded-2xl border border-gray-200 overflow-x-auto max-h-[500px]">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs uppercase border-b border-gray-200">
                <th className="p-4 font-black">Image</th>
                <th className="p-4 font-black">Handle / Slug</th>
                <th className="p-4 font-black">Product Name</th>
                <th className="p-4 font-black">Price</th>
                <th className="p-4 font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {products.map((p, idx) => (
                <tr key={idx} className="hover:bg-white transition-colors">
                  <td className="p-3">
                    <div className="w-12 h-12 rounded-xl border border-gray-200 bg-white p-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/100x100/f3f4f6/059669?text=Item'
                        }}
                      />
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-500">{p.id}</td>
                  <td className="p-4 font-bold text-xs text-gray-900">{p.title}</td>
                  <td className="p-4 font-black text-emerald-700 font-mono text-xs">{p.price}</td>
                  <td className="p-4 text-right">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 transition-all"
                    >
                      <Link2 className="w-3.5 h-3.5" /> Open Link (#)
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
