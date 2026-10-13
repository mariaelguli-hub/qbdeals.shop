import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [sdkLoaded, setSdkLoaded] = useState(false);

  // حالة الفورم لتخزين البيانات
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    os: '',      // 'Mac' أو 'Windows'
    country: '', // 'United States' أو 'Canada'
    users: ''    // السعر المختار
  });

  // حالة لتتبع الأخطاء عند الضغط على زر الدفع
  const [errors, setErrors] = useState(false);

  // تحميل مكتبة باي بال
  useEffect(() => {
    if (window.paypal) {
      setSdkLoaded(true);
      return;
    }
    const script = document.createElement('script');
    // Client ID الخاص بك الذي أرسلته مسبقاً
    script.src = "https://www.paypal.com/sdk/js?client-id=BAA7g-TRxn1tHm2l97rTyP5TGgoFv80wXtF89v2Dde2gDAMUbqeYsIynyUNA9udOSIiXBTWJnZnj89DDuE&currency=USD";
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    document.body.appendChild(script);
  }, []);

  // دالة لتحديث المدخلات
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // دالة لتحديث مربعات الاختيار (Checkboxes) لتعمل مثل الراديو
  const handleCheckboxChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // التحقق من أن جميع الحقول ممتلئة
  const validateForm = () => {
    return formData.name && formData.email && formData.os && formData.country && formData.users;
  };

  // دمج أزرار باي بال
  useEffect(() => {
    if (sdkLoaded && window.paypal) {
      const container = document.getElementById('paypal-button-container');
      if (container) container.innerHTML = '';
      
      window.paypal.Buttons({
        // عند الضغط على زر باي بال، نتحقق من الأخطاء أولاً
        onClick: (data, actions) => {
          if (!validateForm()) {
            setErrors(true);
            return actions.reject(); // إيقاف فتح نافذة باي بال إذا كان هناك خطأ
          }
          setErrors(false);
          return actions.resolve(); // إكمال العملية إذا كانت البيانات صحيحة
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: formData.users // السعر الذي اختاره الزبون
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            navigate('/thank-you');
          });
        }
      }).render('#paypal-button-container');
    }
  }, [sdkLoaded, formData, navigate]);

  // حساب المجموع (Total)
  const total = formData.users ? parseFloat(formData.users).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-white py-12 px-4 flex justify-center font-sans">
      <div className="w-full max-w-2xl">
        
        {/* صندوق الخطأ العلوي يظهر فقط إذا كانت هناك أخطاء */}
        {errors && !validateForm() && (
          <div className="mb-6 p-4 bg-[#fdeded] border-l-4 border-[#d32f2f] text-[#d32f2f] text-sm">
            Please correct the errors before submission.
          </div>
        )}

        <form className="space-y-6">
          {/* حقل الاسم */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Name <span className="text-[#d32f2f]">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2.5 border rounded outline-none text-sm ${
                errors && !formData.name ? 'border-[#d32f2f] bg-[#fdeded]' : 'border-gray-300'
              }`}
            />
            {errors && !formData.name && (
              <div className="mt-0.5 p-2 bg-[#fdeded] text-[#d32f2f] text-xs">Name is required.</div>
            )}
          </div>

          {/* حقل الإيميل */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Email Address <span className="text-[#d32f2f]">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2.5 border rounded outline-none text-sm ${
                errors && !formData.email ? 'border-[#d32f2f] bg-[#fdeded]' : 'border-gray-300'
              }`}
            />
            {errors && !formData.email && (
              <div className="mt-0.5 p-2 bg-[#fdeded] text-[#d32f2f] text-xs">This field is required. Please input a valid email.</div>
            )}
          </div>

          {/* حقل Mac / Windows */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Mac / Windows <span className="text-[#d32f2f]">*</span>
            </label>
            <div className={`flex gap-6 p-2 -ml-2 rounded ${errors && !formData.os ? 'bg-[#fdeded] border border-[#d32f2f]' : ''}`}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.os === 'Mac'} 
                  onChange={() => handleCheckboxChange('os', 'Mac')} 
                  className="w-4 h-4 accent-gray-800 cursor-pointer border-gray-300 rounded-sm" 
                />
                <span className="text-sm text-gray-900">Mac</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.os === 'Windows'} 
                  onChange={() => handleCheckboxChange('os', 'Windows')} 
                  className="w-4 h-4 accent-gray-800 cursor-pointer border-gray-300 rounded-sm" 
                />
                <span className="text-sm text-gray-900">Windows</span>
              </label>
            </div>
            {errors && !formData.os && (
              <div className="mt-0.5 p-2 bg-[#fdeded] text-[#d32f2f] text-xs">This field is required. Please select a value.</div>
            )}
          </div>

          {/* حقل Country */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Country <span className="text-[#d32f2f]">*</span>
            </label>
            <div className={`flex gap-6 p-2 -ml-2 rounded ${errors && !formData.country ? 'bg-[#fdeded] border border-[#d32f2f]' : ''}`}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.country === 'United States'} 
                  onChange={() => handleCheckboxChange('country', 'United States')} 
                  className="w-4 h-4 accent-gray-800 cursor-pointer border-gray-300 rounded-sm" 
                />
                <span className="text-sm text-gray-900">United States</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.country === 'Canada'} 
                  onChange={() => handleCheckboxChange('country', 'Canada')} 
                  className="w-4 h-4 accent-gray-800 cursor-pointer border-gray-300 rounded-sm" 
                />
                <span className="text-sm text-gray-900">Canada</span>
              </label>
            </div>
            {errors && !formData.country && (
              <div className="mt-0.5 p-2 bg-[#fdeded] text-[#d32f2f] text-xs">This field is required. Please select a value.</div>
            )}
          </div>

          {/* قائمة اختيار عدد المستخدمين مع خصم 49 دولار */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              How many users ? <span className="text-[#d32f2f]">*</span>
            </label>
            <select
              name="users"
              value={formData.users}
              onChange={handleChange}
              className={`w-full p-2.5 border rounded outline-none text-sm appearance-none bg-white ${
                errors && !formData.users ? 'border-[#d32f2f] bg-[#fdeded]' : 'border-gray-300'
              }`}
            >
              <option value="" disabled>Click to choose</option>
              <option value="200">1 User {'----->'} 200 $</option>
              <option value="250">2 Users {'----->'} 250 $</option>
              <option value="300">3 Users {'----->'} 300 $</option>
              <option value="350">5 Users {'----->'} 350 $</option>
            </select>
            {errors && !formData.users && (
              <div className="mt-0.5 p-2 bg-[#fdeded] text-[#d32f2f] text-xs">This field is required. Please select a value.</div>
            )}
          </div>

          {/* المجموع الإجمالي (Total) */}
          <div>
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Total ($)
            </label>
            <input
              type="text"
              readOnly
              value={total}
              className="w-full p-2.5 border border-gray-300 rounded bg-[#f3f4f6] outline-none text-sm"
            />
          </div>

          {/* أزرار PayPal */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div id="paypal-button-container" className="w-full"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
