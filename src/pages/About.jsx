import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
      <Helmet><title>About Us — QB DEALS</title></Helmet>
      <section className="py-16 lg:py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">About QB DEALS</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            QB DEALS is an independent retailer specializing in genuine QuickBooks Desktop licenses.
            We believe software should be owned, not rented. That is why we offer one-time purchase
            licenses with lifetime activation — no subscriptions, no hidden fees.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Every license key is authentic and backed by our 30-day money-back guarantee.
            Our support team is available 24/7 to help with installation and activation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Trusted by accountants and small business owners across the United States.
          </p>
        </div>
      </section>
    </>
  )
}
