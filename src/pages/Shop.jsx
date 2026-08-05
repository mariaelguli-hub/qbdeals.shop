import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import products from '../data/products.json'
import categories from '../data/categories.json'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category.toLowerCase() === activeCategory)

  return (
    <>
      <Helmet>
        <title>Shop — TaxUSA</title>
        <meta name="description" content="Browse all genuine QuickBooks Desktop 2024 editions. One-time purchase, instant delivery." />
      </Helmet>
      <section className="py-12 lg:py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-500 mb-8">Genuine QuickBooks Desktop licenses at unbeatable prices.</p>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-brand-700 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No products found in this category.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
