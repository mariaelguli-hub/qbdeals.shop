import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export default function VisitorTracker() {
  const location = useLocation()

  useEffect(() => {
    let currentLogId = null
    let timer = null

    const recordNewVisit = async () => {
      let userIp = 'Unknown'
      let userLoc = 'Unknown'

      // 🌐 1. جلب الـ IP من أسرع سيرفر مفتوح (ipify raw / cloudflare)
      try {
        const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(3000) })
        const data = await res.json()
        if (data?.ip) userIp = data.ip
      } catch (e) {
        try {
          const resAlt = await fetch('https://api.bigdatacloud.net/data/client-ip', { signal: AbortSignal.timeout(3000) })
          const dataAlt = await resAlt.json()
          if (dataAlt?.ipString) userIp = dataAlt.ipString
        } catch (e2) {}
      }

      // 📍 2. جلب الموقع بـ API موثوق وخفيف جداً
      if (userIp !== 'Unknown') {
        try {
          const locRes = await fetch(`https://ipwho.is/${userIp}`, { signal: AbortSignal.timeout(3000) })
          const locData = await locRes.json()
          if (locData && locData.success) {
            const city = locData.city || locData.region || ''
            userLoc = `${city ? city + ', ' : ''}${locData.country || ''}`.trim()
          }
        } catch (e) {}
      }

      // 📝 3. إدخال السجل فـ Supabase
      const { data } = await supabase
        .from('visitors')
        .insert([
          {
            ip_address: userIp,
            location: userLoc,
            current_page: location.pathname,
            time_spent: 0,
            last_seen: new Date().toISOString()
          }
        ])
        .select()

      if (data && data[0]) {
        currentLogId = data[0].id
      }
    }

    recordNewVisit()

    // ⏱️ تحديث الوقت كل 5 ثوانٍ
    let spent = 0
    timer = setInterval(async () => {
      if (currentLogId) {
        spent += 5
        await supabase
          .from('visitors')
          .update({
            time_spent: spent,
            last_seen: new Date().toISOString()
          })
          .eq('id', currentLogId)
      }
    }, 5000)

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [location.pathname])

  return null
}
