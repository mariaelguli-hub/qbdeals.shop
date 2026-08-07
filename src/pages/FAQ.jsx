import { Helmet } from 'react-helmet-async'
import FAQAccordion from '../components/FAQAccordion'

export default function FAQ() {
  return (
    <>
      <Helmet><title>FAQ — QB DEALS</title></Helmet>
      <section className="pt-12 pb-24 bg-gray-50 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-500">Everything you need to know before you buy.</p>
        </div>
        <FAQAccordion />
      </section>
    </>
  )
}
