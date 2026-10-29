import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export default function VisitorTracker() {
  const location = useLocation()
  const sessionRef = useRef({
    logId: null,
    ip: null,
    loc: null,
    spent: 0,
    pages: [],
    initialized: false,
    isInitializing: false
  })

  // 1. Track PageView f Meta Pixel & Update Page Journey bla duplicate
  useEffect(() => {
    const path = location.pathname

    // 🚫 Ila dkhal l-Admin Panel, bloki had l-browser mn t-tracking b-marra
    if (path.startsWith('/admin')) {
      localStorage.setItem('qb_ignore_tracking', 'true')
      return
    }

    // 🚫 Ila kan had l-jihaz howa dyal l-Admin, ma t-sjlch
    if (localStorage.getItem('qb_ignore_tracking') === 'true') {
      return
    }

    // 🚫 Exclude Bots & Crawlers (Facebook bot, Googlebot, Headless...)
    const ua = navigator.userAgent || ''
    if (/bot|crawler|spider|crawling|facebookexternalhit|Facebot|Googlebot|bingbot|Bytespider|HeadlessChrome|Lighthouse/i.test(ua) || navigator.webdriver) {
      return
    }

    // 🔵 Sift PageView l Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView')
    }

    const updateOrInitVisit = async () => {
      const state = sessionRef.current

      // Zid s-safha l-jdida f l-masar (Journey) bla تكرار متتالي
      if (state.pages[state.pages.length - 1] !== path) {
        state.pages.push(path)
      }
      // Khalli l-masar nqi (ex: "/ ➔ /shop ➔ /checkout")
      const journeyString = state.pages.slice(-4).join(' ➔ ')

      // Ila kan ديجا تسجل فـ هاد الجلسة، دير غير Update لنفس السطر!
      if (state.logId) {
        await supabase
          .from('visitors')
          .update({
            current_page: journeyString,
            last_seen: new Date().toISOString()
          })
          .eq('id', state.logId)
        return
      }

      if (state.isInitializing) return
      state.isInitializing = true

      let userIp = sessionStorage.getItem('qb_user_ip') || 'Unknown'
      let userLoc = sessionStorage.getItem('qb_user_loc') || 'Unknown'

      // 🌐 Jib l-IP w Location ghir merra whda f l-session
      if (userIp === 'Unknown') {
        try {
          const res = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(3500) })
          const data = await res.json()
          if (data && data.ip) {
            userIp = data.ip
            const city = data.city || data.region || ''
            userLoc = `${city ? city + ', ' : ''}${data.country || ''}`.trim()
          }
        } catch (e) {
          try {
            const resFallback = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) })
            const dataFallback = await resFallback.json()
            if (dataFallback?.ip) userIp = dataFallback.ip
          } catch (e2) {}
        }

        sessionStorage.setItem('qb_user_ip', userIp)
        sessionStorage.setItem('qb_user_loc', userLoc)
      }

      state.ip = userIp
      state.loc = userLoc

      // 🔍 Check wach had l-IP ديجا كاين فـ Supabase باش ما يتعاودش (No Duplicate IP)
      let existingRow = null
      if (userIp !== 'Unknown') {
        const { data: found } = await supabase
          .from('visitors')
          .select('id, time_spent, current_page')
          .eq('ip_address', userIp)
          .order('last_seen', { ascending: false })
          .limit(1)

        if (found && found.length > 0) {
          existingRow = found[0]
        }
      }

      if (existingRow) {
        // 🔄 Reuse نفس السطر القديم ديال هاد الـ IP وكمّل عليه
        state.logId = existingRow.id
        state.spent = existingRow.time_spent || 0
        
        // Dمج المسار القديم مع الجديد
        const oldPages = (existingRow.current_page || '').split(' ➔ ').filter(Boolean)
        if (oldPages[oldPages.length - 1] !== path) {
          oldPages.push(path)
        }
        state.pages = oldPages.slice(-4)

        await supabase
          .from('visitors')
          .update({
            current_page: state.pages.join(' ➔ '),
            last_seen: new Date().toISOString()
          })
          .eq('id', state.logId)
      } else {
        // 🆕 سجل زائر جديد فريد (Unique Visitor)
        const { data: inserted } = await supabase
          .from('visitors')
          .insert([
            {
              ip_address: userIp,
              location: userLoc,
              current_page: journeyString,
              time_spent: 0,
              last_seen: new Date().toISOString()
            }
          ])
          .select()

        if (inserted && inserted[0]) {
          state.logId = inserted[0].id
        }
      }

      state.initialized = true
      state.isInitializing = false
    }

    updateOrInitVisit()
  }, [location.pathname])

  // 2. ⏱️ Heartbeat Timer مستمر (ما كيوقفش وما كيتعاودش من الصفر فاش كيبدل الصفحة)
  useEffect(() => {
    if (localStorage.getItem('qb_ignore_tracking') === 'true') return

    const timer = setInterval(async () => {
      // Hsb l-weqt ghir ila kan l-tab mftouh قدام الكليان (Active Tab)
      if (document.visibilityState === 'visible' && sessionRef.current.logId) {
        sessionRef.current.spent += 5
        await supabase
          .from('visitors')
          .update({
            time_spent: sessionRef.current.spent,
            last_seen: new Date().toISOString()
          })
          .eq('id', sessionRef.current.logId)
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return null
}
