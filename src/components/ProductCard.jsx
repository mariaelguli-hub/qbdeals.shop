import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Minus, Plus, Check, Star } from 'lucide-react'

export default function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [qty, setQty] = useState(1)

  const discount = Math.round(((selectedVariant.comparePrice - selectedVariant.price) / selectedVariant.comparePrice) * 100)
  
  const ratingValue = product.rating || 4.95
  const reviewsCount = product.reviewsCount || 128

  return (
    <div className="card flex flex-col overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      
      {/* Full-Bleed Image Banner (Seamless Edge-to-Edge) */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <span className="absolute top-3 left-3 z-10 badge bg-brand-700 text-white shadow-md font-bold text-xs">
          {product.tag}
        </span>
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x400/1a7a1a/ffffff?text=${encodeURIComponent(product.category)}`
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {product.category}
          </div>

          {/* ⭐️ Golden Star Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-gray-900">{ratingValue}</span>
            <span className="text-[11px] text-gray-400">({reviewsCount})</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-2 leading-snug text-base group-hover:text-brand-700 transition-colors">
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
              className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer text-sm transition-colors ${
                selectedVariant.id === variant.id
                  ? 'border-brand-600 bg-brand-50/60 font-semibold'
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
        <div className="flex items-center gap-3 mb-4 mt-auto pt-2 border-t border-gray-50">
          <span className="text-2xl font-extrabold text-gray-900">
            ${selectedVariant.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${selectedVariant.comparePrice.toFixed(2)}
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            {discount}% off
          </span>
          <div className="ml-auto flex items-center border border-gray-200 rounded-lg bg-gray-50/50">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-2.5 py-1.5 hover:bg-gray-200/60 rounded-l-lg transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-sm font-bold w-7 text-center text-gray-800">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-2.5 py-1.5 hover:bg-gray-200/60 rounded-r-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button className="w-full btn-primary justify-center py-3 text-sm mb-2 shadow-md shadow-brand-700/20">
          <Zap className="w-4 h-4" /> Buy now
        </button>
        <Link
          to={`/product/${product.slug}`}
          className="block text-center text-sm font-semibold text-gray-500 hover:text-brand-700 underline underline-offset-2 transition-colors"
        >
          View full details
        </Link>
      </div>
    </div>
  )
}
