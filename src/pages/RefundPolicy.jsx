import { Helmet } from 'react-helmet-async'

export default function RefundPolicy() {
  return (
    <>
      <Helmet><title>Refund Policy — QB DEALS</title></Helmet>
      <section className="py-16 lg:py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Refund Policy</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            We stand behind the quality of every license we offer. If your QuickBooks license does not activate as expected, or if you are not satisfied with your purchase for any reason, you may request a full refund within 30 days of purchase.

          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">How to Request a Refund</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you need to request a refund, please contact our support team at [support@qbdeals.shop](mailto:support@qbdeals.shop) and include your order details. Once your request is approved, we will process the refund within 3–5 business days.

          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Exceptions</h2>
          <p className="text-gray-600 leading-relaxed">
            Refund requests must be submitted within 30 days of purchase and are only available for licenses that have not been successfully activated.

          </p>
        </div>
      </section>
    </>
  )
}
