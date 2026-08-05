import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet><title>Privacy Policy — TaxUSA</title></Helmet>
      <section className="py-16 lg:py-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Information We Collect</h2>
          <p className="text-gray-600 mb-4">We collect information you provide directly to us, such as your name, email address, and payment information when you make a purchase.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">We use your information to process transactions, deliver license keys, provide customer support, and send order updates.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">Security</h2>
          <p className="text-gray-600">We use industry-standard encryption and security measures to protect your data.</p>
        </div>
      </section>
    </>
  )
}
