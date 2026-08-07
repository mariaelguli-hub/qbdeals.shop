{/* Trust & Payment Bar */}
<div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
  
  {/* Badges */}
  <div className="flex flex-wrap items-center justify-center gap-4 font-medium">
    <span className="flex items-center gap-1">🔒 SSL Secured</span>
    <span className="flex items-center gap-1">✓ Secure Payment</span>
    <span className="flex items-center gap-1">↩ 30-Day Money-Back</span>
    <span className="flex items-center gap-1">✓ Genuine License</span>
  </div>

  {/* Payment Logos */}
  <div className="flex items-center gap-2">
    <span className="text-gray-400 mr-1">We accept</span>

    {/* Visa */}
    <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
      <svg className="h-3 w-auto" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.882 0.288L9.082 11.664H6.126L3.714 2.508C3.558 1.884 3.42 1.656 2.898 1.368C2.016 0.888 0.942 0.456 0 0.252L0.054 0.288H4.992C5.646 0.288 6.222 0.72 6.36 1.452L7.56 7.944L10.98 0.288H13.882ZM25.26 8.244C25.272 5.124 20.916 4.944 20.94 3.552C20.952 3.132 21.366 2.676 22.314 2.556C22.782 2.496 24.072 2.436 25.326 3.012L25.86 0.588C25.128 0.324 24.18 0.084 22.98 0.084C20.088 0.084 18.036 1.62 18.018 3.804C18.006 5.436 19.476 6.348 20.58 6.888C21.72 7.44 22.104 7.788 22.092 8.292C22.08 9.06 21.168 9.408 20.316 9.42C18.912 9.444 18.09 9.048 17.436 8.748L16.884 11.244C17.58 11.568 18.846 11.844 20.178 11.856C23.274 11.856 25.248 10.332 25.26 8.244ZM32.72 11.664H35.268L33.048 0.288H30.72C30.204 0.288 29.778 0.588 29.58 1.056L25.29 11.664H28.242L28.83 10.02H32.448L32.72 11.664ZM29.646 7.74L31.134 3.636L31.992 7.74H29.646ZM17.658 0.288L15.354 11.664H12.516L14.82 0.288H17.658Z" fill="#1434CB"/>
      </svg>
    </div>

    {/* Mastercard */}
    <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 object-contain" />
    </div>

    {/* PayPal */}
    <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 object-contain" />
    </div>

    {/* Apple Pay */}
    <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-3 object-contain" />
    </div>

    {/* Google Pay */}
    <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center shadow-xs">
      <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-3 object-contain" />
    </div>
  </div>

</div>
