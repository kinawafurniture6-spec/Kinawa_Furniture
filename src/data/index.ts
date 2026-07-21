export type Category = 'Chairs' | 'Tables' | 'Cabinets' | 'Decor'
export type Material = 'Rattan' | 'Wood' | 'Mixed'
export type ProjectType = 'Residential' | 'Hotel' | 'Café' | 'Restaurant'

export interface Product {
  id: string
  name: string
  category: Category
  material: Material
  price: string
  image: string
  images: string[]
  description: string
  dimensions: string
  finish: string
  customAvailable: boolean
  featured?: boolean
}

export interface Project {
  id: string
  title: string
  type: ProjectType
  location: string
  image: string
  products: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  project: string
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Weave Lounge Chair',
    category: 'Chairs',
    material: 'Rattan',
    price: 'Rp 3.800.000',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=720&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&h=1080&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=1080&fit=crop&auto=format',
    ],
    description:
      'Handwoven rattan lounge chair with sustainably sourced teak frame. Each piece takes three full days to complete by our master craftsmen. The tight weave pattern ensures durability without sacrificing its natural, airy character.',
    dimensions: '70 × 80 × 85 cm (W × D × H)',
    finish: 'Natural / Walnut Stain / Ebony',
    customAvailable: true,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Sundara Armchair',
    category: 'Chairs',
    material: 'Rattan',
    price: 'Rp 2.900.000',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=720&fit=crop&auto=format',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=1080&fit=crop&auto=format'],
    description:
      'Classic rattan armchair with wide-back open weave. The broad seat and generous arms make it ideal for indoor reading nooks or covered outdoor terraces.',
    dimensions: '65 × 75 × 90 cm (W × D × H)',
    finish: 'Natural / Honey / Dark Brown',
    customAvailable: true,
    featured: true,
  },
  {
    id: 'p3',
    name: 'Teak Coffee Table',
    category: 'Tables',
    material: 'Wood',
    price: 'Rp 4.200.000',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=720&fit=crop&auto=format',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=1080&fit=crop&auto=format'],
    description:
      'Solid teak coffee table finished with natural Danish oil. Each piece showcases unique wood grain — no two are alike. Perfectly paired with rattan seating.',
    dimensions: '120 × 60 × 45 cm (W × D × H)',
    finish: 'Natural Oil / Matte Lacquer',
    customAvailable: true,
    featured: true,
  },
  {
    id: 'p4',
    name: 'Rattan Dining Set',
    category: 'Tables',
    material: 'Mixed',
    price: 'Price on Request',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&h=720&fit=crop&auto=format',
    images: ['https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=900&h=1080&fit=crop&auto=format'],
    description:
      'Rattan dining table with solid teak top and four matching chairs. Available in any size for hospitality projects. Standard dimension seats 4–6 comfortably.',
    dimensions: 'Custom / Standard 160 × 80 × 75 cm',
    finish: 'Natural Rattan + Teak Top',
    customAvailable: true,
    featured: true,
  },
  {
    id: 'p5',
    name: 'Bamboo Storage Cabinet',
    category: 'Cabinets',
    material: 'Wood',
    price: 'Rp 5.600.000',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&h=720&fit=crop&auto=format',
    images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&h=1080&fit=crop&auto=format'],
    description:
      'Three-door storage cabinet with woven rattan panel fronts and solid mindi wood frame. Adjustable interior shelving. A statement piece for any living room or bedroom.',
    dimensions: '150 × 45 × 180 cm (W × D × H)',
    finish: 'Natural / Walnut',
    customAvailable: true,
  },
  {
    id: 'p6',
    name: 'Woven Wall Mirror',
    category: 'Decor',
    material: 'Rattan',
    price: 'Rp 890.000',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=720&fit=crop&auto=format',
    images: ['https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&h=1080&fit=crop&auto=format'],
    description:
      'Round wall mirror with handwoven rattan frame, 70 cm diameter. The layered weave adds depth and texture to any wall. Ready to hang.',
    dimensions: 'Ø 70 cm',
    finish: 'Natural',
    customAvailable: false,
  },
  {
    id: 'p7',
    name: 'Bistro Side Chair',
    category: 'Chairs',
    material: 'Rattan',
    price: 'Rp 1.600.000',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&h=720&fit=crop&auto=format',
    images: ['https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&h=1080&fit=crop&auto=format'],
    description:
      'Lightweight bistro side chair with natural rattan seat and powder-coated steel legs. Stackable design for easy storage. Perfect for cafés and outdoor dining areas.',
    dimensions: '45 × 50 × 88 cm (W × D × H)',
    finish: 'Natural / White Wash',
    customAvailable: true,
  },
  {
    id: 'p8',
    name: 'Rattan Floor Lamp',
    category: 'Decor',
    material: 'Rattan',
    price: 'Rp 1.200.000',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=720&fit=crop&auto=format',
    images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=900&h=1080&fit=crop&auto=format'],
    description:
      'Floor lamp with handwoven rattan drum shade. Casts a warm, diffused glow that amplifies the natural ambiance of any space.',
    dimensions: 'Ø 45 cm shade, 165 cm height',
    finish: 'Natural',
    customAvailable: false,
    featured: true,
  },
]

export const projects: Project[] = [
  {
    id: 'pr1',
    title: 'The Langit Villa',
    type: 'Hotel',
    location: 'Ubud, Bali',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&h=600&fit=crop&auto=format',
    products: 'Weave Lounge Chairs, Teak Coffee Tables, Woven Mirrors',
  },
  {
    id: 'pr2',
    title: 'Rimba Café',
    type: 'Café',
    location: 'Seminyak, Bali',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop&auto=format',
    products: 'Bistro Side Chairs, Rattan Dining Tables, Floor Lamps',
  },
  {
    id: 'pr3',
    title: 'Private Residence',
    type: 'Residential',
    location: 'South Jakarta',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&auto=format',
    products: 'Full Living Room Set, Bamboo Cabinet',
  },
  {
    id: 'pr4',
    title: 'Kayu Restaurant',
    type: 'Restaurant',
    location: 'Canggu, Bali',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format',
    products: 'Rattan Dining Sets × 14, Custom Bar Stools',
  },
  {
    id: 'pr5',
    title: 'Sunrise Boutique Hotel',
    type: 'Hotel',
    location: 'Lombok',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop&auto=format',
    products: 'Room Furniture Sets × 22, Lobby Lounge Chairs',
  },
  {
    id: 'pr6',
    title: 'The Garden House',
    type: 'Residential',
    location: 'Bandung',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&auto=format',
    products: 'Outdoor Dining Set, Sundara Armchairs × 4',
  },
]

export const companyInfo = {
  name: 'Kinawa Furniture',
  tagline: 'Rattan & Wooden Furniture',
  phoneDisplay: '+62 877-8830-4421',
  phoneRaw: '6287788304421',
  whatsappUrl: 'https://wa.me/6287788304421',
  email: 'info@kinawafurniture.com',
  address: 'Jl. Raya Jepara-Kudus Km 12, Tahunan, Jepara, Jawa Tengah 59427',
  instagramUrl: 'https://instagram.com/kinawafurniture',
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      "The quality exceeded every expectation. Our guests constantly compliment the furniture — it photographs beautifully and holds up to daily hotel use without any compromise.",
    author: 'Aditya Kusuma',
    role: 'General Manager',
    project: 'The Langit Villa, Ubud',
  },
  {
    id: 't2',
    quote:
      "Working with Kinawa Furniture for our café was seamless. They understood our aesthetic immediately, delivered custom dimensions, and the finish is exactly what we envisioned.",
    author: 'Sari Wulandari',
    role: 'Owner',
    project: 'Rimba Café, Seminyak',
  },
  {
    id: 't3',
    quote:
      "I furnished my entire living room and the attention to detail is remarkable. Natural materials, honest construction — this furniture will be in the family for decades.",
    author: 'Budi Santoso',
    role: 'Homeowner',
    project: 'Private Residence, Jakarta',
  },
]

export const categories = [
  {
    name: 'Chairs' as Category,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=700&fit=crop&auto=format',
    count: 12,
  },
  {
    name: 'Tables' as Category,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=700&fit=crop&auto=format',
    count: 8,
  },
  {
    name: 'Cabinets' as Category,
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&h=700&fit=crop&auto=format',
    count: 5,
  },
  {
    name: 'Decor' as Category,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=700&fit=crop&auto=format',
    count: 14,
  },
]

