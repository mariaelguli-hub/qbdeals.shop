import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export default function VisitorTracker() {
  const location = useLocation()

  useEffect(() => {
    let currentLogId = null
    let timer = null

    const recordNewVisit = async () => {
      let userIp = 'Private/AdBlock'
      let userLoc = 'Unknown'

      // 🌐 المحاولة الأولى: ipify + ipapi
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2500) })
        const ipData = await ipRes.json()
        if (ipData?.ip) {
          userIp = ipData.ip
          try {
            const locRes = await fetch(`https://ipapi.co/${userIp}/json/`, { signal: AbortSignal.timeout(2500) })
            const locData = await locRes.json()
            if (locData?.country_name) {
              userLoc = `${locData.city || ''}, ${locData.country_name || ''}`.trim()
            }
          } catch (e) {}
        }
      } catch (e1) {
        // 🌐 المحاولة الثانية الاحتياطية (في حال حظر AdBlock للأولى)
        try {
          const altRes = await fetch('https://ip-api.com/json/?fields=query,city,country', { signal: AbortSignal.timeout(2500) })
          const altData = await altRes.json()
          if (altData?.query) {
            userIp = altData.query
            userLoc = `${altData.city || ''}, ${altData.country || ''}`.trim()
          }
        } catch (e2) {
          console.log('All IP providers bypassed or blocked')
        }
      }

      // تسجل الزيارة تلقائياً
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

    // تحديث وقت البقاء كل 5 ثوانٍ
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
