import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export default function VisitorTracker() {
  const location = useLocation()

  useEffect(() => {
    let sessionVisitorId = sessionStorage.getItem('qb_visitor_id')
    let timer = null

    const trackVisitor = async () => {
      let userIp = 'Unknown'
      let userLoc = 'Unknown'

      if (!sessionStorage.getItem('qb_user_ip')) {
        try {
          const ipRes = await fetch('https://api.ipify.org?format=json')
          const ipData = await ipRes.json()
          if (ipData.ip) {
            userIp = ipData.ip
            sessionStorage.setItem('qb_user_ip', userIp)

            try {
              const locRes = await fetch(`https://ipapi.co/${userIp}/json/`)
              const locData = await locRes.json()
              if (locData.country_name) {
                userLoc = `${locData.city || ''}, ${locData.country_name || ''}`.trim()
                sessionStorage.setItem('qb_user_loc', userLoc)
              }
            } catch (e) {}
          }
        } catch (e) {}
      } else {
        userIp = sessionStorage.getItem('qb_user_ip')
        userLoc = sessionStorage.getItem('qb_user_loc') || 'Unknown'
      }

      if (!sessionVisitorId) {
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
          sessionVisitorId = data[0].id
          sessionStorage.setItem('qb_visitor_id', sessionVisitorId)
        }
      } else {
        await supabase
          .from('visitors')
          .update({
            current_page: location.pathname,
            last_seen: new Date().toISOString()
          })
          .eq('id', sessionVisitorId)
      }
    }

    trackVisitor()

    timer = setInterval(async () => {
      const currentId = sessionStorage.getItem('qb_visitor_id')
      if (currentId) {
        const currentSpent = parseInt(sessionStorage.getItem('qb_time_spent') || '0', 10) + 5
        sessionStorage.setItem('qb_time_spent', currentSpent.toString())

        await supabase
          .from('visitors')
          .update({
            time_spent: currentSpent,
            last_seen: new Date().toISOString()
          })
          .eq('id', currentId)
      }
    }, 5000)

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [location.pathname])

  return null
}
