import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { 
  Trash2, RefreshCw, MessageSquare, Lock, Eye, EyeOff, Globe, 
  Users, Clock, Compass, ShieldAlert, Send, LogOut, Download, 
  FileSpreadsheet, ExternalLink, Layers, CheckCircle, EyeOff as EyeOffIcon,
  ShoppingCart, Bot, Image as ImageIcon, Loader2, Flame, Search, Sparkles, Copy, Check, Activity
} from 'lucide-react'
import { supabase } from '../utils/supabase'
import { toast } from 'react-hot-toast'
import defaultProducts from '../data/products.json'
import HiddenExplorer from '../components/HiddenExplorer'

const ADMIN_PASSWORD = "MySecretAdminPassword2026!"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [activeTab, setActiveTab] = useState('visitors')
  const [messages, setMessages] = useState([])
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(false)
  const [cleaningDb, setCleaningDb] = useState(false)

  const [productsList, setProductsList] = useState([])
  const [orders, setOrders] = useState([]) 
  const [leads, setLeads] = useState([]) 

  // 🎯 States خاصة بـ Pro Visitors Control Panel
  const [visitorFilter, setVisitorFilter] = useState('all') // 'all' | 'online' | 'checkout' | 'product' | 'us_uk'
  const [hideAdminAndMorocco, setHideAdminAndMorocco] = useState(true)
  const [hideZeroSecBots, setHideZeroSecBots] = useState(false)
  const [visitorSearch, setVisitorSearch] = useState('')
  const [copiedIp, setCopiedIp] = useState(null)
  
  // 💬 States الشات المباشر
  const [chatSessions, setChatSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [replyInput, setReplyInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  
  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)

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

  const loadAndMergeAllProducts = async (forceRefresh = false) => {
    setLoading(true)
    try {
      const saved = !forceRefresh ? localStorage.getItem('qb_catalog_products') : null
      let baseList = saved ? JSON.parse(saved) : defaultProducts

      const res = await fetch('/home-and-garden.csv')
      if (res.ok) {
        const text = await res.text()
        const rows = parseCSVLine(text)
        if (rows.length > 1) {
          const headers = rows[0].map(h => h.toLowerCase().replace(/^"|"$/g, ''))
          const handleIdx = headers.findIndex(h => h === 'handle' || h === 'id' || h === 'slug')
          const titleIdx = headers.findIndex(h => h === 'title' || h === 'name')
          const priceIdx = headers.findIndex(h => h.includes('price'))
          const imgIdx = headers.findIndex(h => h.includes('image') || h.includes('src') || h.includes('img'))

          const existingIds = new Set(baseList.map(p => String(p.id)))
          const csvItems = []

          for (let i = 1; i < rows.length; i++) {
            const r = rows[i]
            if (!r || r.length < 2) continue
            const handle = (handleIdx !== -1 && r[handleIdx]) ? r[handleIdx] : r[0]
            if (!handle || existingIds.has(handle)) continue

            existingIds.add(handle)
            const title = (titleIdx !== -1 && r[titleIdx]) ? r[titleIdx] : handle.replace(/-/g, ' ')
            let price = (priceIdx !== -1 && r[priceIdx]) ? r[priceIdx].replace(/[^0-9.]/g, '') : '127'
            let img = (imgIdx !== -1 && r[imgIdx]) ? r[imgIdx] : '/images/qb-pro-plus-2024.webp'

            csvItems.push({
              id: handle,
              slug: handle,
              name: title,
              category: 'GARDEN & HOME',
              price: parseFloat(price) || 127,
              image: img,
              hidden: true
            })
          }
          baseList = [...baseList, ...csvItems]
        }
      }

      setProductsList(baseList)
      localStorage.setItem('qb_catalog_products', JSON.stringify(baseList))
      if (forceRefresh) toast.success(`Synced ${baseList.length} products!`)
    } catch (err) {
      console.error(err)
      setProductsList(defaultProducts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // 🚫 منع متصفح الأدمن من التسجيل فـ جدول الزوار أوتوماتيكياً
    localStorage.setItem('qb_ignore_tracking', 'true')

    if (localStorage.getItem('qb_admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
    loadAndMergeAllProducts()
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('qb_admin_auth', 'true')
      localStorage.setItem('qb_ignore_tracking', 'true')
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

  const toggleProductVisibility = (productId) => {
    const updated = productsList.map(item => {
      if (String(item.id) === String(productId) || String(item.slug) === String(productId)) {
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

    // 🚀 جلب حتى 2000 سجل بدون بلوكاج ديال 100
    const { data: visData } = await supabase.from('visitors').select('*').order('last_seen', { ascending: false }).limit(2000)
    setVisitors(visData || [])

    const { data: chatData } = await supabase.from('chat_sessions').select('*').order('updated_at', { ascending: false })
    setChatSessions(chatData || [])

    const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(ordersData || [])

    const { data: leadsData } = await supabase.from('checkout_leads').select('*').order('created_at', { ascending: false })
    setLeads(leadsData || [])

    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
      const interval = setInterval(fetchData, 6000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  // ==========================================
  // 🧠 محرك تجميع الزوار الفريدين (Unique Visitors Engine)
  // ==========================================
  const { allUniqueVisitors, filteredVisitors, stats, duplicateIdsToClean, adminOrMoroccoIdsToClean } = useMemo(() => {
    const ipMap = new Map()
    const dupIds = []
    const adminMoroccoIds = []
    const now = Date.now()

    visitors.forEach((row) => {
      const ip = (row.ip_address || 'Unknown').trim()
      const loc = (row.location || 'Unknown').trim()
      const pageStr = row.current_page || '/'
      const isMorOrAdmin = /morocco|casablanca|rabat|marrakech|tangier|beni mellal|fes/i.test(loc) || pageStr.includes('/admin')

      if (isMorOrAdmin) {
        adminMoroccoIds.push(row.id)
      }

      const rawPages = pageStr.split(' ➔ ').map(p => p.trim()).filter(Boolean)

      if (!ipMap.has(ip)) {
        ipMap.set(ip, {
          primaryId: row.id,
          allIds: [row.id],
          ip_address: ip,
          location: loc,
          last_seen: row.last_seen,
          time_spent: Number(row.time_spent) || 0,
          pages: [...rawPages],
          hits: 1,
          isMorOrAdmin
        })
      } else {
        // هذا السطر مكرر لنفس الـ IP -> ندمج بياناته ونحفظ الـ ID ديالو للتنظيف
        dupIds.push(row.id)
        const existing = ipMap.get(ip)
        existing.allIds.push(row.id)
        existing.hits += 1
        existing.time_spent += (Number(row.time_spent) || 0)

        if (existing.location === 'Unknown' && loc !== 'Unknown') {
          existing.location = loc
        }
        if (isMorOrAdmin) {
          existing.isMorOrAdmin = true
        }

        // الاحتفاظ بأحدث توقيت ظهور
        if (new Date(row.last_seen) > new Date(existing.last_seen)) {
          existing.last_seen = row.last_seen
        }

        // دمج مسار الصفحات بدون تكرار متتالي
        rawPages.forEach(p => {
          if (!existing.pages.includes(p)) {
            existing.pages.push(p)
          }
        })
      }
    })

    const uniqueList = Array.from(ipMap.values()).map(v => {
      const diffSec = Math.floor((now - new Date(v.last_seen).getTime()) / 1000)
      const isOnline = diffSec >= 0 && diffSec <= 65 // متصل في آخر 65 ثانية
      const joinedPages = v.pages.join(' ➔ ')

      let stage = 'browsing'
      if (joinedPages.includes('/thank-you')) stage = 'purchased'
      else if (joinedPages.includes('/checkout')) stage = 'checkout'
      else if (joinedPages.includes('/cart')) stage = 'cart'
      else if (joinedPages.includes('/product/')) stage = 'product'

      const isTier1 = /united states|usa|united kingdom|uk|canada|australia/i.test(v.location)

      return {
        ...v,
        isOnline,
        diffSec,
        stage,
        isTier1,
        journey: v.pages.slice(-4).join(' ➔ '),
        lastPage: v.pages[v.pages.length - 1] || '/'
      }
    })

    // تطبيق الفلاتر المختارة
    let baseList = uniqueList
    if (hideAdminAndMorocco) {
      baseList = baseList.filter(v => !v.isMorOrAdmin)
    }
    if (hideZeroSecBots) {
      baseList = baseList.filter(v => v.time_spent > 0 || v.isOnline || v.stage === 'checkout' || v.stage === 'purchased')
    }

    const kpiStats = {
      onlineNow: baseList.filter(v => v.isOnline).length,
      totalUnique: baseList.length,
      tier1Count: baseList.filter(v => v.isTier1).length,
      highIntentCount: baseList.filter(v => v.stage === 'checkout' || v.stage === 'product' || v.stage === 'cart' || v.stage === 'purchased').length,
      checkoutCount: baseList.filter(v => v.stage === 'checkout' || v.stage === 'purchased').length
    }

    let finalFiltered = baseList
    if (visitorFilter === 'online') {
      finalFiltered = finalFiltered.filter(v => v.isOnline)
    } else if (visitorFilter === 'checkout') {
      finalFiltered = finalFiltered.filter(v => v.stage === 'checkout' || v.stage === 'cart' || v.stage === 'purchased')
    } else if (visitorFilter === 'product') {
      finalFiltered = finalFiltered.filter(v => v.stage === 'product' || v.stage === 'checkout' || v.stage === 'purchased')
    } else if (visitorFilter === 'us_uk') {
      finalFiltered = finalFiltered.filter(v => v.isTier1)
    }

    if (visitorSearch.trim()) {
      const q = visitorSearch.toLowerCase().trim()
      finalFiltered = finalFiltered.filter(v => 
        v.ip_address.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.journey.toLowerCase().includes(q)
      )
    }

    return {
      allUniqueVisitors: uniqueList,
      filteredVisitors: finalFiltered,
      stats: kpiStats,
      duplicateIdsToClean: dupIds,
      adminOrMoroccoIdsToClean: adminMoroccoIds
    }
  }, [visitors, hideAdminAndMorocco, hideZeroSecBots, visitorFilter, visitorSearch])

  // 🧹 دالة تنظيف قاعدة البيانات من التكرار وزيارات الأدمن/المغرب بضغطة واحدة
  const handleCleanDatabase = async () => {
    const idsToDelete = [...new Set([...duplicateIdsToClean, ...adminOrMoroccoIdsToClean])]
    if (idsToDelete.length === 0) {
      toast.success('Database is already 100% clean & unique!')
      return
    }
    if (!window.confirm(`Clean ${idsToDelete.length} duplicate & Admin/Morocco logs from database?`)) return

    setCleaningDb(true)
    try {
      // مسح على شكل دفعات (Chunks) لتفادي أي خطأ في الرابط
      const chunkSize = 100
      for (let i = 0; i < idsToDelete.length; i += chunkSize) {
        const chunk = idsToDelete.slice(i, i + chunkSize)
        await supabase.from('visitors').delete().in('id', chunk)
      }
      toast.success(`Cleaned ${idsToDelete.length} redundant logs!`)
      await fetchData()
    } catch (err) {
      console.error(err)
      toast.error('Error cleaning database')
    } finally {
      setCleaningDb(false)
    }
  }

  // مسح زائر كامل بجميع السطور المرتبطة بـ IP ديالو
  const deleteUniqueVisitor = async (allIds, ip) => {
    const { error } = await supabase.from('visitors').delete().in('id', allIds)
    if (!error) {
      setVisitors(prev => prev.filter(v => !allIds.includes(v.id)))
      toast.success(`Removed visitor ${ip}`)
    }
  }

  const copyIp = (ip) => {
    navigator.clipboard.writeText(ip)
    setCopiedIp(ip)
    toast.success(`Copied IP: ${ip}`)
    setTimeout(() => setCopiedIp(null), 2000)
  }

  const formatRelativeTime = (dateStr, isOnline) => {
    if (isOnline) return 'Just now'
    const sec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
    if (sec < 60) return `${sec}s ago`
    const min = Math.floor(sec / 60)
    if (min < 60) return `${min}m ago`
    const hrs = Math.floor(min / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  }

  const exportGmcCsv = () => {
    try {
      const domain = 'https://qbdeals.shop'
      const headers = ['id', 'title', 'description', 'link', 'image_link', 'availability', 'price', 'brand', 'condition', 'google_product_category']
      const rows = (productsList || []).map((p) => {
        const cleanDesc = (p.description || p.name || '').replace(/"/g, '""')
        const priceFormatted = `${Number(p.variants?.[0]?.price || p.price || 199).toFixed(2)} USD`
        // ✅ رابط نقي بدون #
        const productLink = `${domain}/product/${p.slug || p.id}`
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
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !selectedSession) return

    setIsUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${selectedSession.id}/${fileName}`

    try {
      const { error: uploadError } = await supabase.storage
        .from('chat_attachments')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from('chat_attachments')
        .getPublicUrl(filePath)

      const imageUrl = publicUrlData.publicUrl

      const agentMsg = { 
        session_id: selectedSession.id, 
        sender: 'agent', 
        message: 'Sent an attachment', 
        image_url: imageUrl,
        created_at: new Date().toISOString() 
      }
      
      setChatMessages(prev => [...prev, agentMsg])
      await supabase.from('chat_messages').insert([agentMsg])
      await supabase.from('chat_sessions').update({ status: 'agent', updated_at: new Date().toISOString() }).eq('id', selectedSession.id)
      setSelectedSession(prev => ({ ...prev, status: 'agent' }))

    } catch (err) {
      console.error("Upload Error:", err)
      toast.error('Failed to upload image. Make sure "chat_attachments" bucket exists.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleHandoverToAI = async () => {
    if (!selectedSession) return
    await supabase.from('chat_sessions').update({ status: 'ai', updated_at: new Date().toISOString() }).eq('id', selectedSession.id)
    setSelectedSession(prev => ({ ...prev, status: 'ai' }))
    toast.success("Handed over to AI Bot")
  }

  const handleEndSessionFromAdmin = async () => {
    if (!selectedSession || !window.confirm("End conversation?")) return
    const closeMsg = {
      session_id: selectedSession.id,
      sender: 'agent',
      message: 'This conversation has been closed by live support. Thank you for contacting QB DEALS!',
      created_at: new Date().toISOString()
    }
    await supabase.from('chat_messages').insert([closeMsg])
    await supabase.from('chat_sessions').update({ status: 'ended', updated_at: new Date().toISOString() }).eq('id', selectedSession.id)
    setSelectedSession(prev => ({ ...prev, status: 'ended' }))
    setChatSessions(prev => prev.map(s => s.id === selectedSession.id ? { ...s, status: 'ended' } : s))
    toast.success("Conversation ended!")
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
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
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

      <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* HEADER BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-emerald-600/20">
                QB
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Control Panel</h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {stats.onlineNow} Live Now
                  </span>
                </div>
                <p className="text-xs text-gray-500">Real-Time Visitor Intelligence, Orders & Live Support</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={fetchData}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                title="Refresh Live Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} /> Refresh
              </button>
              <button 
                onClick={() => loadAndMergeAllProducts(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                title="Force refresh & sync all CSV items"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync CSV
              </button>
              <button 
                onClick={exportGmcCsv}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <Download className="w-4 h-4" /> Export GMC (.CSV)
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* TABS NAVIGATION */}
          <div className="flex flex-wrap gap-2.5 border-b border-gray-200 pb-3">
            <button
              onClick={() => setActiveTab('visitors')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'visitors' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Compass className="w-4 h-4" /> Unique Visitors ({stats.totalUnique})
              {stats.onlineNow > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-white text-emerald-700 rounded-full text-[11px] font-black">
                  {stats.onlineNow} live
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'orders' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'leads' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Users className="w-4 h-4" /> Abandoned Carts ({leads.length})
            </button>

            <button
              onClick={() => setActiveTab('livechat')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'livechat' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Live Chat ({chatSessions.length})
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'products' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Layers className="w-4 h-4" /> All Products ({productsList.length})
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'messages' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Forms ({messages.length})
            </button>

            <button
              onClick={() => setActiveTab('hidden')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'hidden' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <EyeOffIcon className="w-4 h-4" /> Explorer
            </button>

            <button
              onClick={() => setActiveTab('gmc')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'gmc' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" /> GMC
            </button>
          </div>

          {/* ========================================================= */}
          {/* 🚀 PRO VISITORS CONTROL PANEL (100% UNIQUE & REAL-TIME)   */}
          {/* ========================================================= */}
          {activeTab === 'visitors' && (
            <div className="space-y-5">
              
              {/* 1. TOP KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  onClick={() => setVisitorFilter('online')}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Online Now</span>
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">{stats.onlineNow}</span>
                    <span className="text-xs text-emerald-600 font-bold">Active in last 60s</span>
                  </div>
                </div>

                <div 
                  onClick={() => setVisitorFilter('all')}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unique Visitors</span>
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">{stats.totalUnique}</span>
                    <span className="text-xs text-gray-500 font-medium">Deduplicated IPs</span>
                  </div>
                </div>

                <div 
                  onClick={() => setVisitorFilter('us_uk')}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">US / UK / CA Traffic</span>
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">{stats.tier1Count}</span>
                    <span className="text-xs text-indigo-600 font-bold">
                      {stats.totalUnique > 0 ? `${Math.round((stats.tier1Count / stats.totalUnique) * 100)}% of traffic` : 'Target Market'}
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => setVisitorFilter('checkout')}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:border-amber-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reached Checkout</span>
                    <Flame className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-600">{stats.checkoutCount}</span>
                    <span className="text-xs text-gray-500 font-medium">({stats.highIntentCount} viewed product)</span>
                  </div>
                </div>
              </div>

              {/* 2. SMART FILTERS & DB CLEANER BAR */}
              <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setVisitorFilter('all')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        visitorFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All Unique ({stats.totalUnique})
                    </button>
                    <button
                      onClick={() => setVisitorFilter('online')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        visitorFilter === 'online' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" /> Online Now ({stats.onlineNow})
                    </button>
                    <button
                      onClick={() => setVisitorFilter('checkout')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        visitorFilter === 'checkout' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      🔥 In Checkout ({stats.checkoutCount})
                    </button>
                    <button
                      onClick={() => setVisitorFilter('product')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        visitorFilter === 'product' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                      }`}
                    >
                      👀 Viewed Product ({stats.highIntentCount})
                    </button>
                    <button
                      onClick={() => setVisitorFilter('us_uk')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        visitorFilter === 'us_uk' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                      }`}
                    >
                      🇺🇸 US & UK Only ({stats.tier1Count})
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      value={visitorSearch}
                      onChange={(e) => setVisitorSearch(e.target.value)}
                      placeholder="Search IP, country, city or page..."
                      className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Smart Exclusion Toggles & 1-Click DB Cleaner */}
                <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                      <input
                        type="checkbox"
                        checked={hideAdminAndMorocco}
                        onChange={(e) => setHideAdminAndMorocco(e.target.checked)}
                        className="rounded accent-emerald-600 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>🚫 Exclude Morocco & Admin Visits</span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                      <input
                        type="checkbox"
                        checked={hideZeroSecBots}
                        onChange={(e) => setHideZeroSecBots(e.target.checked)}
                        className="rounded accent-emerald-600 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>🤖 Hide 0s Bounce / Crawlers</span>
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    {(duplicateIdsToClean.length > 0 || adminOrMoroccoIdsToClean.length > 0) && (
                      <button
                        onClick={handleCleanDatabase}
                        disabled={cleaningDb}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        {cleaningDb 
                          ? 'Cleaning Database...' 
                          : `Clean ${[...new Set([...duplicateIdsToClean, ...adminOrMoroccoIdsToClean])].length} Duplicate / Admin Logs`}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. PRO VISITORS TABLE */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {filteredVisitors.length === 0 ? (
                  <div className="p-12 text-center space-y-2">
                    <Compass className="w-10 h-10 text-gray-300 mx-auto" />
                    <div className="text-sm font-bold text-gray-700">No matching visitors found</div>
                    <p className="text-xs text-gray-400">Try changing your active filter or unchecking the exclusion toggles above.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-100">
                          <th className="p-4">Status & Last Seen</th>
                          <th className="p-4">Unique Visitor IP</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Funnel Stage & Page Journey</th>
                          <th className="p-4">Total Time</th>
                          <th className="p-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredVisitors.map((v) => (
                          <tr 
                            key={v.ip_address} 
                            className={`transition-colors ${
                              v.isOnline 
                                ? 'bg-emerald-50/40 hover:bg-emerald-50/70' 
                                : v.stage === 'checkout' 
                                ? 'bg-amber-50/20 hover:bg-amber-50/40' 
                                : 'hover:bg-gray-50/60'
                            }`}
                          >
                            {/* STATUS & TIME */}
                            <td className="p-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {v.isOnline ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                    ONLINE NOW
                                  </span>
                                ) : (
                                  <span className="text-xs font-bold text-gray-800">
                                    {formatRelativeTime(v.last_seen, false)}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-gray-400 mt-0.5">
                                {new Date(v.last_seen).toLocaleString()}
                              </div>
                            </td>

                            {/* UNIQUE IP + COPY */}
                            <td className="p-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-xs font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                                  {v.ip_address}
                                </span>
                                <button
                                  onClick={() => copyIp(v.ip_address)}
                                  className="p-1 text-gray-400 hover:text-emerald-600 rounded-md cursor-pointer"
                                  title="Copy IP"
                                >
                                  {copiedIp === v.ip_address ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                              {v.hits > 1 && (
                                <span className="inline-block mt-1 text-[10px] font-bold text-gray-400">
                                  {v.hits} page logs merged
                                </span>
                              )}
                            </td>

                            {/* LOCATION */}
                            <td className="p-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                                v.isTier1 
                                  ? 'bg-indigo-50 text-indigo-900 border-indigo-200' 
                                  : 'bg-gray-100 text-gray-700 border-gray-200'
                              }`}>
                                <Globe className={`w-3.5 h-3.5 ${v.isTier1 ? 'text-indigo-600' : 'text-gray-500'}`} />
                                {v.location || 'Unknown'}
                              </span>
                            </td>

                            {/* FUNNEL STAGE & PAGE JOURNEY */}
                            <td className="p-4 max-w-md">
                              <div className="flex items-center gap-2 mb-1">
                                {v.stage === 'purchased' && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                                    💰 PURCHASED
                                  </span>
                                )}
                                {v.stage === 'checkout' && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                                    🔥 IN CHECKOUT
                                  </span>
                                )}
                                {v.stage === 'cart' && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-orange-800">
                                    🛒 IN CART
                                  </span>
                                )}
                                {v.stage === 'product' && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                                    👀 VIEWING PRODUCT
                                  </span>
                                )}
                                {v.stage === 'browsing' && (
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-600">
                                    🌐 BROWSING
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-mono text-gray-600 break-all bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                                {v.journey}
                              </div>
                            </td>

                            {/* TIME SPENT */}
                            <td className="p-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold ${
                                v.time_spent >= 60 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                  : v.time_spent >= 15 
                                  ? 'bg-blue-50 text-blue-700' 
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                <Clock className="w-3.5 h-3.5" />
                                {formatTime(v.time_spent)}
                              </span>
                            </td>

                            {/* DELETE ACTION */}
                            <td className="p-4 text-right whitespace-nowrap">
                              <button 
                                onClick={() => deleteUniqueVisitor(v.allIds, v.ip_address)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                title="Delete all logs for this IP"
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
            </div>
          )}

          {/* TAB ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-emerald-600" /> Confirmed Orders
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">List of all successful payments via PayPal</p>
                </div>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-100">
                  Total Revenue: ${orders.reduce((acc, curr) => acc + Number(curr.amount_paid), 0).toFixed(2)}
                </span>
              </div>
              
              {orders.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No orders received yet. Waiting for the first sale! 🚀</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                        <th className="p-4">Date</th>
                        <th className="p-4">Customer Info</th>
                        <th className="p-4">OS & Country</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">PayPal Order ID</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-xs text-gray-500">
                            {new Date(order.created_at).toLocaleString()}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-gray-900">{order.customer_name}</div>
                            <div className="text-xs text-emerald-700 font-medium">{order.email}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-gray-800">{order.os_type}</div>
                            <div className="text-xs text-gray-500">{order.country}</div>
                          </td>
                          <td className="p-4 font-black text-emerald-600">
                            ${Number(order.amount_paid).toFixed(2)}
                          </td>
                          <td className="p-4 text-xs font-mono text-gray-500">
                            {order.paypal_order_id}
                          </td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100">
                              <CheckCircle className="w-3 h-3" /> {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB PRODUCTS */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-600" /> Catalog Visibility & Links
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Toggle visibility on Home page and view direct product URLs</p>
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
                      <th className="p-4">Product Info</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Storefront Status</th>
                      <th className="p-4 text-center">Open Link</th>
                      <th className="p-4 text-center">Show / Hide</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productsList.map((product) => {
                      // ✅ رابط نقي بدون #
                      const productLink = `/product/${product.slug || product.id}`
                      return (
                        <tr 
                          key={product.id || product.slug} 
                          className={`transition-colors ${product.hidden ? 'bg-gray-50/50 opacity-60' : 'hover:bg-gray-50/80 bg-white'}`}
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
                            ${product.variants?.[0]?.price || product.price || 199} USD
                          </td>
                          <td className="p-4">
                            {product.hidden ? (
                              <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold border border-red-100">
                                <EyeOff className="w-3 h-3" /> Hidden from Home
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-100">
                                <CheckCircle className="w-3 h-3" /> Visible on Store
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <a
                              href={productLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 transition-all cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" /> View
                            </a>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => toggleProductVisibility(product.id || product.slug)}
                              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                                product.hidden
                                  ? 'bg-gray-100 hover:bg-emerald-50 text-gray-500 hover:text-emerald-600 border-gray-200 hover:border-emerald-300'
                                  : 'bg-emerald-50 hover:bg-red-50 text-emerald-600 hover:text-red-600 border-emerald-200 hover:border-red-300 shadow-sm'
                              }`}
                              title={product.hidden ? "Click to Show on Home" : "Click to Hide from Home"}
                            >
                              {product.hidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5 text-emerald-600" />}
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

          {/* TAB LEADS */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" /> Abandoned Checkouts
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Customers who clicked PayPal but didn't finish paying</p>
                </div>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold">
                  Total Leads: {leads.length}
                </span>
              </div>
              
              {leads.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No leads captured yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                        <th className="p-4">Date</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Intended Product</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-xs text-gray-500">
                            {new Date(lead.created_at).toLocaleString()}
                          </td>
                          <td className="p-4 font-bold text-gray-900">{lead.name}</td>
                          <td className="p-4 font-medium text-emerald-700">{lead.email}</td>
                          <td className="p-4 text-gray-600 text-xs">{lead.product_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB LIVE CHAT */}
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

              <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
                {selectedSession ? (
                  <>
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">Session ID: {selectedSession.id}</h4>
                        <p className="text-xs text-emerald-600 font-medium">Status: {selectedSession.status?.toUpperCase()}</p>
                      </div>

                      <div className="flex gap-2">
                        {selectedSession.status === 'agent' && (
                          <button
                            onClick={handleHandoverToAI}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Bot className="w-3.5 h-3.5" /> Give to AI
                          </button>
                        )}
                        {selectedSession.status !== 'ended' && (
                          <button
                            onClick={handleEndSessionFromAdmin}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" /> End Chat
                          </button>
                        )}
                      </div>
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
                              <a href={m.image_url} target="_blank" rel="noreferrer">
                                <img src={m.image_url} alt="Attachment" className="rounded-xl max-h-48 w-auto object-cover mb-2 border border-black/10" />
                              </a>
                            )}
                            <p className="whitespace-pre-wrap leading-relaxed">{m.message}</p>
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
                      <div className="p-3 border-t border-gray-100 bg-white">
                        <form onSubmit={handleSendAgentReply} className="flex gap-2 items-center relative">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                            title="Attach Image"
                          >
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
                          </button>

                          <input
                            type="text"
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                            placeholder="Type a message..."
                            disabled={isUploading}
                            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                          
                          <button
                            type="submit"
                            disabled={isUploading || (!replyInput.trim())}
                            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
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

          {/* TAB CONTACT FORM MESSAGES */}
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
                        className="inline-flex items-center gap-1 px-3 py-1.5 font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB HIDDEN PRODUCTS EXPLORER */}
          {activeTab === 'hidden' && (
            <HiddenExplorer />
          )}

          {/* TAB GMC EXPORTER */}
          {activeTab === 'gmc' && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Google Merchant Center Feed Exporter</h2>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  Export all store products formatted strictly according to Google Merchant Center specification (USD prices, clean BrowserRouter URLs, in_stock status).
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
