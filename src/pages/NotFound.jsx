import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="py-24 bg-gray-50 min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-extrabold text-brand-700 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link to="/" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </section>
  )
}
