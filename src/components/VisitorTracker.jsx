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

      // 🌐 1️⃣ جلب الـ IP والمدينة والبلد معاً في طلب واحد عبر ip-api.com
      try {
        const res = await fetch('https://ip-api.com/json/?fields=status,country,city,regionName,query', { 
          signal: AbortSignal.timeout(3500) 
        })
        const data = await res.json()
        if (data && data.status === 'success') {
          userIp = data.query || 'Unknown'
          const city = data.city || data.regionName || ''
          userLoc = `${city ? city + ', ' : ''}${data.country || ''}`.trim()
        }
      } catch (e) {
        console.log('Primary visitor tracker failed, trying backup...')
      }

      // 🌐 2️⃣ محاولة احتياطية ثانية عبر ipapi.co إذا لم يرجع الموقع في الأولى
      if (userLoc === 'Unknown') {
        try {
          const res2 = await fetch('https://ipapi.co/json/', { 
            signal: AbortSignal.timeout(3500) 
          })
          const data2 = await res2.json()
          if (data2 && data2.ip) {
            userIp = data2.ip
            const city = data2.city || data2.region || ''
            userLoc = `${city ? city + ', ' : ''}${data2.country_name || ''}`.trim()
          }
        } catch (e2) {}
      }

      // 📝 إدخال السجل الجديد في Supabase
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
