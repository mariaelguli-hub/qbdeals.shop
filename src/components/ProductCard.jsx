import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Minus, Plus, Check } from 'lucide-react'

export default function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [qty, setQty] = useState(1)

  const discount = Math.round(((selectedVariant.comparePrice - selectedVariant.price) / selectedVariant.comparePrice) * 100)

  return (
    <div className="card flex flex-col">
      {/* Image */}
      <div className="relative bg-gray-50 p-5 text-center">
        <span className="absolute top-3 left-3 badge bg-brand-700 text-white">
          {product.tag}
        </span>
        <div className="h-40 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
            onError={(e) => {
              e.target.src = `https://placehold.co/200x200/1a7a1a/ffffff?text=${encodeURIComponent(product.category)}`
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
          {product.category}
        </div>
        <h3 className="font-bold text-gray-900 mb-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>
        <ul className="space-y-1 mb-4">
          {product.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <Check className="w-3.5 h-3.5 text-brand-600 mt-0.5 shrink-0" />
              {feat}
            </li>
          ))}
        </ul>

        {/* Variants */}
        <div className="space-y-2 mb-4">
          {product.variants.map((variant) => (
            <label
              key={variant.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors ${
                selectedVariant.id === variant.id
                  ? 'border-brand-600 bg-brand-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`variant-${product.id}`}
                className="accent-brand-700"
                checked={selectedVariant.id === variant.id}
                onChange={() => setSelectedVariant(variant)}
              />
              <span className="flex-1">{variant.label}</span>
              <span className="font-bold">${variant.price.toFixed(2)}</span>
              {variant.bestselling && (
                <span className="badge-green text-[10px]">Best Selling</span>
              )}
            </label>
          ))}
        </div>

        {/* Price & Qty */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-extrabold text-gray-900">
            ${selectedVariant.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${selectedVariant.comparePrice.toFixed(2)}
          </span>
          <span className="text-sm font-bold text-brand-700">
            {discount}% off
          </span>
          <div className="ml-auto flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-2.5 py-1.5 hover:bg-gray-50"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-sm font-medium w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-2.5 py-1.5 hover:bg-gray-50"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button className="w-full btn-primary justify-center py-3 text-sm mb-2">
          <Zap className="w-4 h-4" /> Buy now
        </button>
        <Link
          to={`/product/${product.slug}`}
          className="block text-center text-sm text-gray-500 hover:text-brand-700 underline"
        >
          View full details
        </Link>
      </div>
    </div>
  )
}
