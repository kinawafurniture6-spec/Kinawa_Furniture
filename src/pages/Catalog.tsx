import { useState, useEffect } from 'react'
import { Reveal } from '../components/Reveal'
import ProductDetailModal from '../components/ProductDetailModal'
import { type Category, type Product } from '../data'
import type { SiteData } from '../data/useSiteStore'
import type { Page } from '../App'

interface CatalogProps {
  onNavigate: (page: Page) => void
  siteData?: SiteData
  initialCategory?: 'All' | Category
  initialProduct?: Product | null
}

const categoryFilters: ('All' | Category)[] = ['All', 'Chairs', 'Tables', 'Cabinets', 'Decor']

export default function Catalog({
  onNavigate,
  siteData,
  initialCategory = 'All',
  initialProduct = null,
}: CatalogProps) {
  const [catFilter, setCatFilter] = useState<'All' | Category>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState<Product | null>(initialProduct)

  useEffect(() => {
    if (initialCategory) {
      setCatFilter(initialCategory)
    }
  }, [initialCategory])

  useEffect(() => {
    if (initialProduct) {
      setSelected(initialProduct)
    }
  }, [initialProduct])

  const catalogHeader = siteData?.catalogPage || {
    subtitle: 'Handcrafted Furniture',
    title: 'Our Catalog',
    description: 'All pieces available in custom dimensions and finishes. Contact us for hospitality and bulk project pricing.',
  }

  const productsList = siteData?.products || []

  // Count helper
  const getCatCount = (cat: 'All' | Category) => {
    if (cat === 'All') return productsList.length
    return productsList.filter((p) => p.category === cat).length
  }

  const filtered = productsList.filter((p) => {
    const catOk = catFilter === 'All' || p.category === catFilter
    const searchOk =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return catOk && searchOk
  })

  return (
    <div className="bg-ivory pt-24 min-h-screen">
      {selected && (
        <ProductDetailModal
          product={selected}
          onClose={() => setSelected(null)}
          onQuote={() => {
            setSelected(null)
            onNavigate('quote')
          }}
        />
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-sandstone mb-4 font-semibold">
            {catalogHeader.subtitle}
          </p>
          <h1
            className="text-5xl md:text-6xl font-light text-charcoal leading-tight"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            {catalogHeader.title}
          </h1>
          <p className="mt-4 text-base text-charcoal/65 max-w-md leading-relaxed">
            {catalogHeader.description}
          </p>
        </Reveal>
      </div>

      {/* Controls: Search & Category Filters */}
      <div className="max-w-7xl mx-auto px-6 pb-10 space-y-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-charcoal/10">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk atau material..."
                className="w-full bg-white border border-charcoal/20 pl-10 pr-4 py-2.5 text-xs text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-rattan transition-colors"
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-charcoal/40 hover:text-charcoal"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <p className="text-xs text-charcoal/50 font-medium">
              Menampilkan <span className="text-rattan font-bold">{filtered.length}</span> dari {productsList.length} produk
            </p>
          </div>
        </Reveal>

        {/* Category Filter */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] tracking-[0.2em] uppercase text-charcoal/40 font-bold mr-1">Filter Kategori:</span>
            {categoryFilters.map((f) => {
              const count = getCatCount(f)
              return (
                <button
                  key={f}
                  onClick={() => setCatFilter(f)}
                  className={`text-[10px] tracking-[0.18em] uppercase px-4 py-2 border transition-colors duration-200 ${
                    catFilter === f
                      ? 'bg-rattan text-ivory border-rattan font-semibold shadow-sm'
                      : 'text-charcoal border-charcoal/20 hover:border-sandstone hover:text-sandstone bg-white/50'
                  }`}
                >
                  {f} <span className="opacity-60 text-[9px] ml-0.5">({count})</span>
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white/40 border border-dashed border-charcoal/15">
            <p className="text-charcoal/60 text-sm font-medium mb-2">Tidak ada produk yang cocok dengan pencarian Anda.</p>
            <button
              onClick={() => {
                setCatFilter('All')
                setSearchQuery('')
              }}
              className="text-xs text-rattan font-bold uppercase tracking-wider underline hover:text-charcoal"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelected(product)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="aspect-[3/4] overflow-hidden bg-white mb-4 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.customAvailable && (
                    <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-sandstone text-ivory px-2 py-1 font-semibold">
                      Custom
                    </span>
                  )}
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-ivory text-charcoal text-[10px] tracking-[0.2em] uppercase px-4 py-2 font-medium shadow-md">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-sage mb-1 font-medium">
                      {product.category} · {product.material}
                    </p>
                    <h3
                      className="text-lg font-light text-charcoal group-hover:text-sandstone transition-colors"
                      style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                    >
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-sandstone mt-2">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
