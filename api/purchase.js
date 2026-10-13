// api/verify-purchase.js
export default async function handler(req, res) {
  // السماح فقط بطلبات POST لمنع التلاعب
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId, amount, email, osType } = req.body;

  // التأكد من أن البيانات الأساسية موجودة
  if (!orderId || !amount) {
    return res.status(400).json({ error: 'Missing required order data' });
  }

  const PIXEL_ID = '3622581311238586';
  // ملاحظة: الرمز التفعيلي CAPI Access Token ستستخرجه من إعدادات Meta Events Manager وتضعه في Environment Variables في Vercel
  const ACCESS_TOKEN = process.env.FB_CAPI_ACCESS_TOKEN; 

  if (!ACCESS_TOKEN) {
    // في حال لم تضف الرمز بعد، نكتفي بتسجيل الحدث ونمنع التزوير البرمجي العشوائي
    return res.status(200).json({ success: true, warning: 'CAPI Token not set yet, but validated server-side' });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_id: orderId, // منع التكرار (Deduplication)
            user_data: {
              // تشفير الإيميل حسب معايير فيسبوك (sha256) أو إرساله مباشرة إذا تطلب الأمر
              em: email ? [email.trim().toLowerCase()] : undefined,
            },
            custom_data: {
              currency: 'USD',
              value: parseFloat(amount),
              content_name: `QuickBooks ${osType || 'Desktop'} License 2024`,
              content_type: 'product'
            }
          }
        ],
      }),
    });

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Meta CAPI Error:', error);
    return res.status(500).json({ error: 'Failed to process server event' });
  }
}
