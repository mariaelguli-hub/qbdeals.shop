import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Check, Zap } from 'lucide-react'
import products from '../data/products.json'

export default function ProductDetails() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link to="/shop" className="text-brand-700 font-semibold hover:underline">
          &larr; Back to shop
        </Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — TaxUSA</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to products
          </Link>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Image */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-80 object-contain"
                onError={(e) => {
                  e.target.src = `https://placehold.co/400x400/1a7a1a/ffffff?text=${encodeURIComponent(product.category)}`
                }}
              />
            </div>

            {/* Details */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                {product.category}
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-500 mb-6">{product.description}</p>

              <ul className="space-y-2 mb-8">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-brand-600" /> {feat}
                  </li>
                ))}
              </ul>

              <div className="space-y-3 mb-8">
                {product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{variant.label}</div>
                      <div className="text-xs text-gray-500">{variant.users} user license</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-gray-900">${variant.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-400 line-through">${variant.comparePrice.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary w-full justify-center py-4 text-base">
                <Zap className="w-5 h-5" /> Buy now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
