import { useState, useEffect } from 'react'
import {
  products as defaultProducts,
  projects as defaultProjects,
  testimonials as defaultTestimonials,
  categories as defaultCategories,
  companyInfo as defaultCompanyInfo,
  type Product,
  type Project,
} from './index'

export interface SiteData {
  hero: {
    tagline: string
    titlePart1: string
    titleHighlight: string
    titlePart2: string
    description: string
    exploreBtnText: string
    quoteBtnText: string
    stats: { num: string; label: string }[]
    slides: { image: string; title: string; category: string }[]
  }
  brandQuote: {
    quote: string
  }
  categoriesSection: {
    subtitle: string
    title: string
    items: { name: string; image: string; count: number }[]
  }
  featuredSection: {
    subtitle: string
    title: string
    btnText: string
  }
  ourProcess: {
    subtitle: string
    title: string
    desc1: string
    desc2: string
    image: string
    badgeNumber: string
    badgeLabel: string
    materials: { title: string; desc: string }[]
  }
  featuredProjectsSection: {
    subtitle: string
    title: string
    btnText: string
  }
  testimonialsSection: {
    subtitle: string
    title: string
    items: { id: string; quote: string; author: string; role: string; project: string }[]
  }
  ctaBanner: {
    subtitle: string
    titlePart1: string
    titleHighlight: string
    description: string
    quoteBtn: string
    waBtn: string
  }
  aboutPage: {
    subtitle: string
    titlePart1: string
    titlePart2: string
    titleHighlight: string
    heroImage: string
    storyTitle: string
    storyP1: string
    storyP2: string
    storyP3: string
    storyImage: string
    values: { title: string; desc: string }[]
  }
  catalogPage: {
    subtitle: string
    title: string
    description: string
  }
  galleryPage: {
    subtitle: string
    title: string
    description: string
  }
  requestQuotePage: {
    subtitle: string
    title: string
    description: string
  }
  contactInfo: {
    brandName: string
    brandSub: string
    brandDesc: string
    logoUrl: string
    faviconUrl: string
    phoneDisplay: string
    phoneRaw: string
    whatsappUrl: string
    email: string
    address: string
    instagramUrl: string
    copyright: string
    adminPassword?: string
  }
  products: Product[]
  projects: Project[]
}

export const defaultSiteData: SiteData = {
  hero: {
    tagline: 'Rattan & Wooden Furniture · Est. 2012',
    titlePart1: 'Crafted',
    titleHighlight: 'by Hand,',
    titlePart2: 'Built to Last.',
    description:
      'Custom rattan and wooden furniture for homes, hotels, cafés, and resorts. Every piece made to order — built around your space and your vision.',
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
      {
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&h=1200&fit=crop&auto=format',
        title: 'Sundara Armchair',
        category: 'Natural Teak & Weave',
      },
      {
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&h=1200&fit=crop&auto=format',
        title: 'Teak Coffee Table',
        category: 'Solid Wood Crafts',
      },
      {
        image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1000&h=1200&fit=crop&auto=format',
        title: 'Bamboo Storage Cabinet',
        category: 'Custom Living Series',
      },
    ],
  },
  brandQuote: {
    quote:
      '"Every piece of rattan tells the story of the craftsman who shaped it — woven with patience, finished with pride, built for generations."',
  },
  categoriesSection: {
    subtitle: 'What We Make',
    title: 'Shop by Category',
    items: defaultCategories,
  },
  featuredSection: {
    subtitle: 'Handpicked for You',
    title: 'Featured Collection',
    btnText: 'View Full Catalog',
  },
  ourProcess: {
    subtitle: 'Our Process',
    title: 'Where Every Strand Has a Purpose',
    desc1:
      'Our craftsmen begin each piece by hand-selecting rattan poles of uniform thickness, dried in the open air over 30 days. The weaving process itself can take up to three full days for a single chair — each knot tied precisely, each pattern repeated without template.',
    desc2:
      "The result is furniture that doesn't just furnish a room — it anchors it. Every custom order is treated as a new design challenge, and our craftsmen take personal pride in every piece that leaves the workshop.",
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=700&h=875&fit=crop&auto=format',
    badgeNumber: '12+',
    badgeLabel: 'Years of craft',
    materials: [
      { title: 'Rattan', desc: 'Ethically sourced from Kalimantan' },
      { title: 'Teak', desc: 'FSC-certified plantation wood' },
      { title: 'Finishing', desc: 'Non-toxic oil & water-based lacquer' },
    ],
  },
  featuredProjectsSection: {
    subtitle: 'Real Spaces',
    title: 'Featured Projects',
    btnText: 'View All Projects →',
  },
  testimonialsSection: {
    subtitle: 'Client Voices',
    title: 'Trusted by Designers & Owners',
    items: defaultTestimonials,
  },
  ctaBanner: {
    subtitle: 'Start a Conversation',
    titlePart1: 'Ready to Create Something',
    titleHighlight: 'Lasting?',
    description:
      "Tell us about your space. We'll design and craft furniture that feels like it was always meant to be there.",
    quoteBtn: 'Request a Quote',
    waBtn: 'Chat on WhatsApp',
  },
  aboutPage: {
    subtitle: 'Our Story',
    titlePart1: 'Built on Craft,',
    titlePart2: 'Rooted in',
    titleHighlight: 'Nature.',
    heroImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&h=685&fit=crop&auto=format',
    storyTitle: 'From a Small Workshop in Jepara, 2012',
    storyP1:
      'Kinawa Furniture started with a single craftsman, one workshop, and a clear belief: that furniture made by hand — from materials grown in Indonesian soil — could compete with anything imported. That conviction hasn\'t changed.',
    storyP2:
      "Over the past twelve years, we've grown to a team of fifteen master craftsmen, fulfilled over 300 custom orders, and furnished everything from private Jakarta apartments to boutique resorts in Bali and Lombok. Every project, regardless of scale, receives the same level of attention.",
    storyP3:
      'We still work the same way we did in 2012: you come to us with a vision, we listen, sketch, sample, and build — entirely by hand. No two pieces are identical. That is the point.',
    storyImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=875&fit=crop&auto=format',
    values: [
      {
        title: 'Handcrafted',
        desc: 'Every joint, every weave, every finish is done by hand. No shortcuts, no mass production. Our craftsmen take personal ownership of each piece.',
      },
      {
        title: 'Natural Materials',
        desc: 'We source rattan from ethically managed forests in Kalimantan and use FSC-certified teak from plantation growers. Materials chosen to age beautifully.',
      },
      {
        title: 'Built to Endure',
        desc: 'Our furniture is designed for decades of use. We use traditional joinery techniques combined with modern finishing to ensure structural integrity over time.',
      },
      {
        title: 'Made to Order',
        desc: "Every piece is custom — your dimensions, your finish, your vision. We don't manufacture to stock because we believe furniture should fit your life, not the other way around.",
      },
    ],
  },
  catalogPage: {
    subtitle: 'Handcrafted Furniture',
    title: 'Our Catalog',
    description:
      'All pieces available in custom dimensions and finishes. Contact us for hospitality and bulk project pricing.',
  },
  galleryPage: {
    subtitle: 'Portofolio',
    title: 'Project Gallery',
    description:
      'Selected residential, hotel, café, and restaurant installations featuring custom Kinawa Furniture pieces.',
  },
  requestQuotePage: {
    subtitle: 'Custom Orders',
    title: 'Request a Quote',
    description:
      'Tell us about your project requirements. We respond with initial estimates and material specifications within 24 hours.',
  },
  contactInfo: {
    brandName: defaultCompanyInfo.name,
    brandSub: defaultCompanyInfo.tagline,
    brandDesc: 'Custom rattan & wooden furniture handcrafted in Jepara, Indonesia. Made to order for homes, hotels, cafés, and resorts worldwide.',
    logoUrl: '',
    faviconUrl: '',
    phoneDisplay: defaultCompanyInfo.phoneDisplay,
    phoneRaw: defaultCompanyInfo.phoneRaw,
    whatsappUrl: defaultCompanyInfo.whatsappUrl,
    email: defaultCompanyInfo.email,
    address: defaultCompanyInfo.address,
    instagramUrl: defaultCompanyInfo.instagramUrl,
    copyright: 'Kinawa Furniture. All rights reserved.',
    adminPassword: 'kinawafurniture',
  },
  products: defaultProducts,
  projects: defaultProjects,
}

const LOCAL_STORAGE_KEY = 'kinawa_furniture_site_store_v1'

export function useSiteStore() {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SiteData>
        // Deep-merge with defaults so any new fields added after initial save
        // are always present (prevents undefined crashes on new fields like logoUrl, faviconUrl, brandDesc)
        return {
          ...defaultSiteData,
          ...parsed,
          // Shallow-merge nested objects so new sub-keys get default values
          hero: { ...defaultSiteData.hero, ...parsed.hero },
          brandQuote: { ...defaultSiteData.brandQuote, ...parsed.brandQuote },
          categoriesSection: { ...defaultSiteData.categoriesSection, ...parsed.categoriesSection },
          featuredSection: { ...defaultSiteData.featuredSection, ...parsed.featuredSection },
          ourProcess: { ...defaultSiteData.ourProcess, ...parsed.ourProcess },
          featuredProjectsSection: { ...defaultSiteData.featuredProjectsSection, ...parsed.featuredProjectsSection },
          testimonialsSection: { ...defaultSiteData.testimonialsSection, ...parsed.testimonialsSection },
          ctaBanner: { ...defaultSiteData.ctaBanner, ...parsed.ctaBanner },
          aboutPage: { ...defaultSiteData.aboutPage, ...parsed.aboutPage },
          catalogPage: { ...defaultSiteData.catalogPage, ...parsed.catalogPage },
          galleryPage: { ...defaultSiteData.galleryPage, ...parsed.galleryPage },
          requestQuotePage: { ...defaultSiteData.requestQuotePage, ...parsed.requestQuotePage },
          // contactInfo merge ensures logoUrl, faviconUrl, brandDesc always exist
          contactInfo: { ...defaultSiteData.contactInfo, ...parsed.contactInfo },
        } as SiteData
      }
    } catch (e) {
      console.error('Error loading site data from localStorage:', e)
    }
    return defaultSiteData
  })

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving site data to localStorage:', e)
    }
  }, [data])

  const updateSection = <K extends keyof SiteData>(section: K, newData: SiteData[K]) => {
    setData((prev) => ({
      ...prev,
      [section]: newData,
    }))
  }

  const resetToDefault = () => {
    setData(defaultSiteData)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return {
    data,
    setData,
    updateSection,
    resetToDefault,
  }
}
