import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Trash2, RefreshCw, MessageSquare, Lock, Eye, EyeOff, Globe, Users, Clock, Compass, ShieldAlert, Send, Bot, User, Image as ImageIcon, LogOut, Download, FileSpreadsheet } from 'lucide-react'
import { supabase } from '../utils/supabase'
import { toast } from 'react-hot-toast'
import productsData from '../data/products.json' // 👈 استيراد المنتجات لملف الـ Export

const ADMIN_PASSWORD = "MySecretAdminPassword2026!"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [activeTab, setActiveTab] = useState('visitors')
  const [messages, setMessages] = useState([])
  const [visitors, setVisitors] = useState([])
  
  // 💬 States الشات المباشر
  const [chatSessions, setChatSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [replyInput, setReplyInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

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
    
    // 1. جلب رسائل Contact Form
    const { data: msgData } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(msgData || [])

    // 2. جلب سجل الزوار
    const { data: visData } = await supabase
      .from('visitors')
      .select('*')
      .order('last_seen', { ascending: false })
      .limit(100)
    setVisitors(visData || [])

    // 3. جلب جلسات الشات
    const { data: chatData } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false })
    setChatSessions(chatData || [])

    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
      const interval = setInterval(fetchData, 8000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  // 📦 دالة الـ Export لـ Google Merchant Center CSV
  const exportGmcCsv = () => {
    try {
      const domain = 'https://qbdeals.shop'
      const headers = [
        'id',
        'title',
        'description',
        'link',
        'image_link',
        'availability',
        'price',
        'brand',
        'condition',
        'google_product_category'
      ]

      const rows = (productsData || []).map((p) => {
        const cleanDesc = (p.description || '').replace(/"/g, '""')
        const priceFormatted = `${Number(p.price || 127).toFixed(2)} USD`
        const productLink = `${domain}/product/${p.slug || p.id}`
        const imageLink = p.image && p.image.startsWith('http') ? p.image : `${domain}${p.image || '/images/pro.jpg'}`

        return [
          `"${p.id}"`,
          `"${p.title}"`,
          `"${cleanDesc}"`,
          `"${productLink}"`,
          `"${imageLink}"`,
          '"in_stock"',
          `"${priceFormatted}"`,
          '"QuickBooks"',
          '"new"',
          '"Software > Business & Productivity Software"'
        ].join(',')
      })

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n')
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `gmc_feed_qbdeals_${new Date().toISOString().slice(0, 10)}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('GMC Feed CSV Downloaded!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to export CSV. Check products.json file.')
    }
  }

  // جلب رسائل المحادثة المحددة والاشتراك في Realtime
  useEffect(() => {
    if (!selectedSession) return

    const fetchSessionMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', selectedSession.id)
        .order('created_at', { ascending: true })
      setChatMessages(data || [])
    }

    fetchSessionMessages()

    const channel = supabase
      .channel(`admin_chat_${selectedSession.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${selectedSession.id}`
      }, (payload) => {
        setChatMessages(prev => {
          if (prev.some(m => m.id === payload.new.id)) return prev
          return [...prev, payload.new]
        })
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [selectedSession])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // 🛠️ دالة إرسال رد الـ Agent
  const handleSendAgentReply = async (e) => {
    e.preventDefault()
    if (!replyInput.trim() || !selectedSession) return

    const messageText = replyInput.trim()
    setReplyInput('')

    const agentMsg = {
      session_id: selectedSession.id,
      sender: 'agent',
      message: messageText,
      created_at: new Date().toISOString()
    }

    setChatMessages(prev => [...prev, agentMsg])

    const { error: msgError } = await supabase
      .from('chat_messages')
      .insert([agentMsg])

    if (msgError) {
      console.error('Error sending agent reply:', msgError)
      toast.error(`Failed to send: ${msgError.message}`)
      return
    }

    // تحديث حالة المحادثة إلى Agent
    await supabase
      .from('chat_sessions')
      .update({ status: 'agent', updated_at: new Date().toISOString() })
      .eq('id', selectedSession.id)

    setSelectedSession(prev => ({ ...prev, status: 'agent' }))
    toast.success('Reply sent successfully!')
  }

  // 🛑 🔴 دالة إغلاق المحادثة من طرف الأدمن مع إرسال رسالة فورية للعميل
  const handleEndSessionFromAdmin = async () => {
    if (!selectedSession) return

    if (window.confirm("Are you sure you want to end this live conversation?")) {
      const closeMsg = {
        session_id: selectedSession.id,
        sender: 'agent',
        message: 'This conversation has been closed by live support. Thank you for contacting QB DEALS!',
        created_at: new Date().toISOString()
      }

      await supabase.from('chat_messages').insert([closeMsg])

      const { error } = await supabase
        .from('chat_sessions')
        .update({ status: 'ended', updated_at: new Date().toISOString() })
        .eq('id', selectedSession.id)

      if (!error) {
        setSelectedSession(prev => ({ ...prev, status: 'ended' }))
        setChatSessions(prev => prev.map(s => s.id === selectedSession.id ? { ...s, status: 'ended' } : s))
        toast.success("Conversation ended!")
      } else {
        toast.error("Failed to end chat.")
      }
    }
  }

  const deleteVisitor = async (id) => {
    const { error } = await supabase.from('visitors').delete().eq('id', id)
    if (!error) {
      setVisitors(visitors.filter(v => v.id !== id))
      toast.success('Visitor log removed')
    }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (!error) {
      setMessages(messages.filter(m => m.id !== id))
      toast.success('Message deleted')
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
          
          {/* HEADER BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Control Panel</h1>
              <p className="text-xs text-gray-500">Visitor logs, live chat & GMC product feed management</p>
            </div>
            <div className="flex items-center gap-2">
              {/* 🟢 ZER EXPORT GMC CSV */}
              <button 
                onClick={exportGmcCsv}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-extrabold transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export GMC Feed (.CSV)
              </button>

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

          {/* TABS NAVIGATION */}
          <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-2">
            <button
              onClick={() => setActiveTab('visitors')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'visitors' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Users className="w-4 h-4" /> Visitor Logs ({visitors.length})
            </button>

            <button
              onClick={() => setActiveTab('livechat')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'livechat' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Live Chat Support ({chatSessions.length})
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'messages' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Contact Forms ({messages.length})
            </button>

            <button
              onClick={() => setActiveTab('gmc')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'gmc' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" /> GMC Exporter
            </button>
          </div>

          {/* TAB 1: VISITORS LOGS */}
          {activeTab === 'visitors' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-emerald-600" /> Visitor History Logs
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Complete tracking log for all site visits</p>
                </div>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                  Total Tracked: {visitors.length}
                </span>
              </div>

              {visitors.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No visitors tracked yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                        <th className="p-4">Visit Date & Time</th>
                        <th className="p-4">Visitor IP</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Visited Page</th>
                        <th className="p-4">Time Spent</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {visitors.map((v) => (
                        <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-xs text-gray-500 font-medium">
                            {new Date(v.last_seen).toLocaleString()}
                          </td>
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

          {/* TAB 2: LIVE CHAT SUPPORT PANEL */}
          {activeTab === 'livechat' && (
            <div className="grid md:grid-cols-3 gap-6 h-[600px]">
              
              <div className="md:col-span-1 bg-white rounded-3xl border border-gray-100 p-4 overflow-y-auto space-y-2 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Chat Conversations ({chatSessions.length})</h3>
                {chatSessions.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-8">No live chats yet.</p>
                ) : (
                  chatSessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSession(s)}
                      className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                        selectedSession?.id === s.id
                          ? 'bg-emerald-50 border-emerald-300 shadow-sm'
                          : 'bg-gray-50/60 hover:bg-gray-100 border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs font-bold text-gray-800">
                          Session #{s.id.substring(0, 6)}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          s.status === 'ended' ? 'bg-red-100 text-red-700' : s.status === 'agent' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {s.status === 'ended' ? 'Ended' : s.status === 'agent' ? 'Agent Active' : 'AI Bot'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">{new Date(s.updated_at).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                {selectedSession ? (
                  <>
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">Session ID: {selectedSession.id}</h4>
                        <p className="text-xs text-emerald-600 font-medium">Status: {selectedSession.status?.toUpperCase()}</p>
                      </div>

                      {/* 🛑🔴 زر إنهاء المحادثة من طرف الأدمن */}
                      {selectedSession.status !== 'ended' && (
                        <button
                          onClick={handleEndSessionFromAdmin}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" /> End Conversation
                        </button>
                      )}
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/30 text-xs">
                      {chatMessages.map((m, idx) => (
                        <div key={m.id || idx} className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] p-3 rounded-2xl ${
                            m.sender === 'agent' 
                              ? 'bg-emerald-600 text-white rounded-br-none' 
                              : m.sender === 'user' 
                              ? 'bg-gray-800 text-white rounded-bl-none' 
                              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                          }`}>
                            <div className="text-[10px] opacity-75 font-bold mb-1 uppercase">
                              {m.sender === 'agent' ? 'You (Agent)' : m.sender === 'user' ? 'Visitor' : 'AI Bot'}
                            </div>
                            {m.image_url && (
                              <img src={m.image_url} alt="Uploaded" className="rounded-xl max-h-40 w-full object-cover mb-2" />
                            )}
                            <p>{m.message}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {selectedSession.status === 'ended' ? (
                      <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 font-semibold">
                        This session has been closed.
                      </div>
                    ) : (
                      <form onSubmit={handleSendAgentReply} className="p-3 border-t border-gray-100 flex gap-2">
                        <input
                          type="text"
                          value={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                          placeholder="Reply to visitor as Live Agent..."
                          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" /> Reply
                        </button>
                      </form>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
                    Select a conversation from the left panel to start chatting.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: CONTACT FORM MESSAGES */}
          {activeTab === 'messages' && (
            <div className="grid gap-4">
              {messages.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-gray-100">
                  No messages received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                      <div>
                        <span className="font-bold text-gray-900">{msg.name}</span>
                        <a href={`mailto:${msg.email}`} className="ml-2 text-xs text-emerald-600 font-semibold underline">
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">Subject: {msg.subject}</h3>
                    <p className="text-gray-600 text-sm mb-4 whitespace-pre-wrap">{msg.message}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs">
                      <div className="flex items-center gap-2 text-gray-500">
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
                      <button 
                        onClick={() => deleteMessage(msg.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: GMC EXPORTER CARD */}
          {activeTab === 'gmc' && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Google Merchant Center Feed Exporter</h2>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  Export all store products formatted strictly according to Google Merchant Center specification (USD prices, full URLs, in_stock status).
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={exportGmcCsv}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5" /> Download GMC Feed (.CSV)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
