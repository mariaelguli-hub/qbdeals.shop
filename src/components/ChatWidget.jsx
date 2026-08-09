import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, Paperclip, RefreshCw, LogOut, Headset } from 'lucide-react'
import { supabase } from '../utils/supabase'

const QUICK_QUESTIONS = [
  "What products do you offer?",
  "Is this a one-time payment?",
  "How fast will I receive my license key?",
  "Can I transfer my license to a new PC?"
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [sessionStatus, setSessionStatus] = useState('bot')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const initChat = async (forceNew = false) => {
    let savedSessionId = localStorage.getItem('qb_chat_session')
    
    if (!savedSessionId || forceNew) {
      const { data } = await supabase
        .from('chat_sessions')
        .insert([{ status: 'bot' }])
        .select()

      if (data && data[0]) {
        savedSessionId = data[0].id
        localStorage.setItem('qb_chat_session', savedSessionId)
      }
    }

    setSessionId(savedSessionId)

    if (savedSessionId && !forceNew) {
      const { data: sessionData } = await supabase
        .from('chat_sessions')
        .select('status')
        .eq('id', savedSessionId)
        .single()

      if (sessionData) {
        setSessionStatus(sessionData.status)
      }

      const { data: existingMsg } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', savedSessionId)
        .order('created_at', { ascending: true })

      if (existingMsg && existingMsg.length > 0) {
        setMessages(existingMsg)
        return
      }
    } else {
      setSessionStatus('bot')
    }

    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        message: 'Hello! 👋 Welcome to QB DEALS. How can I assist you with your QuickBooks Desktop license today?'
      }
    ])
  }

  useEffect(() => {
    initChat()
  }, [])

  useEffect(() => {
    if (!sessionId) return

    const channel = supabase
      .channel(`widget_chat_${sessionId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}`
      }, (payload) => {
        setMessages(prev => {
          if (prev.some(m => m.id === payload.new.id)) return prev
          return [...prev, payload.new]
        })
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_sessions',
        filter: `id=eq.${sessionId}`
      }, (payload) => {
        if (payload.new?.status) {
          setSessionStatus(payload.new.status)
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [sessionId])

  const handleEndConversation = async () => {
    if (window.confirm("Are you sure you want to end this conversation and start a new chat?")) {
      if (sessionId) {
        await supabase
          .from('chat_sessions')
          .update({ status: 'ended', updated_at: new Date().toISOString() })
          .eq('id', sessionId)
      }

      localStorage.removeItem('qb_chat_session')
      await initChat(true)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.')
      return
    }

    setUploadingImage(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error } = await supabase.storage
      .from('chat-images')
      .upload(fileName, file)

    if (error) {
      console.error('Image upload failed:', error)
      setUploadingImage(false)
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('chat-images')
      .getPublicUrl(fileName)

    setSelectedImage(publicUrlData.publicUrl)
    setUploadingImage(false)
  }

  // محرك الردود الذكي والمتنوع حسب سؤال الزبون
  const generateResponse = (userPrompt) => {
    const text = userPrompt.toLowerCase().trim()

    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      return "Hello! 👋 Welcome to QB DEALS. Are you looking for QuickBooks Pro, Mac, or Enterprise?"
    }

    if (text.includes("mac")) {
      return "Yes, we have QuickBooks Plus 2024 for Mac available with instant email delivery. You can check it out in the Products section!"
    }

    if (text.includes("qb") || text.includes("quickbooks") || text.includes("product") || text.includes("version") || text.includes("need")) {
      return "We offer QuickBooks Pro Plus 2024, QuickBooks Plus 2024 Mac, and QuickBooks Enterprise 2024. Which one are you interested in?"
    }

    if (text.includes("price") || text.includes("cost") || text.includes("buy") || text.includes("pay")) {
      return "All our licenses are one-time payments with no monthly fees. Please check the Products section on our website for current pricing!"
    }

    if (text.includes("delivery") || text.includes("receive") || text.includes("email") || text.includes("fast")) {
      return "You will receive your license key and download link directly via email within 5 to 15 minutes of purchase."
    }

    return "We provide genuine QuickBooks Desktop licenses with instant delivery. Feel free to browse our Products section to place your order!"
  }

  const handleSend = async (textToSend = null) => {
    const messageContent = textToSend || inputMessage
    if ((!messageContent.trim() && !selectedImage) || !sessionId || sessionStatus === 'ended') return

    const userMessage = {
      session_id: sessionId,
      sender: 'user',
      message: messageContent,
      image_url: selectedImage,
      created_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setSelectedImage(null)

    await supabase.from('chat_messages').insert([userMessage])
    await supabase.from('chat_sessions').update({ updated_at: new Date().toISOString() }).eq('id', sessionId)

    if (sessionStatus !== 'agent') {
      setIsTyping(true)

      setTimeout(async () => {
        const responseText = generateResponse(messageContent)

        const botMessage = {
          session_id: sessionId,
          sender: 'bot',
          message: responseText,
          created_at: new Date().toISOString()
        }

        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)

        await supabase.from('chat_messages').insert([botMessage])
      }, 700)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
          
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-bold pr-1">
            Chat with US 👋
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[560px] bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center font-black text-sm border border-emerald-400/30">
                  QB
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  QB DEALS Support <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300/30" />
                </h3>
                <p className="text-[11px] text-emerald-200/80 font-medium">
                  {sessionStatus === 'agent' ? 'Live Agent Connected' : 'Instant AI & Live Assistance'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleEndConversation}
                title="End & Reset Chat"
                className="p-1.5 hover:bg-white/10 text-emerald-100 rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-xl transition-colors text-emerald-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-emerald-50/80 px-4 py-1.5 border-b border-emerald-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-800 font-medium flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${
                sessionStatus === 'ended' ? 'bg-red-500' : sessionStatus === 'agent' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-pulse'
              }`} /> 
              {sessionStatus === 'ended' ? 'Chat Ended' : sessionStatus === 'agent' ? 'Live Agent Connected' : 'Active Session'}
            </span>
            <button
              onClick={handleEndConversation}
              className="text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" /> {sessionStatus === 'ended' ? 'New Chat' : 'End Chat'}
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50/50 text-xs">
            {messages.map((msg, index) => (
              <div 
                key={msg.id || index} 
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                    msg.sender === 'agent' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {msg.sender === 'agent' ? <Headset className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                )}

                <div className={`max-w-[78%] space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.image_url && (
                    <img 
                      src={msg.image_url} 
                      alt="Attachment" 
                      className="rounded-2xl max-h-48 w-full object-cover border border-gray-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(msg.image_url, '_blank')}
                    />
                  )}

                  {msg.message && (
                    <div className={`p-3 rounded-2xl font-medium leading-relaxed shadow-sm whitespace-pre-line ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : msg.sender === 'agent'
                        ? 'bg-emerald-900 text-white rounded-bl-none border border-emerald-800'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                    }`}>
                      {msg.sender === 'agent' && (
                        <span className="block text-[10px] font-bold text-amber-300 uppercase mb-0.5">Live Agent</span>
                      )}
                      {msg.message}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 bg-gray-200 text-gray-700 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-gray-400 text-xs">
                <div className="w-7 h-7 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-gray-100 px-3 py-2 rounded-2xl flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            {messages.length <= 2 && sessionStatus !== 'ended' && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Quick Questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-left bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-100 px-3 py-1.5 rounded-xl font-medium transition-all text-[11px] shadow-sm hover:border-emerald-300 cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {selectedImage && (
            <div className="p-2 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={selectedImage} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-emerald-200" />
                <span className="text-[11px] text-emerald-800 font-semibold">Image Attached</span>
              </div>
              <button onClick={() => setSelectedImage(null)} className="text-gray-400 hover:text-red-500 p-1 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="p-3 bg-white border-t border-gray-100">
            {sessionStatus === 'ended' ? (
              <div className="text-center py-2">
                <p className="text-xs text-gray-500 mb-2 font-medium">This conversation has ended.</p>
                <button
                  onClick={() => handleEndConversation()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Start New Chat ✨
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                >
                  {uploadingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
                </button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() && !selectedImage}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      )}
    </div>
  )
}
