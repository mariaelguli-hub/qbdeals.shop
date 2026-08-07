import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet><title>Privacy Policy — TaxUSA</title></Helmet>
      <section className="py-16 lg:py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Your privacy matters to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you interact with QB DEALS.
</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Information We Collect</h2>
          <p className="text-gray-600 mb-4">We collect personal information that you voluntarily provide, including your name, email address, and payment details when you place an order with us.
</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">We use the information you provide to process your orders, deliver your license keys, assist you with customer support, and keep you informed about your purchases and order status.
</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Security</h2>
          <p className="text-gray-600">We implement industry-standard security practices and encryption technologies to help protect your personal information from unauthorized access, disclosure, or misuse.
</p>
        </div>
      </section>
    </>
  )
}
