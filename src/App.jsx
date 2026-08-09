import ChatWidget from './components/ChatWidget'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/ScrollToTop'
import VisitorTracker from './components/VisitorTracker'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import About from './pages/About'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import RefundPolicy from './pages/RefundPolicy'
import CookiePolicy from './pages/CookiePolicy'
import GdprPolicy from './pages/GdprPolicy'
import Disclaimer from './pages/Disclaimer'
import ShippingDelivery from './pages/Shipping&Delivery'
import NotFound from './pages/NotFound'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <>
      {/* 🎯 تتبع الزوار + السكورل لفوق + الشات بوت المباشر */}
      <VisitorTracker />
      <ScrollToTop />
      <ChatWidget /> {/* 👈 هادي هي اللي كانت ناقصاك فـ JSX وكانت ما كاتبينهاش! */}

      <Toaster position="top-right" toastOptions={{
        style: { borderRadius: '10px', fontSize: '14px' }
      }} />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Legal Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/return-policy" element={<RefundPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/gdpr-policy" element={<GdprPolicy />} />
          <Route path="/legal-notice" element={<TermsConditions />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* Admin Dashboard */}
          <Route path="/admin-messages-panel" element={<AdminDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
