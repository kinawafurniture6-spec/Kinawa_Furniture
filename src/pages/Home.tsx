import { useState, useEffect } from 'react'
import { Reveal } from '../components/Reveal'
import ProductDetailModal from '../components/ProductDetailModal'
import type { Product } from '../data'
import type { SiteData } from '../data/useSiteStore'
import type { Page } from '../App'

interface HomeProps {
  onNavigate: (page: Page, category?: any) => void
  siteData?: SiteData
}

// SVG line-art icons for categories
const CategoryIcon = ({ name }: { name: string }) => {
  if (name === 'Chairs')
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path d="M10 28 L10 16 Q10 12 14 12 L26 12 Q30 12 30 16 L30 28" strokeLinecap="round" />
        <path d="M7 22 L33 22" strokeLinecap="round" />
        <path d="M10 28 L10 34 M30 28 L30 34" strokeLinecap="round" />
        <path d="M6 22 L10 22 M30 22 L34 22" strokeLinecap="round" />
      </svg>
    )
  if (name === 'Tables')
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <path d="M6 16 L34 16" strokeLinecap="round" />
        <path d="M10 16 L10 34 M30 16 L30 34" strokeLinecap="round" />
        <path d="M6 16 L8 10 L32 10 L34 16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  if (name === 'Cabinets')
    return (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
        <rect x="8" y="8" width="24" height="28" rx="0.5" />
        <path d="M20 8 L20 36" strokeLinecap="round" />
        <circle cx="17" cy="22" r="1.5" fill="currentColor" />
        <circle cx="23" cy="22" r="1.5" fill="currentColor" />
        <path d="M8 16 L32 16" />
      </svg>
    )
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-8 h-8">
      <path d="M20 8 Q24 8 26 12 L28 20 Q28 28 20 30 Q12 28 12 20 L14 12 Q16 8 20 8Z" />
      <path d="M20 30 L20 36" strokeLinecap="round" />
      <path d="M16 36 L24 36" strokeLinecap="round" />
      <path d="M20 14 L20 22 M17 18 L23 18" strokeLinecap="round" />
    </svg>
  )
}

// Hero Slideshow Component with Auto-play & Ken Burns Zoom Effect
function HeroSlideshow({ slides }: { slides: { image: string; title: string; category: string }[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!slides || slides.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [slides])

  if (!slides || slides.length === 0) return null

  return (
    <div className="w-full h-[520px] md:h-full relative overflow-hidden bg-sandstone/20">
      {slides.map((slide, i) => {
        const isActive = i === current
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${
                isActive ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        )
      })}

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-charcoal/40 via-transparent to-ivory/10 pointer-events-none z-20" />

      {/* Bottom Tag Badge */}
      <div className="absolute bottom-6 left-6 z-30 bg-ivory/90 backdrop-blur-md px-4 py-3 shadow-lg border border-sandstone/20">
        <p className="text-[9px] tracking-[0.25em] uppercase text-sandstone font-medium">
          {slides[current]?.category}
        </p>
        <p
          className="text-sm font-medium text-charcoal mt-0.5"
          style={{ fontFamily: 'Fraunces, Georgia, serif' }}
        >
          {slides[current]?.title}
        </p>
      </div>

      {/* Slide Indicators Dots */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-sandstone' : 'w-1.5 bg-ivory/70 hover:bg-ivory'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Featured products carousel component
function FeaturedCarousel({
  onNavigate,
  onSelectProduct,
  productsList,
  featuredInfo,
}: {
  onNavigate: (page: Page) => void
  onSelectProduct: (product: Product) => void
  productsList: Product[]
  featuredInfo: { subtitle: string; title: string; btnText: string }
}) {
  const featured = productsList.filter((p) => p.featured).length > 0
    ? productsList.filter((p) => p.featured)
    : productsList.slice(0, 4)

  const [index, setIndex] = useState(0)
  const visibleCount = 3

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(featured.length - visibleCount, i + 1))

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-sandstone mb-3 font-medium">
                {featuredInfo.subtitle}
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal leading-tight"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {featuredInfo.title}
              </h2>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={prev}
                disabled={index === 0}
                className="w-11 h-11 border border-charcoal/20 flex items-center justify-center hover:border-sandstone hover:text-sandstone transition-colors disabled:opacity-25"
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={index >= featured.length - visibleCount}
                className="w-11 h-11 border border-charcoal/20 flex items-center justify-center hover:border-sandstone hover:text-sandstone transition-colors disabled:opacity-25"
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="relative">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${index} * (33.333% + 8px)))` }}
          >
            {featured.map((product, i) => (
              <div
                key={product.id}
                className="min-w-[calc(33.333%-10.67px)] md:min-w-[calc(33.333%-10.67px)] min-w-[85vw] group cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <div className="overflow-hidden bg-ivory mb-4 aspect-[3/4] relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  {product.customAvailable && (
                    <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-sandstone text-ivory px-2 py-1">
                      Custom Available
                    </span>
                  )}
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-ivory text-charcoal text-[10px] tracking-[0.2em] uppercase px-4 py-2 font-medium shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between">
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
                  <p className="text-sm text-sandstone font-medium mt-1 text-right whitespace-nowrap">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-1.5 mt-8 md:hidden">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(Math.max(0, Math.min(i, featured.length - 1)))}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? 'bg-sandstone' : 'bg-charcoal/20'
              }`}
            />
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium text-charcoal border border-charcoal/30 px-8 py-3.5 hover:bg-charcoal hover:text-ivory transition-colors duration-300"
          >
            {featuredInfo.btnText}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home({ onNavigate, siteData }: HomeProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const hero = siteData?.hero || {
    tagline: 'Rattan & Wooden Furniture · Est. 2012',
    titlePart1: 'Crafted',
    titleHighlight: 'by Hand,',
    titlePart2: 'Built to Last.',
    description: 'Custom rattan and wooden furniture for homes, hotels, cafés, and resorts.',
    exploreBtnText: 'Explore Collection',
    quoteBtnText: 'Request a Quote',
    stats: [
      { num: '12+', label: 'Years of Craft' },
      { num: '300+', label: 'Projects Done' },
      { num: '15', label: 'Master Craftsmen' },
    ],
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&h=1200&fit=crop&auto=format',
        title: 'Weave Lounge Chair',
        category: 'Handcrafted Rattan',
      },
    ],
  }

  const brandQuote = siteData?.brandQuote || {
    quote: '"Every piece of rattan tells the story of the craftsman who shaped it — woven with patience, finished with pride, built for generations."',
  }

  const catSection = siteData?.categoriesSection || {
    subtitle: 'What We Make',
    title: 'Shop by Category',
    items: [],
  }

  const featSection = siteData?.featuredSection || {
    subtitle: 'Handpicked for You',
    title: 'Featured Collection',
    btnText: 'View Full Catalog',
  }

  const ourProcess = siteData?.ourProcess || {
    subtitle: 'Our Process',
    title: 'Where Every Strand Has a Purpose',
    desc1: 'Our craftsmen begin each piece by hand-selecting rattan poles...',
    desc2: 'The result is furniture that doesn\'t just furnish a room...',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&h=875&fit=crop&auto=format',
    badgeNumber: '12+',
    badgeLabel: 'Years of craft',
    materials: [
      { title: 'Rattan', desc: 'Ethically sourced from Kalimantan' },
      { title: 'Teak', desc: 'FSC-certified plantation wood' },
      { title: 'Finishing', desc: 'Non-toxic oil & water-based lacquer' },
    ],
  }

  const featProjSection = siteData?.featuredProjectsSection || {
    subtitle: 'Real Spaces',
    title: 'Featured Projects',
    btnText: 'View All Projects →',
  }

  const testimonialsSection = siteData?.testimonialsSection || {
    subtitle: 'Client Voices',
    title: 'Trusted by Designers & Owners',
    items: [],
  }

  const cta = siteData?.ctaBanner || {
    subtitle: 'Start a Conversation',
    titlePart1: 'Ready to Create Something',
    titleHighlight: 'Lasting?',
    description: "Tell us about your space. We'll design and craft furniture that feels like it was always meant to be there.",
    quoteBtn: 'Request a Quote',
    waBtn: 'Chat on WhatsApp',
  }

  const productsList = siteData?.products || []
  const projectsList = siteData?.projects || []
  const waUrl = siteData?.contactInfo.whatsappUrl || 'https://wa.me/6287788304421'

  return (
    <div className="bg-ivory">
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onQuote={() => {
            setSelectedProduct(null)
            onNavigate('quote')
          }}
        />
      )}

      {/* ── 1. HERO ── */}
      <section className="min-h-screen flex flex-col md:flex-row pt-28 sm:pt-32 md:pt-28">
        {/* Left: text */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16">
          <div className="max-w-lg mt-4 sm:mt-6 md:mt-8">
            <Reveal>
              <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-sandstone mb-6 font-semibold inline-block border-b border-sandstone/30 pb-1">
                {hero.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-charcoal leading-[1.08] mb-6 sm:mb-8"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {hero.titlePart1}
                <br />
                <em className="not-italic text-rattan font-normal">{hero.titleHighlight}</em>
                <br />
                {hero.titlePart2}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg text-charcoal/65 leading-relaxed mb-8 sm:mb-10 max-w-md">
                {hero.description}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-ivory bg-rattan hover:bg-charcoal px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {hero.exploreBtnText}
                </button>
                <button
                  onClick={() => onNavigate('quote')}
                  className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-charcoal border border-charcoal/30 px-8 py-4 hover:bg-charcoal hover:text-ivory transition-all duration-300"
                >
                  {hero.quoteBtnText}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex gap-6 sm:gap-8 mt-12 sm:mt-14 pt-8 sm:pt-10 border-t border-charcoal/10">
                {hero.stats.map((st, i) => (
                  <div key={i}>
                    <p
                      className="text-2xl sm:text-3xl font-light text-rattan mb-1"
                      style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                    >
                      {st.num}
                    </p>
                    <p className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-charcoal/50">{st.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: Auto-cycling Slideshow with Ken Burns Zoom */}
        <div className="w-full md:w-[48%] relative min-h-[460px] md:min-h-screen">
          <HeroSlideshow slides={hero.slides} />
        </div>
      </section>

      {/* ── 2. BRAND QUOTE ── */}
      <section className="py-20 bg-ivory">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <div className="rattan-divider mb-12" />
            <p
              className="text-2xl md:text-3xl font-light text-charcoal leading-relaxed italic"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              {brandQuote.quote}
            </p>
            <div className="rattan-divider mt-12" />
          </Reveal>
        </div>
      </section>

      {/* ── 3. CATEGORY HIGHLIGHTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[11px] tracking-[0.25em] uppercase text-sandstone mb-3 font-medium">
                {catSection.subtitle}
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {catSection.title}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {catSection.items.map((cat, i) => {
              const matchingProductsCount = productsList.filter(
                (p) => p.category.toLowerCase() === cat.name.toLowerCase()
              ).length
              const displayCount = matchingProductsCount > 0 ? matchingProductsCount : cat.count

              return (
                <Reveal key={cat.name} delay={i * 0.08}>
                  <button
                    onClick={() => onNavigate('catalog', cat.name)}
                    className="cat-card relative aspect-[3/4] overflow-hidden bg-ivory/50 w-full text-left group"
                    aria-label={`Browse ${cat.name}`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="cat-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                    <div className="cat-overlay absolute inset-0 bg-rattan/30" />

                    <div className="absolute top-4 right-4 text-ivory/70">
                      <CategoryIcon name={cat.name} />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 overflow-hidden">
                      <div className="cat-label">
                        <p className="text-[9px] tracking-[0.2em] uppercase text-ivory/60 mb-0.5">
                          {displayCount} {displayCount === 1 ? 'piece' : 'pieces'}
                        </p>
                        <p
                          className="text-xl font-light text-ivory"
                          style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                        >
                          {cat.name}
                        </p>
                      </div>
                    </div>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS CAROUSEL ── */}
      <FeaturedCarousel
        onNavigate={onNavigate}
        onSelectProduct={(product) => onNavigate('catalog', { product })}
        productsList={productsList}
        featuredInfo={featSection}
      />

      {/* ── 5. CRAFTSMANSHIP / OUR PROCESS ── */}
      <section className="py-24 bg-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <Reveal>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden bg-sandstone/20">
                  <img
                    src={ourProcess.image}
                    alt="Master craftsman weaving rattan by hand"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-rattan text-ivory px-6 py-5 w-36 shadow-lg">
                  <p
                    className="text-3xl font-light leading-none"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {ourProcess.badgeNumber}
                  </p>
                  <p className="text-[9px] tracking-[0.2em] uppercase mt-1 text-ivory/70 font-medium">
                    {ourProcess.badgeLabel}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <div>
              <Reveal>
                <p className="text-[11px] tracking-[0.25em] uppercase text-sandstone mb-4 font-medium">
                  {ourProcess.subtitle}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-charcoal leading-tight mb-6"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  {ourProcess.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base text-charcoal/60 leading-relaxed mb-6">
                  {ourProcess.desc1}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-base text-charcoal/60 leading-relaxed mb-10">
                  {ourProcess.desc2}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-charcoal/10">
                  {ourProcess.materials.map((mat) => (
                    <div key={mat.title}>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-sandstone mb-1 font-semibold">
                        {mat.title}
                      </p>
                      <p className="text-xs text-charcoal/50 leading-snug">{mat.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PROJECT GALLERY PREVIEW ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-sandstone mb-3 font-medium">
                  {featProjSection.subtitle}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-light text-charcoal"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  {featProjSection.title}
                </h2>
              </div>
              <button
                onClick={() => onNavigate('gallery')}
                className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-sandstone hover:text-charcoal transition-colors"
              >
                {featProjSection.btnText}
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsList.slice(0, 3).map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <div
                  className="group cursor-pointer"
                  onClick={() => onNavigate('gallery')}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-ivory mb-4 relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-charcoal/80 text-ivory px-2.5 py-1 backdrop-blur-sm">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-sandstone mb-1 font-medium">
                    {project.location}
                  </p>
                  <h3
                    className="text-xl font-light text-charcoal group-hover:text-sandstone transition-colors"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-charcoal/50 mt-1 line-clamp-1">{project.products}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ── */}
      <section className="py-24 bg-ivory border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[11px] tracking-[0.25em] uppercase text-sandstone mb-3 font-medium">
                {testimonialsSection.subtitle}
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {testimonialsSection.title}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsSection.items.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.1}>
                <div className="bg-white p-8 border border-sandstone/15 flex flex-col justify-between h-full shadow-sm hover:shadow transition-shadow">
                  <p
                    className="text-base text-charcoal/70 leading-relaxed italic mb-8"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    "{t.quote}"
                  </p>
                  <div>
                    <p className="text-sm font-medium text-charcoal">{t.author}</p>
                    <p className="text-xs text-sandstone font-medium">{t.role}</p>
                    <p className="text-[10px] text-charcoal/40 uppercase tracking-wider mt-1">
                      {t.project}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA BANNER ── */}
      <section className="py-24 bg-rattan text-ivory text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-sandstone mb-4 font-medium">
              {cta.subtitle}
            </p>
            <h2
              className="text-4xl md:text-6xl font-light mb-6 leading-tight"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              {cta.titlePart1}
              <br />
              <em className="not-italic text-sandstone">{cta.titleHighlight}</em>
            </h2>
            <p className="text-base text-ivory/70 leading-relaxed mb-10 max-w-md mx-auto">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('quote')}
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-rattan bg-sandstone hover:bg-ivory px-8 py-4 transition-all duration-300 shadow-md"
              >
                {cta.quoteBtn}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-ivory border border-ivory/30 px-8 py-4 hover:border-ivory hover:bg-ivory/10 transition-colors duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {cta.waBtn}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
