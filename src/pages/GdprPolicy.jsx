import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ShieldCheck, Lock, UserCheck, Mail, Database, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function GdprPolicy() {
  return (
    <>
      <Helmet>
        <title>GDPR Privacy Policy — QB DEALS</title>
        <meta name="description" content="GDPR Privacy Policy for QB DEALS explaining data processing, storage, and your rights." />
      </Helmet>

      <section className="py-12 lg:py-20 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-emerald-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Main Card / Cadre */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-gray-200/60 border border-gray-100 text-gray-700 leading-relaxed space-y-8">
            
            {/* H1 Heading */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                GDPR Privacy Policy
              </h1>
              <p className="text-sm text-gray-400">
                Last Updated: August 2, 2026
              </p>
            </div>

            {/* Introduction Banner */}
            <div className="bg-emerald-50/60 border border-emerald-200/60 p-5 rounded-2xl">
              <h2 className="text-lg font-bold text-emerald-950 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                Introduction
              </h2>
              <p className="text-emerald-900 text-sm leading-relaxed mb-2">
                QB DEALS (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information.
              </p>
              <p className="text-emerald-800 text-xs leading-relaxed">
                This GDPR Privacy Policy explains how we collect, use, protect, and handle personal information when you visit or use our website, <strong className="font-semibold">qbdeals.shop</strong>, or purchase our digital products in accordance with the General Data Protection Regulation (GDPR).
              </p>
            </div>

            {/* Personal Information We Collect */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600 shrink-0" />
                Personal Information We Collect
              </h2>
              <p className="text-gray-600 mb-3">
                We only collect personal information that is necessary to provide our services and process your orders. Depending on how you interact with our website, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm mb-3">
                <li>Name</li>
                <li>Email address</li>
                <li>Payment and billing information</li>
                <li>Order and transaction details</li>
                <li>Information you provide when contacting our customer support team</li>
                <li>Technical information collected through cookies or similar technologies</li>
              </ul>
              <p className="text-xs text-gray-500 font-medium">
                We do not intentionally collect more personal information than is reasonably necessary for the purposes described in this policy.
              </p>
            </div>

            {/* How We Use Your Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                How We Use Your Personal Information
              </h2>
              <p className="text-gray-600 mb-3">
                We may use your personal information to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm">
                <li>Process and fulfill your orders</li>
                <li>Deliver software license keys and digital products</li>
                <li>Confirm and manage transactions</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send order confirmations, delivery information, and important updates</li>
                <li>Maintain the security and proper operation of our website</li>
                <li>Detect, prevent, and investigate fraudulent or unauthorized activity</li>
                <li>Comply with applicable legal and regulatory requirements</li>
              </ul>
            </div>

            {/* Legal Basis for Processing */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Legal Basis for Processing
              </h2>
              <p className="text-gray-600 mb-3">
                Where the GDPR applies, we process personal information based on one or more of the following legal grounds:
              </p>
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong className="text-gray-900">Contractual Necessity:</strong> To fulfill an order or provide services you have requested.</p>
                <p><strong className="text-gray-900">Legal Obligations:</strong> To comply with applicable laws, accounting requirements, or legal requests.</p>
                <p><strong className="text-gray-900">Legitimate Interests:</strong> For legitimate business purposes, such as maintaining security and preventing fraud.</p>
                <p><strong className="text-gray-900">Consent:</strong> Where required by law, based on your consent (which you may withdraw at any time).</p>
              </div>
            </div>

            {/* Payment Information & Cookies */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base mb-2">Payment Information</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Payments are processed through secure third-party providers. We do not intentionally store complete payment card information on our own systems.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base mb-2">Cookies & Technologies</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our website uses cookies to support essential functions and improve your browsing experience. Please review our Cookies Policy for more details.
                </p>
              </div>
            </div>

            {/* Data Security & Retention */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
                Data Security & Retention
              </h2>
              <p className="text-gray-600 mb-3">
                We implement industry-standard security practices and encryption technologies to help protect personal information against unauthorized access, disclosure, or misuse.
              </p>
              <p className="text-gray-600">
                We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this policy, after which it is securely deleted or anonymized.
              </p>
            </div>

            {/* Sharing & International Data Transfers */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-600 shrink-0" />
                Sharing & International Data Transfers
              </h2>
              <p className="text-gray-600 mb-3">
                <strong className="text-gray-900">We do not sell your personal information.</strong> We may share data with trusted third-party service providers necessary to operate our website, process payments, or fulfill orders.
              </p>
              <p className="text-gray-600">
                Where personal information is transferred outside the European Economic Area (EEA), we take reasonable steps to ensure appropriate safeguards are in place.
              </p>
            </div>

            {/* Your GDPR Rights */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                Your GDPR Rights
              </h2>
              <p className="text-gray-600 mb-3">
                If the GDPR applies to you, you have the following rights regarding your personal information:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-600">
                <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100"><strong className="text-emerald-950 block text-sm mb-0.5">Right of Access</strong> Request a copy of personal information we hold about you.</div>
                <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100"><strong className="text-emerald-950 block text-sm mb-0.5">Right to Rectification</strong> Request correction of inaccurate or incomplete data.</div>
                <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100"><strong className="text-emerald-950 block text-sm mb-0.5">Right to Erasure</strong> Request deletion of your personal data, subject to legal rules.</div>
                <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100"><strong className="text-emerald-950 block text-sm mb-0.5">Right to Restriction</strong> Request restriction of data processing in certain cases.</div>
                <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100"><strong className="text-emerald-950 block text-sm mb-0.5">Right to Data Portability</strong> Request data in a structured, machine-readable format.</div>
                <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100"><strong className="text-emerald-950 block text-sm mb-0.5">Right to Object</strong> Object to processing based on legitimate business interests.</div>
              </div>
            </div>

            {/* Submitting a Request & Complaints */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                How to Submit a Request & Complaints
              </h2>
              <p className="text-gray-600 mb-3">
                To exercise any of your GDPR rights, please contact us at <a href="mailto:contact@qbdeals.shop" className="text-emerald-600 font-semibold underline">contact@qbdeals.shop</a>. We may need to verify your identity before completing requests.
              </p>
              <p className="text-xs text-gray-500">
                If you believe your personal information has been processed in violation of applicable data protection laws, you also have the right to lodge a complaint with your local data protection supervisory authority.
              </p>
            </div>

            {/* Children's Privacy & Policy Changes */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Children's Privacy & Policy Updates
              </h2>
              <p className="text-gray-600 mb-2">
                Our website is not intended for children, and we do not knowingly collect personal information from minors.
              </p>
              <p className="text-gray-600">
                We may update this policy periodically. Any changes will be posted on this page with an updated revision date.
              </p>
            </div>

            {/* Contact Us */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Contact Us
              </h2>
              <p className="mb-3 text-sm text-gray-600">
                If you have any questions, concerns, or requests regarding this GDPR Privacy Policy, reach out to us:
              </p>
              <div className="inline-flex items-center gap-2 p-3.5 bg-emerald-50 rounded-xl text-emerald-900 font-semibold text-sm border border-emerald-200/60">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>Email: <a href="mailto:contact@qbdeals.shop" className="underline hover:text-emerald-700">contact@qbdeals.shop</a></span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
