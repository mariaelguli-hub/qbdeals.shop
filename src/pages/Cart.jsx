import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight } from 'lucide-react'

export default function Cart() {
  return (
    <>
      <Helmet>
        <title>Cart — TaxUSA</title>
      </Helmet>
      <section className="py-16 lg:py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products yet.</p>
          <Link to="/shop" className="btn-primary">
            Browse products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
