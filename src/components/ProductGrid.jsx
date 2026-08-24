import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import defaultProducts from '../data/products.json'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('qb_catalog_products')
    return saved ? JSON.parse(saved) : defaultProducts
  })

  // تتبع أي تحديثات فورية
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('qb_catalog_products')
      if (saved) setProducts(JSON.parse(saved))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // تصفية وعرض المنتجات الظاهرة فقط
  const visibleProducts = products.filter(product => !product.hidden)

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">
              Choose your QuickBooks Desktop
            </h2>
            <p className="text-gray-500">
              Genuine 2024 editions — one-time purchase, instant delivery.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-brand-700 font-semibold text-sm hover:underline flex items-center gap-1"
          >
            All products &rarr;
          </Link>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-200">
            No products available at the moment.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
