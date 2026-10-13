import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

export default function Checkout() {
  const navigate = useNavigate();
  const [sdkLoaded, setSdkLoaded] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    os: '',
    country: '',
    users: ''
  });

  const [errors, setErrors] = useState(false);

  useEffect(() => {
    if (window.paypal) {
      setSdkLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=BAA7g-TRxn1tHm2l97rTyP5TGgoFv80wXtF89v2Dde2gDAMUbqeYsIynyUNA9udOSIiXBTWJnZnj89DDuE&currency=USD";
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    return formData.name && formData.email && formData.os && formData.country && formData.users;
  };

  useEffect(() => {
    if (sdkLoaded && window.paypal) {
      const container = document.getElementById('paypal-button-container');
      if (container) container.innerHTML = '';
      
      window.paypal.Buttons({
        onClick: (data, actions) => {
          if (!validateForm()) {
            setErrors(true);
            return actions.reject();
          }
          setErrors(false);
          return actions.resolve();
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: formData.users
              }
            }],
            // 👇 1. الحماية ديال بايبال: هاد السطر كيقول لبايبال بلي المنتج رقمي ومافيهش شحن
            application_context: {
              shipping_preference: 'NO_SHIPPING'
            }
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(async (details) => {
            
            // حفظ الطلب في قاعدة البيانات بعد نجاح الدفع مباشرة
            try {
              await supabase.from('orders').insert([{
                customer_name: formData.name,
                email: formData.email,
                os_type: formData.os,
                country: formData.country,
                amount_paid: parseFloat(formData.users),
                paypal_order_id: details.id,
                status: 'Completed'
              }]);
            } catch (error) {
              console.error("Error saving order to Supabase:", error);
            }

            // 👇 2. التوجيه الذكي لصفحة الشكر: كيدوز المعلومات (الثمن، الإيميل، رقم الطلب) باش تخدم صفحة الشكر مزيان
            navigate('/thank-you', { 
              state: { 
                orderId: details.id, 
                amount: formData.users, 
                email: formData.email,
                os: formData.os 
              } 
            });
          });
        }
      }).render('#paypal-button-container');
    }
  }, [sdkLoaded, formData, navigate]);

  const total = formData.users ? parseFloat(formData.users).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-white py-12 px-4 flex justify-center font-sans">
      <div className="w-full max-w-2xl">
        
        {errors && !validateForm() && (
          <div className="mb-6 p-4 bg-[#fdeded] border-l-4 border-[#d32f2f] text-[#d32f2f] text-sm">
            Please correct the errors before submission.
          </div>
        )}

        <form className="space-y-6">
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
                  checked={formData.country === 'united kingdom'} 
                  onChange={() => handleCheckboxChange('country', 'united kingdom')} 
                  className="w-4 h-4 accent-gray-800 cursor-pointer border-gray-300 rounded-sm" 
                />
                <span className="text-sm text-gray-900">united kingdom</span>
              </label>
            </div>
            {errors && !formData.country && (
              <div className="mt-0.5 p-2 bg-[#fdeded] text-[#d32f2f] text-xs">This field is required. Please select a value.</div>
            )}
          </div>

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
              <option value="199">1 User {'----->'} 199 $</option>
              <option value="249">2 Users {'----->'} 249 $</option>
              <option value="299">3 Users {'----->'} 299 $</option>
              <option value="349">5 Users {'----->'} 349 $</option>
            </select>
            {errors && !formData.users && (
              <div className="mt-0.5 p-2 bg-[#fdeded] text-[#d32f2f] text-xs">This field is required. Please select a value.</div>
            )}
          </div>

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

          <div className="mt-8 pt-4 border-t border-gray-200">
            <div id="paypal-button-container" className="w-full"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
