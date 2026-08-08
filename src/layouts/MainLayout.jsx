import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased">
      {/* Header (Fih TopBar Pro Max) */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
