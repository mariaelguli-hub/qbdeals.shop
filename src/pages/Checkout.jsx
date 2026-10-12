import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Morocco'
  });

  const [sdkLoaded, setSdkLoaded] = useState(false);

  // Charger PayPal SDK
  useEffect(() => {
    if (window.paypal) {
      setSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    // 3wed CLIENT_ID b l-Client ID dial PayPal Business dyalk
    script.src = "https://www.paypal.com/sdk/js?client-id=BAA7g-TRxn1tHm2l97rTyP5TGgoFv80wXtF89v2Dde2gDAMUbqeYsIynyUNA9udOSIiXBTWJnZnj89DDuE&currency=USD";
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Render PayPal Buttons f l-Checkout Card
  useEffect(() => {
    if (sdkLoaded && window.paypal) {
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
        
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: cartTotal.toFixed(2)
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              clearCart();
              navigate('/thank-you');
            });
          },
          onError: (err) => {
            console.error('PayPal Error:', err);
            alert('Waqeate mochkil f amaliyat l-dafa3, 3awd mahawol.');
          }
        }).render('#paypal-button-container');
      }
    }
  }, [sdkLoaded, cartTotal, clearCart, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ila bghiti t-khdm l-methode l-3adiya wla l-form submission l-adiyya
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* L-Form dial Ma3lomat l-Chahin (Billing & Shipping) */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Ma3lomat l-Zaboun</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">L-Ism l-Awwal</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">L-Ism l-Aakhir</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">L- العنوان (Address)</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">L-Madina (City)</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Product Card & Checkout Payment Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Molakhas l-Talabiya (Order Summary)</h2>
            
            <div className="divide-y divide-gray-200 mb-4 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />}
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* PayPal Checkout Buttons f l-Card */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Ikhtar Tariqat l-Adaf (Payment Method)</h3>
              <div id="paypal-button-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
