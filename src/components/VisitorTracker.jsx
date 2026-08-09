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

      // 🌐 جلب الـ IP من خدمة BigDataCloud الموثوقة والتي لا تتأثر بـ AdBlock
      try {
        const res = await fetch('https://api.bigdatacloud.net/data/client-ip', { 
          signal: AbortSignal.timeout(3000) 
        })
        const data = await res.json()
        if (data?.ipString) {
          userIp = data.ipString
        }
      } catch (e) {
        try {
          const res2 = await fetch('https://api.ipify.org?format=json', { 
            signal: AbortSignal.timeout(3000) 
          })
          const data2 = await res2.json()
          if (data2?.ip) userIp = data2.ip
        } catch (e2) {}
      }

      // 📍 جلب البلد والمدينة
      if (userIp !== 'Unknown') {
        try {
          const locRes = await fetch(`https://api.bigdatacloud.net/data/ip-geolocation?ip=${userIp}&localityLanguage=en`, { 
            signal: AbortSignal.timeout(3000) 
          })
          const locData = await locRes.json()
          if (locData?.country?.name) {
            const city = locData.city || locData.locality || ''
            userLoc = `${city ? city + ', ' : ''}${locData.country.name}`.trim()
          }
        } catch (e) {}
      }

      // 📝 إدخال السجل الجديد في قاعدة البيانات Supabase
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

    // ⏱️ تحديث الوقت المتبقي في الموقع كل 5 ثوانٍ
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
