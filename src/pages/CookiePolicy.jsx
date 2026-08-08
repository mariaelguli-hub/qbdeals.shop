import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookies Policy — QB DEALS</title>
        <meta name="description" content="Cookies Policy for QB DEALS explaining how we use cookies and similar technologies." />
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

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-gray-200/60 border border-gray-100 text-gray-700 leading-relaxed space-y-8">
            
            {/* H1 Heading */}
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                Cookies Policy
              </h1>
              <p className="text-sm text-gray-400">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Introduction */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Introduction
              </h2>
              <p className="mb-3">
                This Cookies Policy explains how QB DEALS (“we,” “our,” or “us”) uses cookies and similar technologies when you visit or use our website, <span className="font-semibold text-emerald-700">qbdeals.shop</span>.
              </p>
              <p className="mb-3">
                By accessing or using our website, you acknowledge and agree to the use of cookies as described in this Cookies Policy and our Privacy Policy.
              </p>
              <p>
                Cookies help us maintain the functionality of our website, improve your browsing experience, understand how visitors use our website, and enhance our services.
              </p>
            </div>

            {/* What Are Cookies? */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                What Are Cookies?
              </h2>
              <p className="mb-3">
                Cookies are small text files that websites store on your computer, mobile device, or other internet-connected device when you visit a website. They allow websites to remember information about your visit, including your preferences, settings, and certain browsing activities.
              </p>
              <p className="mb-3">
                Cookies generally do not directly contain information that identifies you personally. However, information collected through cookies may be associated with other information we maintain about you.
              </p>
              <p>
                For more information about how we collect, use, and protect your personal information, please review our <Link to="/privacy-policy" className="text-emerald-600 font-semibold hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            {/* Interpretation and Definitions */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Interpretation and Definitions
              </h2>
              
              <h3 className="text-base font-semibold text-gray-900 mt-4 mb-2">
                Interpretation
              </h3>
              <p className="mb-4">
                Words with an initial capital letter have specific meanings defined below. These definitions apply whether the terms are used in the singular or plural.
              </p>

              <h3 className="text-base font-semibold text-gray-900 mt-4 mb-2">
                Definitions
              </h3>
              <p className="mb-3">For the purposes of this Cookies Policy:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong className="text-gray-900">Company</strong> refers to QB DEALS.</li>
                <li><strong className="text-gray-900">Cookies</strong> refers to small text files stored on your device by a website that contain information about your browsing activity.</li>
                <li><strong className="text-gray-900">Website</strong> refers to QB DEALS, accessible at qbdeals.shop.</li>
                <li><strong className="text-gray-900">You</strong> refers to the individual accessing or using the Website, or the company or legal entity on whose behalf the Website is being accessed or used.</li>
              </ul>
            </div>

            {/* Types of Cookies We Use */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Types of Cookies We Use
              </h2>
              <p className="mb-3">
                Cookies may be classified as either Session Cookies or Persistent Cookies.
              </p>
              <p className="mb-3">
                <strong className="text-gray-900">Session Cookies</strong> are temporary cookies that are stored on your device while you browse our website and are automatically deleted when you close your browser.
              </p>
              <p className="mb-4">
                <strong className="text-gray-900">Persistent Cookies</strong> remain stored on your device until they expire or are deleted manually through your browser settings.
              </p>
              <p className="mb-4">We may use the following types of cookies:</p>

              {/* Cookie Types Breakdown */}
              <div className="space-y-4 bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Essential Cookies
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mb-1">Type: Session Cookies | Administered by: QB DEALS</p>
                  <p className="text-sm text-gray-600">
                    These cookies are necessary for the proper operation of our website. They support essential functions such as order processing, secure browsing, and fraud prevention. Without these cookies, certain features and services may not function properly.
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200/60">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Functionality Cookies
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mb-1">Type: Persistent Cookies | Administered by: QB DEALS</p>
                  <p className="text-sm text-gray-600">
                    These cookies allow our website to remember information such as your preferences, settings, and other choices. This helps us provide a more convenient and personalized browsing experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Choices Regarding Cookies */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Your Choices Regarding Cookies
              </h2>
              <p className="mb-3">
                You can control, restrict, or disable cookies through your web browser settings.
              </p>
              <p className="mb-3">
                Please note that disabling certain cookies may affect the functionality of our website, and some features or services may become unavailable or may not work as intended.
              </p>
              <p>
                You can also delete cookies that have already been stored on your device through your browser settings.
              </p>
            </div>

            {/* Managing Cookie Settings */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Managing Cookie Settings
              </h2>
              <p className="mb-4">
                For information about managing or deleting cookies in your browser, please refer to the official support documentation for your browser:
              </p>

              <ul className="space-y-2 text-sm font-medium">
                <li>
                  <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-600 hover:underline">
                    Google Chrome <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-600 hover:underline">
                    Mozilla Firefox <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-600 hover:underline">
                    Microsoft Internet Explorer <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-600 hover:underline">
                    Safari <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                For other browsers, please consult the official documentation provided by your browser provider.
              </p>
            </div>

            {/* More Information About Cookies */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                More Information About Cookies
              </h2>
              <p className="mb-2">
                For additional information about cookies, how they work, and how you can manage them, you can visit All About Cookies at:
              </p>
              <a 
                href="https://www.allaboutcookies.org/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:underline text-sm"
              >
                https://www.allaboutcookies.org/ <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Contact Us */}
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions or concerns about this Cookies Policy, please contact us at:
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
