const rows = [
  { feature: 'One-time payment', us: true, retail: false, other: 'Sometimes' },
  { feature: 'No subscription / no yearly fees', us: true, retail: false, other: 'Sometimes' },
  { feature: 'Instant email delivery', us: true, retail: 'Varies', other: 'Varies' },
  { feature: 'Genuine license key', us: true, retail: true, other: 'Unclear' },
  { feature: '24/7 human support', us: true, retail: 'Limited', other: 'Limited' },
  { feature: '30-day money-back guarantee', us: true, retail: 'Varies', other: 'Rare' },
  { feature: 'Save up to 90%', us: true, retail: false, other: 'Varies' },
]

function Cell({ value }) {
  if (value === true) return <span className="text-brand-700 font-bold text-lg">✓</span>
  if (value === false) return <span className="text-red-500 font-bold text-lg">✕</span>
  return <span className="text-gray-500 text-sm">{value}</span>
}

export default function ComparisonTable() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Why we're the smarter choice</h2>
        <p className="text-gray-500 mb-10">See how we compare to yearly subscriptions and other stores.</p>
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3.5 px-5 font-semibold text-gray-900 border-b border-gray-200">Feature</th>
                <th className="py-3.5 px-4 font-bold text-brand-700 border-b border-gray-200">Our Store</th>
                <th className="py-3.5 px-4 font-semibold text-gray-500 border-b border-gray-200">Retail Subscription</th>
                <th className="py-3.5 px-4 font-semibold text-gray-500 border-b border-gray-200">Other Stores</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i < rows.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-3.5 px-5 text-left font-medium text-gray-800">{row.feature}</td>
                  <td className="py-3.5 px-4"><Cell value={row.us} /></td>
                  <td className="py-3.5 px-4"><Cell value={row.retail} /></td>
                  <td className="py-3.5 px-4"><Cell value={row.other} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
