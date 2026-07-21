import { useState, useEffect } from 'react'
import type { Page } from '../App'
import type { SiteData } from '../data/useSiteStore'

interface NavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  siteData?: SiteData
}

const links: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Catalog', page: 'catalog' },
  { label: 'Projects', page: 'gallery' },
]

export default function Nav({ currentPage, onNavigate, siteData }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const brandName = siteData?.contactInfo.brandName || 'Kinawa'
  const brandSub = siteData?.contactInfo.brandSub || 'Furniture'
  const logoUrl = siteData?.contactInfo.logoUrl || ''
  const waUrl = siteData?.contactInfo.whatsappUrl || 'https://wa.me/6287788304421'
  const phoneDisplay = siteData?.contactInfo.phoneDisplay || '+62 877-8830-4421'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [currentPage])

  const navigate = (page: Page) => {
    onNavigate(page)
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-ivory/96 backdrop-blur-md border-b border-sandstone/15 py-4 shadow-sm'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-3 group"
            aria-label="Home"
          >
            {logoUrl ? (
              /* Logo image + brand text side by side */
              <>
                <img
                  src={logoUrl}
                  alt={`${brandName} ${brandSub}`}
                  className="h-9 sm:h-11 w-auto object-contain transition-opacity group-hover:opacity-80"
                />
                <div className="w-px h-7 bg-current opacity-15 hidden sm:block" />
                <div className="flex flex-col leading-none text-left hidden sm:flex">
                  <span
                    className="text-base font-semibold tracking-[0.18em] uppercase text-rattan group-hover:text-sandstone transition-colors"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {brandName}
                  </span>
                  <span className="text-[8px] tracking-[0.32em] uppercase text-sandstone font-medium mt-0.5">
                    {brandSub}
                  </span>
                </div>
              </>
            ) : (
              /* Text-only logo when no image uploaded */
              <div className="flex flex-col leading-none text-left">
                <span
                  className="font-display text-xl sm:text-2xl font-semibold tracking-[0.15em] uppercase text-rattan group-hover:text-sandstone transition-colors"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  {brandName}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-sandstone font-body font-medium">
                  {brandSub}
                </span>
              </div>
            )}

          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-9">
            {links.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 relative group ${
                  currentPage === page ? 'text-sandstone font-semibold' : 'text-charcoal hover:text-sandstone'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-sandstone transition-all duration-300 ${
                    currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('quote')}
              className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-ivory bg-rattan hover:bg-charcoal px-5 py-2.5 transition-all duration-200 shadow-sm hover:shadow"
            >
              Request a Quote
            </button>

            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-rattan/10 hover:bg-rattan text-rattan hover:text-ivory flex items-center justify-center transition-all duration-300"
              aria-label="Chat on WhatsApp"
              title={`Chat on WhatsApp: ${phoneDisplay}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 text-charcoal border border-charcoal/10 rounded-lg p-2"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-[2px] bg-current transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
              <span className={`block w-5 h-[2px] bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-current transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-ivory pt-24 flex flex-col px-6 py-8 md:hidden animate-fade-in">
          {/* Mobile logo */}
          {logoUrl && (
            <div className="mb-6">
              <img src={logoUrl} alt={brandName} className="h-12 w-auto object-contain" />
            </div>
          )}
          <nav className="flex flex-col gap-6 mt-4">
            {links.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`text-left text-2xl font-display font-light tracking-wide transition-colors ${
                  currentPage === page ? 'text-sandstone font-medium' : 'text-charcoal'
                }`}
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate('quote')}
              className="text-left text-2xl font-display font-light tracking-wide text-rattan font-medium"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Request a Quote →
            </button>
          </nav>

          <div className="mt-auto pt-6 border-t border-charcoal/10 text-sm text-charcoal/70 space-y-2">
            <a href={waUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-rattan font-medium">
              <span>WhatsApp: {phoneDisplay}</span>
            </a>
            <p className="text-xs text-charcoal/50">{siteData?.contactInfo.email}</p>
          </div>
        </div>
      )}
    </>
  )
}
