import { useState } from 'react'
import { type Product, companyInfo } from '../data'

interface DetailModalProps {
  product: Product
  onClose: () => void
  onQuote: () => void
}

export default function ProductDetailModal({ product, onClose, onQuote }: DetailModalProps) {
  const [activeImg, setActiveImg] = useState(0)

  // Collect all unique non-empty images (main photo + additional gallery photos)
  const allImages = Array.from(new Set([product.image, ...(product.images || [])].filter(Boolean)))

  const currentPhoto = allImages[activeImg] || product.image

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const waMessage = `Halo Kinawa Furniture, saya tertarik dengan produk ${product.name} (${product.price}). Boleh minta informasi lebih lanjut?`
  const waUrl = `${companyInfo.whatsappUrl}?text=${encodeURIComponent(waMessage)}`

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-ivory w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Gallery Container */}
          <div className="bg-white p-4 md:p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-charcoal/10">
            <div className="aspect-[4/5] overflow-hidden bg-sandstone/10 relative group">
              <img
                src={currentPhoto}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Prev / Next Arrows for Multi-image */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-charcoal/70 hover:bg-rattan text-ivory flex items-center justify-center transition-colors shadow-md"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-charcoal/70 hover:bg-rattan text-ivory flex items-center justify-center transition-colors shadow-md"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-3 right-3 bg-charcoal/80 text-ivory text-[9px] font-mono tracking-wider px-2 py-1">
                    {activeImg + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="flex gap-2 pt-4 overflow-x-auto">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 shrink-0 overflow-hidden border-2 transition-all ${
                      activeImg === i ? 'border-rattan scale-105 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Purchase/Quote Actions */}
          <div className="p-6 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-sage font-medium mb-1">
                    {product.category} · {product.material}
                  </p>
                  <h2
                    className="text-3xl font-light text-charcoal"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {product.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-charcoal/40 hover:text-charcoal transition-colors p-1"
                  aria-label="Close modal"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p
                className="text-2xl text-sandstone font-semibold mb-6"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {product.price}
              </p>

              <p className="text-sm text-charcoal/70 leading-relaxed mb-6">{product.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8 text-xs border-y border-charcoal/10 py-5">
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 mb-1">
                    Dimensions
                  </p>
                  <p className="text-charcoal/80 font-medium">{product.dimensions}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 mb-1">
                    Finish Options
                  </p>
                  <p className="text-charcoal/80 font-medium">{product.finish}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 mb-1">
                    Material
                  </p>
                  <p className="text-charcoal/80 font-medium">{product.material}</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 mb-1">
                    Custom Order
                  </p>
                  <p className={product.customAvailable ? 'text-sage font-medium' : 'text-charcoal/40'}>
                    {product.customAvailable ? 'Available' : 'Standard only'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={onQuote}
                className="w-full text-[11px] tracking-[0.18em] uppercase font-semibold text-ivory bg-rattan hover:bg-charcoal py-3.5 transition-colors duration-300 shadow-sm"
              >
                Request Custom Quote
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase font-semibold text-rattan border border-rattan/40 py-3.5 hover:bg-rattan hover:text-ivory transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
