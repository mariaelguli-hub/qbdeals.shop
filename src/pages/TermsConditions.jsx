import { Helmet } from 'react-helmet-async'

export default function TermsConditions() {
  return (
    <>
      <Helmet><title>Terms & Conditions — TaxUSA</title></Helmet>
      <section className="py-16 lg:py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Terms & Conditions</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            By accessing or using QB DEALS, you acknowledge that you have read, understood, and agreed to be bound by the terms and conditions of this agreement.
          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">License</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            All software licenses sold by QB DEALS are genuine, valid, and intended for perpetual use on the specified number of devices or users, as stated in the product description.

          </p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Refund Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We offer a 30-day money-back guarantee. If your license fails to activate as described, please contact us within 30 days to request a full refund.

          </p>
        </div>
      </section>
    </>
  )
}
