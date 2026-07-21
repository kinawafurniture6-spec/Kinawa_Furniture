import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import type { SiteData } from '../data/useSiteStore'

type Step = 1 | 2 | 3

interface FormData {
  name: string
  email: string
  phone: string
  productType: string
  projectCategory: 'Personal' | 'Hospitality' | ''
  dimensions: string
  material: string
  quantity: string
  notes: string
}

const empty: FormData = {
  name: '',
  email: '',
  phone: '',
  productType: '',
  projectCategory: '',
  dimensions: '',
  material: '',
  quantity: '',
  notes: '',
}

interface RequestQuoteProps {
  siteData?: SiteData
}

export default function RequestQuote({ siteData }: RequestQuoteProps) {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(empty)
  const [submitted, setSubmitted] = useState(false)

  const quoteHeader = siteData?.requestQuotePage || {
    subtitle: 'Custom Orders',
    title: 'Request a Quote',
    description: 'Tell us about your project requirements. We respond with initial estimates and material specifications within 24 hours.',
  }

  const phoneRaw = siteData?.contactInfo.phoneRaw || '6287788304421'

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const step1Complete = form.name && form.email && form.phone
  const step2Complete = form.productType && form.projectCategory

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-ivory min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="max-w-lg text-center py-20">
          <div className="w-16 h-16 border border-sandstone flex items-center justify-center mx-auto mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8 text-sandstone">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <Reveal>
            <h2
              className="text-4xl font-light text-charcoal mb-4"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Quote Request Received
            </h2>
            <p className="text-base text-charcoal/60 leading-relaxed mb-8">
              Thank you, <strong>{form.name}</strong>. We&apos;ll review your request and get back to you
              within 24 hours at <strong>{form.email}</strong>.
            </p>
            <p className="text-sm text-charcoal/40 mb-8">
              For faster follow-up, feel free to reach us directly on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${phoneRaw}?text=${encodeURIComponent(`Halo Kinawa Furniture, saya ${form.name} (${form.email}) ingin mengajukan penawaran custom: ${form.productType || 'Custom Order'}. Catatan: ${form.notes || 'Mohon infonya.'}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-ivory bg-rattan hover:bg-charcoal px-8 py-4 transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Continue on WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    )
  }

  const inputClass =
    'w-full bg-transparent border border-charcoal/20 px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-sandstone transition-colors'
  const labelClass = 'block text-[10px] tracking-[0.2em] uppercase text-charcoal/50 mb-1.5 font-semibold'

  return (
    <div className="bg-ivory pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-sandstone mb-4 font-semibold">
            {quoteHeader.subtitle}
          </p>
          <h1
            className="text-5xl md:text-6xl font-light text-charcoal leading-tight mb-4"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            {quoteHeader.title}
          </h1>
          <p className="text-base text-charcoal/60 leading-relaxed max-w-lg mb-12">
            {quoteHeader.description}
          </p>
        </Reveal>

        {/* Form Steps Indicator */}
        <div className="flex items-center gap-4 mb-12 border-b border-charcoal/10 pb-6">
          {([1, 2, 3] as Step[]).map((s) => (
            <button
              key={s}
              onClick={() => {
                if (s === 1 || (s === 2 && step1Complete) || (s === 3 && step1Complete && step2Complete)) {
                  setStep(s)
                }
              }}
              className={`flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                step === s
                  ? 'text-rattan font-bold'
                  : step > s
                  ? 'text-sandstone'
                  : 'text-charcoal/30'
              }`}
            >
              <span
                className={`w-6 h-6 border flex items-center justify-center text-[10px] font-medium ${
                  step === s
                    ? 'border-rattan bg-rattan text-ivory'
                    : step > s
                    ? 'border-sandstone text-sandstone'
                    : 'border-charcoal/20 text-charcoal/30'
                }`}
              >
                {s}
              </span>
              <span>
                {s === 1 ? 'Contact Info' : s === 2 ? 'Project Scope' : 'Specifications'}
              </span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+62 812 3456 7890"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!step1Complete}
                  onClick={() => setStep(2)}
                  className="text-[11px] tracking-[0.2em] uppercase font-medium text-ivory bg-rattan hover:bg-charcoal px-8 py-4 transition-colors disabled:opacity-40"
                >
                  Next: Project Scope →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className={labelClass}>Product Category *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lounge Chairs, Dining Set, Custom Cabinet..."
                  value={form.productType}
                  onChange={(e) => set('productType', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Project Type *</label>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  {(['Personal', 'Hospitality'] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => set('projectCategory', cat)}
                      className={`p-4 border text-left transition-colors ${
                        form.projectCategory === cat
                          ? 'border-rattan bg-rattan/10 text-rattan font-medium'
                          : 'border-charcoal/20 text-charcoal/70 hover:border-sandstone'
                      }`}
                    >
                      <p className="text-sm font-medium">{cat}</p>
                      <p className="text-xs text-charcoal/40 mt-1">
                        {cat === 'Personal'
                          ? 'For private homes, apartments, or villas'
                          : 'For hotels, cafés, restaurants, or resorts'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] tracking-[0.2em] uppercase font-medium text-charcoal/60 hover:text-charcoal px-6 py-4"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!step2Complete}
                  onClick={() => setStep(3)}
                  className="text-[11px] tracking-[0.2em] uppercase font-medium text-ivory bg-rattan hover:bg-charcoal px-8 py-4 transition-colors disabled:opacity-40"
                >
                  Next: Specifications →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Estimated Dimensions (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 180 × 90 × 75 cm"
                    value={form.dimensions}
                    onChange={(e) => set('dimensions', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Preferred Material</label>
                  <input
                    type="text"
                    placeholder="e.g. Natural Rattan, Teak Wood, Mixed"
                    value={form.material}
                    onChange={(e) => set('material', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Quantity Needed</label>
                <input
                  type="text"
                  placeholder="e.g. 1 piece, 12 sets for café"
                  value={form.quantity}
                  onChange={(e) => set('quantity', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Additional Notes & Design Brief</label>
                <textarea
                  rows={4}
                  placeholder="Share details about finish preferences, site conditions, delivery location, or custom design requirements..."
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[11px] tracking-[0.2em] uppercase font-medium text-charcoal/60 hover:text-charcoal px-6 py-4"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="text-[11px] tracking-[0.2em] uppercase font-medium text-ivory bg-rattan hover:bg-charcoal px-10 py-4 transition-colors shadow-md"
                >
                  Submit Quote Request →
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
