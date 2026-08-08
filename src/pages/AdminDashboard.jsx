import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, Trash2, CheckCircle, RefreshCw, MessageSquare } from 'lucide-react'
import { supabase } from '../utils/supabase'
import { toast } from 'react-hot-toast'

export default function AdminDashboard() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

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
    fetchMessages()
  }, [])

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

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — QB DEALS</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Messages Dashboard</h1>
                <p className="text-xs text-gray-500">Total Messages: {messages.length}</p>
              </div>
            </div>
            <button 
              onClick={fetchMessages}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
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

                  <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
                    {msg.status === 'unread' && (
                      <button 
                        onClick={() => markAsRead(msg.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Mark Read
                      </button>
                    )}
                    <button 
                      onClick={() => deleteMessage(msg.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
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
