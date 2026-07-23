import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Gallery from './pages/Gallery'
import RequestQuote from './pages/RequestQuote'
import Admin from './pages/Admin'
import { useSiteStore } from './data/useSiteStore'
import type { Category, Product } from './data'

export type Page = 'home' | 'about' | 'catalog' | 'gallery' | 'quote' | 'admin'

export interface NavigateOptions {
  category?: 'All' | Category
  product?: Product
}

function getPageFromPath(path: string): Page {
  const normalized = path.toLowerCase().replace(/\/$/, '')
  if (normalized === '/admin') return 'admin'
  if (normalized === '/about') return 'about'
  if (normalized === '/catalog') return 'catalog'
  if (normalized === '/gallery') return 'gallery'
  if (normalized === '/quote') return 'quote'
  return 'home'
}

function getPathFromPage(p: Page): string {
  if (p === 'admin') return '/admin'
  if (p === 'about') return '/about'
  if (p === 'catalog') return '/catalog'
  if (p === 'gallery') return '/gallery'
  if (p === 'quote') return '/quote'
  return '/'
}

export default function App() {
  const [page, setPage] = useState<Page>(() => getPageFromPath(window.location.pathname))
  const [catalogCategory, setCatalogCategory] = useState<'All' | Category>('All')
  const [catalogProduct, setCatalogProduct] = useState<Product | null>(null)
  const { data: siteData, updateSection, resetToDefault } = useSiteStore()

  const navigate = (p: Page, options?: NavigateOptions | Category | 'All') => {
    if (typeof options === 'string') {
      setCatalogCategory(options)
      setCatalogProduct(null)
    } else if (options && typeof options === 'object') {
      if (options.category) setCatalogCategory(options.category)
      if (options.product) setCatalogProduct(options.product)
    } else {
      setCatalogProduct(null)
    }

    setPage(p)
    const targetPath = getPathFromPage(p)
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath)
    }
  }

  // Handle browser Back / Forward buttons & direct URL changes
  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath(window.location.pathname))
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Sync browser favicon, title, and meta tags dynamically per page for SEO
  useEffect(() => {
    const brandName = siteData?.contactInfo?.brandName || 'Kinawa'
    const brandSub = siteData?.contactInfo?.brandSub || 'Furniture'
    const brandTitle = `${brandName} ${brandSub}`

    let pageTitle = `${brandTitle} — Handcrafted Rattan & Wooden Furniture`
    if (page === 'about') pageTitle = `About Us — ${brandTitle}`
    if (page === 'catalog') pageTitle = `Furniture Catalog — ${brandTitle}`
    if (page === 'gallery') pageTitle = `Project Portfolio & Gallery — ${brandTitle}`
    if (page === 'quote') pageTitle = `Request a Custom Quote — ${brandTitle}`
    if (page === 'admin') pageTitle = `Admin Dashboard — ${brandTitle}`

    document.title = pageTitle

    const faviconUrl = siteData?.contactInfo?.faviconUrl
    let link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]')
    if (faviconUrl) {
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = faviconUrl
    } else if (link) {
      link.href = '/favicon.svg'
    }
  }, [page, siteData?.contactInfo?.brandName, siteData?.contactInfo?.brandSub, siteData?.contactInfo?.faviconUrl])

  // Inject JSON-LD Schema.org structured data for SEO
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'FurnitureStore',
      name: siteData?.contactInfo.brandName || 'Kinawa Furniture',
      description: 'Custom rattan and wooden furniture for homes, hotels, cafés, and resorts. Handcrafted in Jepara, Indonesia.',
      telephone: siteData?.contactInfo.phoneDisplay || '+62 877-8830-4421',
      email: siteData?.contactInfo.email || 'info@kinawafurniture.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteData?.contactInfo.address || 'Jl. Raya Jepara-Kudus Km 12',
        addressLocality: 'Jepara',
        addressRegion: 'Jawa Tengah',
        country: 'Indonesia',
      },
      url: window.location.origin,
      sameAs: [siteData?.contactInfo.instagramUrl].filter(Boolean),
    }

    let scriptTag = document.getElementById('jsonld-schema')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'jsonld-schema'
      scriptTag.setAttribute('type', 'application/ld+json')
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(schemaData)
  }, [siteData])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between font-sans">
      {page !== 'admin' && <Nav currentPage={page} onNavigate={navigate} siteData={siteData} />}

      <main className="flex-grow">
        {page === 'home' && <Home onNavigate={navigate} siteData={siteData} />}
        {page === 'about' && <About onNavigate={navigate} siteData={siteData} />}
        {page === 'catalog' && (
          <Catalog
            onNavigate={navigate}
            siteData={siteData}
            initialCategory={catalogCategory}
            initialProduct={catalogProduct}
          />
        )}
        {page === 'gallery' && <Gallery siteData={siteData} />}
        {page === 'quote' && <RequestQuote siteData={siteData} />}
        {page === 'admin' && (
          <Admin
            data={siteData}
            onSave={(newData) => {
              Object.keys(newData).forEach((key) => {
                const k = key as keyof typeof newData
                updateSection(k, newData[k])
              })
            }}
            onReset={resetToDefault}
            onNavigate={navigate}
          />
        )}
      </main>

      {page !== 'admin' && <Footer onNavigate={navigate} siteData={siteData} />}
    </div>
  )
}
