import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { 
  Trash2, RefreshCw, MessageSquare, Lock, Eye, EyeOff, Globe, 
  Users, Clock, Compass, ShieldAlert, Send, LogOut, Download, 
  FileSpreadsheet, ExternalLink, Layers, CheckCircle 
} from 'lucide-react'
import { supabase } from '../utils/supabase'
import { toast } from 'react-hot-toast'
import defaultProducts from '../data/products.json'

const ADMIN_PASSWORD = "MySecretAdminPassword2026!"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [activeTab, setActiveTab] = useState('products')
  const [messages, setMessages] = useState([])
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(false)

  // 📦 State إدارة جميع المنتجات
  const [productsList, setProductsList] = useState([])
  
  // 💬 States الشات المباشر
  const [chatSessions, setChatSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [replyInput, setReplyInput] = useState('')
  const chatEndRef = useRef(null)

  // Parsing CSV للتعامل مع ملف home-and-garden.csv
  const parseCSVLine = (text) => {
    const lines = []
    let row = []
    let inQuotes = false
    let current = ''

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const nextChar = text[i + 1]

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim())
        current = ''
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') i++
        row.push(current.trim())
        if (row.length > 1 || row[0] !== '') lines.push(row)
        row = []
        current = ''
      } else {
        current += char
      }
    }
    if (current !== '' || row.length > 0) {
      row.push(current.trim())
      lines.push(row)
    }
    return lines
  }

  // جلب ودمج المنتجات الأساسية مع منتجات الـ CSV
  const loadMergedCatalog = async () => {
    const saved = localStorage.getItem('qb_catalog_products')
    if (saved) {
      setProductsList(JSON.parse(saved))
      return
    }

    try {
      const res = await fetch('/home-and-garden.csv')
      let csvProducts = []
      if (res.ok) {
        const text = await res.text()
        const rows = parseCSVLine(text)
        if (rows.length > 1) {
          const headers = rows[0].map(h => h.toLowerCase().replace(/^"|"$/g, ''))
          const handleIdx = headers.findIndex(h => h === 'handle' || h === 'id' || h === 'slug')
          const titleIdx = headers.findIndex(h => h === 'title' || h === 'name')
          const priceIdx = headers.findIndex(h => h.includes('price'))
          const imgIdx = headers.findIndex(h => h.includes('image') || h.includes('src') || h.includes('img'))

          const seen = new Set()
          for (let i = 1; i < rows.length; i++) {
            const r = rows[i]
            if (!r || r.length < 2) continue
            const handle = (handleIdx !== -1 && r[handleIdx]) ? r[handleIdx] : r[0]
            if (!handle || seen.has(handle)) continue

            seen.add(handle)
            const title = (titleIdx !== -1 && r[titleIdx]) ? r[titleIdx] : handle.replace(/-/g, ' ')
            let price = (priceIdx !== -1 && r[priceIdx]) ? r[priceIdx].replace(/[^0-9.]/g, '') : '127'
            let img = (imgIdx !== -1 && r[imgIdx]) ? r[imgIdx] : '/images/qb-pro-plus-2024.webp'

            csvProducts.push({
              id: handle,
              slug: handle,
              name: title,
              category: 'GARDEN & HOME',
              price: parseFloat(price) || 127,
              image: img,
              hidden: true // 👈 المنتجات المستوردة تكون مخفية افتراضياً
            })
          }
        }
      }

      const merged = [...defaultProducts, ...csvProducts]
      setProductsList(merged)
      localStorage.setItem('qb_catalog_products', JSON.stringify(merged))
    } catch (err) {
      console.error(err)
      setProductsList(defaultProducts)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('qb_admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
    loadMergedCatalog()
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

  // 👁️ تبديل حالة الظهور
  const toggleProductVisibility = (productId) => {
    const updated = productsList.map(item => {
      if (item.id === productId || item.slug === productId) {
        const next = !item.hidden
        toast.success(`${item.name || item.title} is now ${next ? 'Hidden' : 'Visible on Store'}`)
        return { ...item, hidden: next }
      }
      return item
    })
    setProductsList(updated)
    localStorage.setItem('qb_catalog_products', JSON.stringify(updated))
  }

  const fetchData = async () => {
    setLoading(true)
    const { data: msgData } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    setMessages(msgData || [])

    const { data: visData } = await supabase.from('visitors').select('*').order('last_seen', { ascending: false }).limit(100)
    setVisitors(visData || [])

    const { data: chatData } = await supabase.from('chat_sessions').select('*').order('updated_at', { ascending: false })
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

  const exportGmcCsv = () => {
    try {
      const domain = 'https://qbdeals.shop'
      const headers = ['id', 'title', 'description', 'link', 'image_link', 'availability', 'price', 'brand', 'condition', 'google_product_category']
      const rows = (productsList || []).map((p) => {
        const cleanDesc = (p.description || p.name || '').replace(/"/g, '""')
        const priceFormatted = `${Number(p.variants?.[0]?.price || p.price || 135).toFixed(2)} USD`
        const productLink = `${domain}/#/product/${p.slug || p.id}`
        const imageLink = p.image && p.image.startsWith('http') ? p.image : `${domain}${p.image || '/images/qb-pro-plus-2024.webp'}`

        return [
          `"${p.id}"`, `"${p.name || p.title}"`, `"${cleanDesc}"`, `"${productLink}"`,
          `"${imageLink}"`, '"in_stock"', `"${priceFormatted}"`, '"QuickBooks"', '"new"',
          '"Software > Business & Productivity Software"'
        ].join(',')
      })

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n')
      const link = document.createElement('a')
      link.setAttribute('href', encodeURI(csvContent))
      link.setAttribute('download', `gmc_feed_qbdeals_${new Date().toISOString().slice(0, 10)}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('GMC Feed CSV Downloaded!')
    } catch {
      toast.error('Failed to export CSV.')
    }
  }

  useEffect(() => {
    if (!selectedSession) return
    const fetchSessionMessages = async () => {
      const { data } = await supabase.from('chat_messages').select('*').eq('session_id', selectedSession.id).order('created_at', { ascending: true })
      setChatMessages(data || [])
    }
    fetchSessionMessages()

    const channel = supabase.channel(`admin_chat_${selectedSession.id}`).on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `session_id=eq.${selectedSession.id}`
    }, (payload) => {
      setChatMessages(prev => prev.some(m => m.id === payload.new.id) ? prev : [...prev, payload.new])
    }).subscribe()

    return () => supabase.removeChannel(channel)
  }, [selectedSession])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendAgentReply = async (e) => {
    e.preventDefault()
    if (!replyInput.trim() || !selectedSession) return
    const messageText = replyInput.trim()
    setReplyInput('')

    const agentMsg = { session_id: selectedSession.id, sender: 'agent', message: messageText, created_at: new Date().toISOString() }
    setChatMessages(prev => [...prev, agentMsg])

    await supabase.from('chat_messages').insert([agentMsg])
    await supabase.from('chat_sessions').update({ status: 'agent', updated_at: new Date().toISOString() }).eq('id', selectedSession.id)
    setSelectedSession(prev => ({ ...prev, status: 'agent' }))
    toast.success('Reply sent!')
  }

  const handleEndSessionFromAdmin = async () => {
    if (!selectedSession || !window.confirm("End conversation?")) return
    await supabase.from('chat_messages').insert([{
      session_id: selectedSession.id, sender: 'agent', message: 'Conversation closed.', created_at: new Date().toISOString()
    }])
    await supabase.from('chat_sessions').update({ status: 'ended', updated_at: new Date().toISOString() }).eq('id', selectedSession.id)
    setSelectedSession(prev => ({ ...prev, status: 'ended' }))
    setChatSessions(prev => prev.map(s => s.id === selectedSession.id ? { ...s, status: 'ended' } : s))
    toast.success("Conversation ended!")
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
            <p className="text-xs text-gray-500 mt-1">Enter your password to manage catalog & visitors.</p>
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
          
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Control Panel</h1>
              <p className="text-xs text-gray-500">Manage products, storefront visibility, visitors & chat</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={exportGmcCsv}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-extrabold transition-all shadow-md shadow-emerald-600/20"
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

          {/* TABS */}
          <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'products' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Layers className="w-4 h-4" /> All Products Manager ({productsList.length})
            </button>

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

          {/* TAB 1: PRODUCT MANAGER (ALL IN ONE) */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-600" /> Catalog Visibility & Links
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Toggle visibility on Home page and access product URLs directly</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl font-bold border border-emerald-100">
                    Visible: {productsList.filter(p => !p.hidden).length}
                  </span>
                  <span className="text-xs text-red-700 bg-red-50 px-3 py-1.5 rounded-xl font-bold border border-red-100">
                    Hidden: {productsList.filter(p => p.hidden).length}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr className="text-gray-500 text-xs uppercase border-b border-gray-200">
                      <th className="p-4">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Open Link</th>
                      <th className="p-4 text-center">Show / Hide</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productsList.map((product) => {
                      const productLink = `/#/product/${product.slug || product.id}`
                      return (
                        <tr 
                          key={product.id || product.slug} 
                          className={`transition-colors ${product.hidden ? 'bg-gray-50/40 opacity-70' : 'hover:bg-gray-50/80 bg-white'}`}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={product.image} 
                                alt={product.name || product.title} 
                                className="w-10 h-10 object-contain rounded-lg border border-gray-200 bg-white p-1"
                                onError={(e) => { e.target.src = '/images/qb-pro-plus-2024.webp' }}
                              />
                              <div>
                                <div className="font-bold text-gray-900 text-xs sm:text-sm">{product.name || product.title}</div>
                                <div className="text-[11px] text-gray-400 font-mono">Slug: {product.slug || product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-extrabold text-emerald-600 text-xs sm:text-sm">
                            ${product.variants?.[0]?.price || product.price || 135} USD
                          </td>
                          <td className="p-4">
                            {product.hidden ? (
                              <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold border border-red-100">
                                <EyeOff className="w-3 h-3" /> Hidden
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100">
                                <CheckCircle className="w-3 h-3" /> Visible
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <a
                              href={productLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-emerald-600 hover:text-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> View
                            </a>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => toggleProductVisibility(product.id || product.slug)}
                              className={`p-2 rounded-xl border transition-all ${
                                product.hidden
                                  ? 'bg-gray-100 hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 border-gray-200'
                                  : 'bg-emerald-50 hover:bg-red-50 text-emerald-600 hover:text-red-600 border-emerald-200 shadow-sm'
                              }`}
                              title={product.hidden ? "Show on Store" : "Hide from Store"}
                            >
                              {product.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: VISITORS */}
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
                  Total: {visitors.length}
                </span>
              </div>

              {visitors.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No visitors tracked yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                        <th className="p-4">Visit Date</th>
                        <th className="p-4">Visitor IP</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Visited Page</th>
                        <th className="p-4">Time</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {visitors.map((v) => (
                        <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-xs text-gray-500">{new Date(v.last_seen).toLocaleString()}</td>
                          <td className="p-4 font-mono text-xs font-semibold">{v.ip_address || 'Unknown'}</td>
                          <td className="p-4 text-gray-600">
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg text-xs font-medium">
                              <Globe className="w-3.5 h-3.5 text-emerald-600" /> {v.location || 'Unknown'}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-emerald-700">
                            <span className="bg-gray-100 px-2.5 py-1 rounded-md text-xs font-mono">{v.current_page || '/'}</span>
                          </td>
                          <td className="p-4 text-gray-600 text-xs">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-gray-400" /> {formatTime(v.time_spent)}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button onClick={() => deleteVisitor(v.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
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

          {/* TAB 3: LIVE CHAT */}
          {activeTab === 'livechat' && (
            <div className="grid md:grid-cols-3 gap-6 h-[600px]">
              <div className="md:col-span-1 bg-white rounded-3xl border border-gray-100 p-4 overflow-y-auto space-y-2 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Conversations ({chatSessions.length})</h3>
                {chatSessions.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-8">No live chats yet.</p>
                ) : (
                  chatSessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSession(s)}
                      className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                        selectedSession?.id === s.id ? 'bg-emerald-50 border-emerald-300 shadow-sm' : 'bg-gray-50/60 hover:bg-gray-100 border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs font-bold text-gray-800">#{s.id.substring(0, 6)}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          s.status === 'ended' ? 'bg-red-100 text-red-700' : s.status === 'agent' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {s.status === 'ended' ? 'Ended' : s.status === 'agent' ? 'Agent' : 'Bot'}
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
                      {selectedSession.status !== 'ended' && (
                        <button
                          onClick={handleEndSessionFromAdmin}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"
                        >
                          <LogOut className="w-3.5 h-3.5" /> End Chat
                        </button>
                      )}
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/30 text-xs">
                      {chatMessages.map((m, idx) => (
                        <div key={m.id || idx} className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] p-3 rounded-2xl ${
                            m.sender === 'agent' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                          }`}>
                            <div className="text-[10px] opacity-75 font-bold mb-1 uppercase">
                              {m.sender === 'agent' ? 'You' : 'Visitor'}
                            </div>
                            <p>{m.message}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {selectedSession.status !== 'ended' && (
                      <form onSubmit={handleSendAgentReply} className="p-3 border-t border-gray-100 flex gap-2">
                        <input
                          type="text"
                          value={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                          placeholder="Reply to visitor..."
                          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none"
                        />
                        <button type="submit" className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1">
                          <Send className="w-3.5 h-3.5" /> Reply
                        </button>
                      </form>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
                    Select a conversation to start chatting.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT MESSAGES */}
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
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">{msg.subject}</h3>
                    <p className="text-gray-600 text-sm mb-4 whitespace-pre-wrap">{msg.message}</p>
                    <div className="flex justify-end border-t border-gray-100 pt-3">
                      <button onClick={() => deleteMessage(msg.id)} className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-semibold">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: GMC EXPORTER */}
          {activeTab === 'gmc' && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Google Merchant Center Feed Exporter</h2>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                Export all active products formatted strictly for Google Merchant Center specification.
              </p>
              <div className="pt-4">
                <button
                  onClick={exportGmcCsv}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 transition-all"
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
