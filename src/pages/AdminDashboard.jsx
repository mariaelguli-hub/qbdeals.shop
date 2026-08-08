import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, Trash2, CheckCircle, RefreshCw, MessageSquare, Lock, Eye, EyeOff, Globe, ShieldAlert } from 'lucide-react'
import { supabase } from '../utils/supabase'
import { toast } from 'react-hot-toast'

const ADMIN_PASSWORD = "MySecretAdminPassword2026!"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedAuth = localStorage.getItem('qb_admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('qb_admin_auth', 'true')
      toast.success('Access Granted!')
    } else {
      toast.error('Incorrect Password!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('qb_admin_auth')
    toast.success('Logged out')
  }

  const fetchMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Error fetching messages')
    } else {
      setMessages(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages()
    }
  }, [isAuthenticated])

  const markAsRead = async (id) => {
    const { error } = await supabase
      .from('messages')
      .update({ status: 'read' })
      .eq('id', id)

    if (!error) {
      setMessages(messages.map(m => m.id === id ? { ...m, status: 'read' } : m))
      toast.success('Marked as read')
    }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (!error) {
      setMessages(messages.filter(m => m.id !== id))
      toast.success('Message deleted')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <Helmet>
          <title>Admin Login — QB DEALS</title>
        </Helmet>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Restricted Access</h1>
            <p className="text-xs text-gray-500 mt-1">Enter your secret password to manage messages.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm pr-10 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — QB DEALS</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Messages Dashboard</h1>
                <p className="text-xs text-gray-500">Total Messages: {messages.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={fetchMessages}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-gray-100">
              No messages received yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`bg-white rounded-2xl p-6 border transition-all shadow-sm ${
                    msg.status === 'unread' ? 'border-emerald-500 bg-emerald-50/10' : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{msg.name}</span>
                      <a href={`mailto:${msg.email}`} className="text-xs text-emerald-600 font-semibold underline">
                        {msg.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{new Date(msg.created_at).toLocaleString()}</span>
                      {msg.status === 'unread' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Unread</span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">Read</span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-800 text-sm mb-2">Subject: {msg.subject}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{msg.message}</p>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2 text-gray-500">
                      {msg.ip_address && (
                        <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-lg font-mono text-[11px]">
                          <ShieldAlert className="w-3.5 h-3.5 text-gray-400" /> IP: {msg.ip_address}
                        </span>
                      )}
                      {msg.location && (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg font-medium text-[11px]">
                          <Globe className="w-3.5 h-3.5 text-emerald-600" /> {msg.location}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {msg.status === 'unread' && (
                        <button 
                          onClick={() => markAsRead(msg.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Mark Read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteMessage(msg.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}
