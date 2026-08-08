import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Trash2, RefreshCw, MessageSquare, Lock, Eye, EyeOff, Globe, Users, Clock, Compass } from 'lucide-react'
import { supabase } from '../utils/supabase'
import { toast } from 'react-hot-toast'

const ADMIN_PASSWORD = "MySecretAdminPassword2026!"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [activeTab, setActiveTab] = useState('visitors')
  const [messages, setMessages] = useState([])
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('qb_admin_auth') === 'true') {
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

  const fetchData = async () => {
    setLoading(true)
    
    const { data: msgData } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(msgData || [])

    const { data: visData } = await supabase
      .from('visitors')
      .select('*')
      .order('last_seen', { ascending: false })
      .limit(50)
    setVisitors(visData || [])

    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
      const interval = setInterval(fetchData, 8000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const deleteVisitor = async (id) => {
    const { error } = await supabase.from('visitors').delete().eq('id', id)
    if (!error) {
      setVisitors(visitors.filter(v => v.id !== id))
      toast.success('Visitor removed')
    }
  }

  const formatTime = (seconds) => {
    if (!seconds) return '0s'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <Helmet><title>Admin Login — QB DEALS</title></Helmet>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Restricted Access</h1>
            <p className="text-xs text-gray-500 mt-1">Enter your secret password to manage your dashboard.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm pr-10 outline-none focus:ring-2 focus:ring-emerald-500/20"
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
      <Helmet><title>Admin Control Panel — QB DEALS</title></Helmet>

      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Live Panel</h1>
              <p className="text-xs text-gray-500">Real-time visitor tracking & contact management</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={fetchData}
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

          <div className="flex gap-3 border-b border-gray-200 pb-2">
            <button
              onClick={() => setActiveTab('visitors')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'visitors' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Users className="w-4 h-4" /> Live Visitors ({visitors.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'messages' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Contact Messages ({messages.length})
            </button>
          </div>

          {activeTab === 'visitors' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-600" /> Live Tracking
                </h2>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                  Auto-refreshes every 8s
                </span>
              </div>

              {visitors.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No visitors tracked yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                        <th className="p-4">Visitor IP</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Active Page</th>
                        <th className="p-4">Time Spent</th>
                        <th className="p-4">Last Active</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {visitors.map((v) => (
                        <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-mono text-xs font-semibold text-gray-900">
                            {v.ip_address || 'Unknown'}
                          </td>
                          <td className="p-4 text-gray-600">
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg text-xs font-medium">
                              <Globe className="w-3.5 h-3.5 text-emerald-600" /> {v.location || 'Unknown'}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-emerald-700">
                            <span className="bg-gray-100 px-2.5 py-1 rounded-md text-xs font-mono">
                              {v.current_page || '/'}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600 font-medium">
                            <span className="inline-flex items-center gap-1 text-xs">
                              <Clock className="w-3.5 h-3.5 text-gray-400" /> {formatTime(v.time_spent)}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-gray-400">
                            {new Date(v.last_seen).toLocaleTimeString()}
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => deleteVisitor(v.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="grid gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                    <span className="font-bold text-gray-900">{msg.name} ({msg.email})</span>
                    <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-2">Subject: {msg.subject}</h3>
                  <p className="text-gray-600 text-sm mb-4">{msg.message}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <span>🌐 IP: {msg.ip_address} | {msg.location}</span>
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
