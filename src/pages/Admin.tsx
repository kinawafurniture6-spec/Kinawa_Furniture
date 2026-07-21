import { useRef, useState, useEffect } from 'react'
import type { SiteData } from '../data/useSiteStore'
import type { Product, Project, Category, Material } from '../data'
import ImageUploadField from '../components/ImageUploadField'

/* ─────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────*/
interface AdminProps {
  data: SiteData
  onSave: (newData: SiteData) => void
  onReset: () => void
  onNavigate: (page: any) => void
}

type Tab =
  | 'hero'
  | 'content'
  | 'catalog'
  | 'gallery'
  | 'about'
  | 'pages'
  | 'contact'

/* ─────────────────────────────────────────────
   SMALL HELPERS
──────────────────────────────────────────────*/
const Field = ({
  label,
  children,
  className = '',
}: {
  label: string
  children: React.ReactNode
  className?: string
}) => (
  <div className={className}>
    <label className="block text-[10px] tracking-[0.18em] uppercase font-semibold text-stone-500 mb-1.5">
      {label}
    </label>
    {children}
  </div>
)

const inputCls =
  'w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-amber-700 transition-colors placeholder:text-stone-300'
const textareaCls =
  'w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-amber-700 transition-colors placeholder:text-stone-300 resize-none'
const selectCls =
  'w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-amber-700 transition-colors'

function Card({
  title,
  badge,
  children,
}: {
  title: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white border border-stone-200 shadow-sm">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100 bg-stone-50/50">
        {badge && (
          <span className="text-[9px] tracking-[0.2em] uppercase font-bold bg-amber-700 text-white px-2 py-0.5">
            {badge}
          </span>
        )}
        <h3
          className="text-base font-medium text-stone-800"
          style={{ fontFamily: 'Fraunces, Georgia, serif' }}
        >
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-stone-200" />
      <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-stone-400">
        {title}
      </span>
      <div className="h-px flex-1 bg-stone-200" />
    </div>
  )
}

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200)
    return () => clearTimeout(t)
  }, [msg, onClose])
  return (
    <div className="fixed bottom-8 right-6 z-50 flex items-center gap-3 bg-stone-900 text-white px-5 py-3.5 shadow-2xl border-l-4 border-amber-500 animate-slide-in-right">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-amber-400 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-sm font-medium">{msg}</span>
      <button onClick={onClose} className="ml-2 text-white/40 hover:text-white">✕</button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PRODUCT MODAL
──────────────────────────────────────────────*/
function ProductModal({
  product,
  isNew,
  onSave,
  onCancel,
}: {
  product: Product
  isNew: boolean
  onSave: (p: Product) => void
  onCancel: () => void
}) {
  const [p, setP] = useState<Product>(product)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const set = (field: keyof Product, val: any) => setP((prev) => ({ ...prev, [field]: val }))

  return (
    <div ref={ref} className="bg-amber-50 border border-amber-200 p-6 mb-6 shadow-inner">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-lg font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          {isNew ? '+ Tambah Produk Baru' : `Edit: ${p.name}`}
        </h4>
        <button onClick={onCancel} className="text-stone-400 hover:text-stone-700 text-lg leading-none">✕</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Nama Produk" className="lg:col-span-2">
          <input className={inputCls} value={p.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Weave Lounge Chair" />
        </Field>
        <Field label="Harga (Rp)">
          <input className={inputCls} value={p.price} onChange={(e) => set('price', e.target.value)} placeholder="e.g. Rp 2.500.000" />
        </Field>
        <Field label="Kategori">
          <select className={selectCls} value={p.category} onChange={(e) => set('category', e.target.value as Category)}>
            <option value="Chairs">Chairs</option>
            <option value="Tables">Tables</option>
            <option value="Cabinets">Cabinets</option>
            <option value="Decor">Decor</option>
          </select>
        </Field>
        <Field label="Material">
          <select className={selectCls} value={p.material} onChange={(e) => set('material', e.target.value as Material)}>
            <option value="Rattan">Rattan</option>
            <option value="Wood">Wood</option>
            <option value="Mixed">Mixed</option>
          </select>
        </Field>
        <Field label="Finish">
          <input className={inputCls} value={p.finish} onChange={(e) => set('finish', e.target.value)} placeholder="e.g. Natural Oil" />
        </Field>
        <Field label="Dimensi">
          <input className={inputCls} value={p.dimensions} onChange={(e) => set('dimensions', e.target.value)} placeholder="e.g. 60 × 60 × 80 cm" />
        </Field>

        {/* Main Product Image */}
        <ImageUploadField
          label="Foto Utama Produk"
          value={p.image}
          onChange={(url) => {
            set('image', url)
            if (!p.images || p.images.length === 0) {
              set('images', [url])
            }
          }}
          maxWidthPx={900}
          maxHeightPx={1100}
          quality={0.85}
          aspectHint="Portrait 3:4"
          className="md:col-span-2 lg:col-span-3"
        />

        {/* Gallery Additional Images (Upload Slots & URL Input) */}
        <div className="md:col-span-2 lg:col-span-3 bg-white p-4 border border-stone-200 space-y-4">
          <p className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
            Galeri Foto Tambahan Produk (Multi-Gambar)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ImageUploadField
              label="Foto Galeri 2"
              value={p.images?.[1] || ''}
              onChange={(url) => {
                const copy = [...(p.images || [p.image])]
                copy[1] = url
                set('images', copy.filter(Boolean))
              }}
              maxWidthPx={900}
              maxHeightPx={1100}
              quality={0.85}
              aspectHint="Galeri Foto 2"
            />
            <ImageUploadField
              label="Foto Galeri 3"
              value={p.images?.[2] || ''}
              onChange={(url) => {
                const copy = [...(p.images || [p.image])]
                copy[2] = url
                set('images', copy.filter(Boolean))
              }}
              maxWidthPx={900}
              maxHeightPx={1100}
              quality={0.85}
              aspectHint="Galeri Foto 3"
            />
            <ImageUploadField
              label="Foto Galeri 4"
              value={p.images?.[3] || ''}
              onChange={(url) => {
                const copy = [...(p.images || [p.image])]
                copy[3] = url
                set('images', copy.filter(Boolean))
              }}
              maxWidthPx={900}
              maxHeightPx={1100}
              quality={0.85}
              aspectHint="Galeri Foto 4"
            />
          </div>

          <Field label="URL Foto Tambahan Lainnya (pisahkan dengan koma)">
            <textarea
              className={textareaCls}
              rows={2}
              value={(p.images || []).join(', ')}
              onChange={(e) =>
                set('images', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))
              }
              placeholder="https://url1.jpg, https://url2.jpg"
            />
          </Field>
        </div>

        <Field label="Deskripsi Produk" className="md:col-span-2 lg:col-span-3">
          <textarea
            className={textareaCls}
            rows={3}
            value={p.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Ceritakan detail produk, keunggulan bahan, dan fitur utamanya..."
          />
        </Field>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-amber-700" checked={p.featured} onChange={(e) => set('featured', e.target.checked)} />
            <span className="text-sm text-stone-600 font-medium">Featured (Tampil di Home)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-amber-700" checked={p.customAvailable} onChange={(e) => set('customAvailable', e.target.checked)} />
            <span className="text-sm text-stone-600 font-medium">Custom Available</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-amber-200">
        <button
          onClick={() => onSave(p)}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-white bg-amber-700 hover:bg-amber-800 px-6 py-2.5 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Simpan Produk
        </button>
        <button onClick={onCancel} className="text-[11px] tracking-[0.15em] uppercase font-semibold text-stone-500 hover:text-stone-800 px-6 py-2.5 border border-stone-300 transition-colors">
          Batal
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PROJECT MODAL
──────────────────────────────────────────────*/
function ProjectModal({
  project,
  isNew,
  onSave,
  onCancel,
}: {
  project: Project
  isNew: boolean
  onSave: (p: Project) => void
  onCancel: () => void
}) {
  const [p, setP] = useState<Project>(project)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const set = (field: keyof Project, val: any) => setP((prev) => ({ ...prev, [field]: val }))

  return (
    <div ref={ref} className="bg-amber-50 border border-amber-200 p-6 mb-6 shadow-inner">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-lg font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          {isNew ? '+ Tambah Proyek Baru' : `Edit: ${p.title}`}
        </h4>
        <button onClick={onCancel} className="text-stone-400 hover:text-stone-700 text-lg leading-none">✕</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Judul Proyek" className="md:col-span-2">
          <input className={inputCls} value={p.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Villa Alas Harum Resort" />
        </Field>
        <Field label="Tipe Proyek">
          <select className={selectCls} value={p.type} onChange={(e) => set('type', e.target.value as any)}>
            <option value="Hotel">Hotel</option>
            <option value="Café">Café</option>
            <option value="Residential">Residential</option>
            <option value="Restaurant">Restaurant</option>
          </select>
        </Field>
        <Field label="Lokasi">
          <input className={inputCls} value={p.location} onChange={(e) => set('location', e.target.value)} placeholder="e.g. Ubud, Bali" />
        </Field>

        <ImageUploadField
          label="Foto Proyek"
          value={p.image}
          onChange={(url) => set('image', url)}
          maxWidthPx={1200}
          maxHeightPx={900}
          quality={0.85}
          aspectHint="Landscape 4:3"
          className="md:col-span-2"
        />

        <Field label="Produk Terkait yang Digunakan" className="md:col-span-2">
          <input className={inputCls} value={p.products} onChange={(e) => set('products', e.target.value)} placeholder="e.g. Weave Lounge Chairs, Teak Coffee Table × 4" />
        </Field>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-amber-200">
        <button
          onClick={() => onSave(p)}
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-white bg-amber-700 hover:bg-amber-800 px-6 py-2.5 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Simpan Proyek
        </button>
        <button onClick={onCancel} className="text-[11px] tracking-[0.15em] uppercase font-semibold text-stone-500 hover:text-stone-800 px-6 py-2.5 border border-stone-300 transition-colors">
          Batal
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN ADMIN COMPONENT
──────────────────────────────────────────────*/
export default function Admin({ data, onSave, onReset, onNavigate }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('kinawa_admin_authed') === 'true'
  })
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [activeTab, setActiveTab] = useState<Tab>('hero')
  const [site, setSite] = useState<SiteData>(data)
  const [toast, setToast] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<{ product: Product; isNew: boolean } | null>(null)
  const [editingProject, setEditingProject] = useState<{ project: Project; isNew: boolean } | null>(null)

  const notify = (msg: string) => setToast(msg)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const validPassword = site.contactInfo.adminPassword || 'kinawafurniture'
    if (passwordInput === validPassword) {
      sessionStorage.setItem('kinawa_admin_authed', 'true')
      setIsAuthenticated(true)
      setLoginError(false)
    } else {
      setLoginError(true)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('kinawa_admin_authed')
    setIsAuthenticated(false)
    setPasswordInput('')
  }

  const handleSave = () => {
    onSave(site)
    notify('Semua perubahan berhasil disimpan!')
  }

  const handleReset = () => {
    if (confirm('Reset semua konten ke data awal? Tindakan ini tidak bisa dibatalkan.')) {
      onReset()
      setSite(data)
      notify('Site dikembalikan ke data awal.')
    }
  }

  const update = (path: string[], value: any) => {
    setSite((prev) => {
      const copy = JSON.parse(JSON.stringify(prev))
      let curr: any = copy
      for (let i = 0; i < path.length - 1; i++) curr = curr[path[i]]
      curr[path[path.length - 1]] = value
      return copy
    })
  }

  const tabs: { key: Tab; icon: string; label: string }[] = [
    { key: 'hero', icon: '🏠', label: 'Hero & Slideshow' },
    { key: 'content', icon: '📝', label: 'Konten Home' },
    { key: 'catalog', icon: '🛍️', label: 'Katalog Produk' },
    { key: 'gallery', icon: '🖼️', label: 'Galeri Proyek' },
    { key: 'about', icon: '📖', label: 'Halaman About' },
    { key: 'pages', icon: '📄', label: 'Halaman Lainnya' },
    { key: 'contact', icon: '📞', label: 'Kontak & Brand' },
  ]

  const saveProduct = (p: Product) => {
    const exists = site.products.some((x) => x.id === p.id)
    const next = exists
      ? site.products.map((x) => (x.id === p.id ? p : x))
      : [...site.products, p]
    update(['products'], next)
    setEditingProduct(null)
    notify(exists ? `Produk "${p.name}" diperbarui.` : `Produk "${p.name}" ditambahkan!`)
  }

  const deleteProduct = (p: Product) => {
    if (!confirm(`Hapus produk "${p.name}"?`)) return
    update(['products'], site.products.filter((x) => x.id !== p.id))
    notify('Produk dihapus.')
  }

  const saveProject = (p: Project) => {
    const exists = site.projects.some((x) => x.id === p.id)
    const next = exists
      ? site.projects.map((x) => (x.id === p.id ? p : x))
      : [...site.projects, p]
    update(['projects'], next)
    setEditingProject(null)
    notify(exists ? `Proyek "${p.title}" diperbarui.` : `Proyek "${p.title}" ditambahkan!`)
  }

  const deleteProject = (p: Project) => {
    if (!confirm(`Hapus proyek "${p.title}"?`)) return
    update(['projects'], site.projects.filter((x) => x.id !== p.id))
    notify('Proyek dihapus.')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="w-full max-w-md bg-stone-800 border border-stone-700/80 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500 font-semibold block mb-2">
              Kinawa Furniture
            </span>
            <h1 className="text-3xl font-light text-white" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              Admin Control Panel
            </h1>
            <p className="text-xs text-stone-400 mt-2">
              Masukkan kata sandi untuk mengakses dashboard admin
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-stone-400 mb-2">
                Kata Sandi Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value)
                    if (loginError) setLoginError(false)
                  }}
                  placeholder="Masukkan kata sandi..."
                  autoFocus
                  className="w-full bg-stone-900 border border-stone-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-600 transition-colors pr-24"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-stone-400 hover:text-white text-xs font-medium"
                >
                  {showPassword ? '🔒 Sembunyi' : '👁️ Lihat'}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-red-400 mt-2.5 flex items-center gap-1.5 font-medium">
                  <span>⚠</span> Kata sandi salah. Silakan coba lagi.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white text-[11px] tracking-[0.2em] uppercase font-semibold py-3.5 transition-colors shadow-md"
            >
              Masuk Admin
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-700/60 flex items-center justify-between text-xs text-stone-400">
            <span>Pass default: <code className="text-amber-400 bg-stone-900 px-1.5 py-0.5 rounded font-mono text-[11px]">kinawafurniture</code></span>
            <button
              onClick={() => onNavigate('home')}
              className="text-stone-300 hover:text-white underline text-[11px] font-medium"
            >
              ← Web
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800" style={{ fontFamily: 'Inter, sans-serif' }}>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      {/* ── TOP HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3.5 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex flex-col leading-none">
              <span className="text-lg font-semibold tracking-[0.12em] uppercase text-amber-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                Kinawa
              </span>
              <span className="text-[8px] tracking-[0.28em] uppercase text-stone-400 font-semibold">CMS Control Panel</span>
            </div>
            <div className="h-6 w-px bg-stone-200" />
            <span className="text-xs tracking-[0.15em] uppercase text-stone-400 font-medium hidden sm:block">Admin Dashboard v2</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-semibold text-stone-600 hover:text-stone-900 border border-stone-300 hover:border-stone-500 px-4 py-2 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Lihat Website
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-semibold text-white bg-amber-700 hover:bg-amber-800 px-5 py-2 transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Simpan Semua
            </button>
            <button onClick={handleReset} className="text-[10px] tracking-[0.15em] uppercase font-medium text-red-500 hover:text-red-700 px-3 py-2 transition-colors" title="Reset ke data awal">
              Reset
            </button>
            <button
              onClick={handleLogout}
              className="text-[10px] tracking-[0.15em] uppercase font-semibold text-stone-600 hover:text-red-600 border border-stone-300 hover:border-red-300 px-3 py-2 transition-colors"
              title="Keluar dari Admin"
            >
              🚪 Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-[57px] min-h-screen">
        {/* ── SIDEBAR ── */}
        <aside className="w-60 shrink-0 bg-white border-r border-stone-200 fixed top-[57px] bottom-0 overflow-y-auto hidden md:block">
          <div className="py-6 px-3">
            <p className="text-[9px] tracking-[0.25em] uppercase text-stone-400 font-bold px-3 mb-3">Menu Pengaturan</p>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`w-full flex items-center gap-3 text-left px-3 py-2.5 mb-0.5 transition-all text-sm font-medium group ${
                  activeTab === t.key
                    ? 'bg-amber-50 text-amber-800 border-l-2 border-amber-700'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50 border-l-2 border-transparent'
                }`}
              >
                <span className="text-base leading-none">{t.icon}</span>
                <span className="leading-tight">{t.label}</span>
                {activeTab === t.key && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 ml-auto text-amber-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}

            <div className="mt-6 px-3">
              <div className="h-px bg-stone-200 mb-4" />
              <div className="bg-amber-50 border border-amber-200 p-3 text-xs text-amber-700 leading-relaxed">
                <p className="font-semibold mb-1">⚠️ Jangan lupa!</p>
                <p>Tekan <strong>Simpan Semua</strong> setelah selesai mengedit.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 md:ml-60 min-w-0">
          {/* Mobile tab bar */}
          <div className="md:hidden flex overflow-x-auto gap-1 bg-white border-b border-stone-200 px-3 py-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`shrink-0 flex items-center gap-1.5 text-[10px] tracking-wide uppercase font-semibold px-3 py-2 transition-colors whitespace-nowrap ${
                  activeTab === t.key ? 'bg-amber-700 text-white' : 'text-stone-500 bg-stone-100'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6 max-w-5xl space-y-6">

            {/* ════════════════ TAB: HERO & SLIDESHOW ════════════════ */}
            {activeTab === 'hero' && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <h2 className="text-xl font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Hero Section & Slideshow</h2>
                    <p className="text-xs text-stone-400 mt-0.5">Kelola teks hero, tombol CTA, statistik, dan gambar slideshow Ken Burns</p>
                  </div>
                </div>

                <Card title="Teks & CTA Hero" badge="1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Tagline (Baris Kecil Atas)">
                      <input className={inputCls} value={site.hero.tagline} onChange={(e) => update(['hero', 'tagline'], e.target.value)} />
                    </Field>
                    <Field label="Judul Baris 1">
                      <input className={inputCls} value={site.hero.titlePart1} onChange={(e) => update(['hero', 'titlePart1'], e.target.value)} />
                    </Field>
                    <Field label="Judul Highlight (Italic, Warna Rattan)">
                      <input className={inputCls} value={site.hero.titleHighlight} onChange={(e) => update(['hero', 'titleHighlight'], e.target.value)} />
                    </Field>
                    <Field label="Judul Baris 2">
                      <input className={inputCls} value={site.hero.titlePart2} onChange={(e) => update(['hero', 'titlePart2'], e.target.value)} />
                    </Field>
                    <Field label="Deskripsi Hero" className="md:col-span-2">
                      <textarea className={textareaCls} rows={2} value={site.hero.description} onChange={(e) => update(['hero', 'description'], e.target.value)} />
                    </Field>
                    <Field label="Teks Tombol 'Explore'">
                      <input className={inputCls} value={site.hero.exploreBtnText} onChange={(e) => update(['hero', 'exploreBtnText'], e.target.value)} />
                    </Field>
                    <Field label="Teks Tombol 'Quote'">
                      <input className={inputCls} value={site.hero.quoteBtnText} onChange={(e) => update(['hero', 'quoteBtnText'], e.target.value)} />
                    </Field>
                  </div>

                  <SectionDivider title="Statistik Hero" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {site.hero.stats.map((st, i) => (
                      <div key={i} className="bg-stone-50 border border-stone-200 p-4">
                        <Field label={`Angka ${i + 1}`}>
                          <input className={inputCls} value={st.num}
                            onChange={(e) => {
                              const copy = site.hero.stats.map((s, idx) => idx === i ? { ...s, num: e.target.value } : s)
                              update(['hero', 'stats'], copy)
                            }} placeholder="12+" />
                        </Field>
                        <Field label="Label" className="mt-2">
                          <input className={inputCls} value={st.label}
                            onChange={(e) => {
                              const copy = site.hero.stats.map((s, idx) => idx === i ? { ...s, label: e.target.value } : s)
                              update(['hero', 'stats'], copy)
                            }} placeholder="Years of Craft" />
                        </Field>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* ── SLIDESHOW (with image upload) ── */}
                <Card title="Gambar Slideshow (Ken Burns Auto-Play)" badge="Slideshow">
                  <p className="text-xs text-stone-400 mb-4">Upload foto dari komputer atau gunakan URL. Gambar otomatis dikompres. Setiap slide tampil bergantian.</p>
                  <div className="space-y-5">
                    {site.hero.slides.map((sl, i) => (
                      <div key={i} className="bg-stone-50 border border-stone-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400">Slide {i + 1}</span>
                          {site.hero.slides.length > 1 && (
                            <button
                              onClick={() => update(['hero', 'slides'], site.hero.slides.filter((_, idx) => idx !== i))}
                              className="text-[10px] text-red-500 hover:text-red-700 font-medium uppercase tracking-wide"
                            >
                              × Hapus Slide
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ImageUploadField
                            label="Foto Slide"
                            value={sl.image}
                            onChange={(url) => {
                              const copy = site.hero.slides.map((s, idx) => idx === i ? { ...s, image: url } : s)
                              update(['hero', 'slides'], copy)
                            }}
                            maxWidthPx={1200}
                            maxHeightPx={1400}
                            quality={0.85}
                            aspectHint="Portrait · Max 1200px"
                          />
                          <div className="space-y-3">
                            <Field label="Judul Produk di Badge">
                              <input className={inputCls} value={sl.title}
                                onChange={(e) => {
                                  const copy = site.hero.slides.map((s, idx) => idx === i ? { ...s, title: e.target.value } : s)
                                  update(['hero', 'slides'], copy)
                                }} placeholder="Weave Lounge Chair" />
                            </Field>
                            <Field label="Tag Kategori di Badge">
                              <input className={inputCls} value={sl.category}
                                onChange={(e) => {
                                  const copy = site.hero.slides.map((s, idx) => idx === i ? { ...s, category: e.target.value } : s)
                                  update(['hero', 'slides'], copy)
                                }} placeholder="Handcrafted Rattan" />
                            </Field>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => update(['hero', 'slides'], [...site.hero.slides, { image: '', title: 'Produk Baru', category: 'Handcrafted Rattan' }])}
                    className="mt-4 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-amber-700 border border-amber-300 hover:bg-amber-50 px-5 py-2.5 transition-colors"
                  >
                    + Tambah Slide Baru
                  </button>
                </Card>
              </>
            )}

            {/* ════════════════ TAB: KONTEN HOME ════════════════ */}
            {activeTab === 'content' && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h2 className="text-xl font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Konten Halaman Home</h2>
                    <p className="text-xs text-stone-400 mt-0.5">Brand quote, kategori, proses, testimoni, dan CTA banner</p>
                  </div>
                </div>

                {/* 2. Brand Quote */}
                <Card title="Brand Philosophy Quote" badge="2">
                  <Field label="Teks Kutipan Filosofi">
                    <textarea className={textareaCls} rows={3} value={site.brandQuote.quote} onChange={(e) => update(['brandQuote', 'quote'], e.target.value)} />
                  </Field>
                </Card>

                {/* 3. Kategori dengan image upload */}
                <Card title="Section: Shop by Category (What We Make)" badge="3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <Field label="Subtitle Section">
                      <input className={inputCls} value={site.categoriesSection.subtitle} onChange={(e) => update(['categoriesSection', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Section">
                      <input className={inputCls} value={site.categoriesSection.title} onChange={(e) => update(['categoriesSection', 'title'], e.target.value)} />
                    </Field>
                  </div>

                  <SectionDivider title="Item Kategori (Gambar Grid)" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {site.categoriesSection.items.map((cat, i) => (
                      <div key={i} className="bg-stone-50 border border-stone-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400">Kategori {i + 1}</span>
                          {site.categoriesSection.items.length > 1 && (
                            <button
                              onClick={() => update(['categoriesSection', 'items'], site.categoriesSection.items.filter((_, idx) => idx !== i))}
                              className="text-[10px] text-red-500 hover:text-red-700 font-medium uppercase tracking-wide"
                            >× Hapus</button>
                          )}
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <Field label="Nama Kategori" className="w-full">
                            <input className={inputCls} value={cat.name}
                              onChange={(e) => {
                                const copy = site.categoriesSection.items.map((c, idx) => idx === i ? { ...c, name: e.target.value } : c)
                                update(['categoriesSection', 'items'], copy)
                              }} />
                          </Field>
                        </div>
                        <div className="bg-stone-100 p-2.5 mb-3 border border-stone-200 flex items-center justify-between">
                          <span className="text-[10px] uppercase font-semibold text-stone-500">Jumlah Produk:</span>
                          <span className="text-xs font-bold text-amber-800">
                            {site.products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length} Pcs (Otomatis)
                          </span>
                        </div>
                        <ImageUploadField
                          label="Foto Kategori"
                          value={cat.image}
                          onChange={(url) => {
                            const copy = site.categoriesSection.items.map((c, idx) => idx === i ? { ...c, image: url } : c)
                            update(['categoriesSection', 'items'], copy)
                          }}
                          maxWidthPx={800}
                          maxHeightPx={1000}
                          quality={0.85}
                          aspectHint="Portrait 3:4"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => update(['categoriesSection', 'items'], [...site.categoriesSection.items, { name: 'Kategori Baru', image: '', count: 0 }])}
                    className="mt-4 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-amber-700 border border-amber-300 hover:bg-amber-50 px-5 py-2.5 transition-colors"
                  >+ Tambah Kategori</button>
                </Card>

                {/* 4. Featured Collection */}
                <Card title="Section: Featured Collection (Handpicked for You)" badge="4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Subtitle">
                      <input className={inputCls} value={site.featuredSection.subtitle} onChange={(e) => update(['featuredSection', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Section">
                      <input className={inputCls} value={site.featuredSection.title} onChange={(e) => update(['featuredSection', 'title'], e.target.value)} />
                    </Field>
                    <Field label="Teks Tombol Catalog">
                      <input className={inputCls} value={site.featuredSection.btnText} onChange={(e) => update(['featuredSection', 'btnText'], e.target.value)} />
                    </Field>
                  </div>
                  <p className="text-xs text-stone-400 mt-4 bg-stone-50 border border-stone-200 px-4 py-3">
                    💡 Produk ditampilkan dari tab <strong>Katalog Produk</strong> — centang "Featured" pada produk yang ingin tampil di Home.
                  </p>
                </Card>

                {/* 5. Our Process dengan image upload */}
                <Card title="Section: Our Process (Where Every Strand Has a Purpose)" badge="5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Subtitle">
                      <input className={inputCls} value={site.ourProcess.subtitle} onChange={(e) => update(['ourProcess', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Section">
                      <input className={inputCls} value={site.ourProcess.title} onChange={(e) => update(['ourProcess', 'title'], e.target.value)} />
                    </Field>
                    <Field label="Paragraf 1" className="md:col-span-2">
                      <textarea className={textareaCls} rows={3} value={site.ourProcess.desc1} onChange={(e) => update(['ourProcess', 'desc1'], e.target.value)} />
                    </Field>
                    <Field label="Paragraf 2" className="md:col-span-2">
                      <textarea className={textareaCls} rows={3} value={site.ourProcess.desc2} onChange={(e) => update(['ourProcess', 'desc2'], e.target.value)} />
                    </Field>

                    {/* Image upload for Our Process */}
                    <ImageUploadField
                      label="Foto Pengrajin (Kiri Section)"
                      value={site.ourProcess.image}
                      onChange={(url) => update(['ourProcess', 'image'], url)}
                      maxWidthPx={900}
                      maxHeightPx={1100}
                      quality={0.85}
                      aspectHint="Portrait 4:5 · Max 900px"
                    />

                    <div className="space-y-3">
                      <Field label="Badge Angka (e.g. 12+)">
                        <input className={inputCls} value={site.ourProcess.badgeNumber} onChange={(e) => update(['ourProcess', 'badgeNumber'], e.target.value)} />
                      </Field>
                      <Field label="Badge Label (e.g. Years of craft)">
                        <input className={inputCls} value={site.ourProcess.badgeLabel} onChange={(e) => update(['ourProcess', 'badgeLabel'], e.target.value)} />
                      </Field>
                    </div>
                  </div>

                  <SectionDivider title="Spesifikasi Material (3 Kolom)" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {site.ourProcess.materials.map((mat, i) => (
                      <div key={i} className="bg-stone-50 border border-stone-200 p-4 space-y-3">
                        <Field label={`Material ${i + 1} — Judul`}>
                          <input className={inputCls} value={mat.title}
                            onChange={(e) => {
                              const copy = site.ourProcess.materials.map((m, idx) => idx === i ? { ...m, title: e.target.value } : m)
                              update(['ourProcess', 'materials'], copy)
                            }} />
                        </Field>
                        <Field label="Deskripsi Singkat">
                          <input className={inputCls} value={mat.desc}
                            onChange={(e) => {
                              const copy = site.ourProcess.materials.map((m, idx) => idx === i ? { ...m, desc: e.target.value } : m)
                              update(['ourProcess', 'materials'], copy)
                            }} />
                        </Field>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* 6. Featured Projects */}
                <Card title="Section: Real Spaces — Featured Projects" badge="6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Subtitle">
                      <input className={inputCls} value={site.featuredProjectsSection.subtitle} onChange={(e) => update(['featuredProjectsSection', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Section">
                      <input className={inputCls} value={site.featuredProjectsSection.title} onChange={(e) => update(['featuredProjectsSection', 'title'], e.target.value)} />
                    </Field>
                    <Field label="Teks Tombol Gallery">
                      <input className={inputCls} value={site.featuredProjectsSection.btnText} onChange={(e) => update(['featuredProjectsSection', 'btnText'], e.target.value)} />
                    </Field>
                  </div>
                  <p className="text-xs text-stone-400 mt-4 bg-stone-50 border border-stone-200 px-4 py-3">
                    💡 3 proyek teratas dari tab <strong>Galeri Proyek</strong> yang akan tampil di Home.
                  </p>
                </Card>

                {/* 7. Testimonials CRUD */}
                <Card title="Section: Client Voices (Testimonials)" badge="7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <Field label="Subtitle">
                      <input className={inputCls} value={site.testimonialsSection.subtitle} onChange={(e) => update(['testimonialsSection', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Section">
                      <input className={inputCls} value={site.testimonialsSection.title} onChange={(e) => update(['testimonialsSection', 'title'], e.target.value)} />
                    </Field>
                  </div>

                  <SectionDivider title="Daftar Testimoni Klien" />
                  <div className="space-y-4">
                    {site.testimonialsSection.items.map((t, i) => (
                      <div key={t.id} className="bg-stone-50 border border-stone-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400">Testimoni {i + 1}</span>
                          <button
                            onClick={() => update(['testimonialsSection', 'items'], site.testimonialsSection.items.filter((_, idx) => idx !== i))}
                            className="text-[10px] text-red-500 hover:text-red-700 font-medium uppercase tracking-wide"
                          >× Hapus</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Field label="Kutipan / Review" className="md:col-span-2">
                            <textarea className={textareaCls} rows={2} value={t.quote}
                              onChange={(e) => {
                                const copy = site.testimonialsSection.items.map((item, idx) => idx === i ? { ...item, quote: e.target.value } : item)
                                update(['testimonialsSection', 'items'], copy)
                              }} />
                          </Field>
                          <Field label="Nama Klien">
                            <input className={inputCls} value={t.author}
                              onChange={(e) => {
                                const copy = site.testimonialsSection.items.map((item, idx) => idx === i ? { ...item, author: e.target.value } : item)
                                update(['testimonialsSection', 'items'], copy)
                              }} />
                          </Field>
                          <Field label="Peran / Jabatan">
                            <input className={inputCls} value={t.role}
                              onChange={(e) => {
                                const copy = site.testimonialsSection.items.map((item, idx) => idx === i ? { ...item, role: e.target.value } : item)
                                update(['testimonialsSection', 'items'], copy)
                              }} />
                          </Field>
                          <Field label="Nama Proyek / Asal" className="md:col-span-2">
                            <input className={inputCls} value={t.project}
                              onChange={(e) => {
                                const copy = site.testimonialsSection.items.map((item, idx) => idx === i ? { ...item, project: e.target.value } : item)
                                update(['testimonialsSection', 'items'], copy)
                              }} />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => update(['testimonialsSection', 'items'], [...site.testimonialsSection.items, { id: 't_' + Date.now(), quote: '', author: '', role: '', project: '' }])}
                    className="mt-4 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-amber-700 border border-amber-300 hover:bg-amber-50 px-5 py-2.5 transition-colors"
                  >+ Tambah Testimoni</button>
                </Card>

                {/* 8. CTA Banner */}
                <Card title="Section: CTA Banner (Ready to Create Something Lasting?)" badge="8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Subtitle">
                      <input className={inputCls} value={site.ctaBanner.subtitle} onChange={(e) => update(['ctaBanner', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Baris 1">
                      <input className={inputCls} value={site.ctaBanner.titlePart1} onChange={(e) => update(['ctaBanner', 'titlePart1'], e.target.value)} />
                    </Field>
                    <Field label="Judul Highlight">
                      <input className={inputCls} value={site.ctaBanner.titleHighlight} onChange={(e) => update(['ctaBanner', 'titleHighlight'], e.target.value)} />
                    </Field>
                    <Field label="Deskripsi">
                      <input className={inputCls} value={site.ctaBanner.description} onChange={(e) => update(['ctaBanner', 'description'], e.target.value)} />
                    </Field>
                    <Field label="Teks Tombol Quote">
                      <input className={inputCls} value={site.ctaBanner.quoteBtn} onChange={(e) => update(['ctaBanner', 'quoteBtn'], e.target.value)} />
                    </Field>
                    <Field label="Teks Tombol WhatsApp">
                      <input className={inputCls} value={site.ctaBanner.waBtn} onChange={(e) => update(['ctaBanner', 'waBtn'], e.target.value)} />
                    </Field>
                  </div>
                </Card>
              </>
            )}

            {/* ════════════════ TAB: KATALOG PRODUK ════════════════ */}
            {activeTab === 'catalog' && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <h2 className="text-xl font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Katalog Produk</h2>
                    <p className="text-xs text-stone-400 mt-0.5">Kelola judul halaman dan semua produk (Tambah, Edit, Hapus)</p>
                  </div>
                </div>

                <Card title="Header Halaman Katalog" badge="11">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Subtitle Halaman">
                      <input className={inputCls} value={site.catalogPage.subtitle} onChange={(e) => update(['catalogPage', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Halaman">
                      <input className={inputCls} value={site.catalogPage.title} onChange={(e) => update(['catalogPage', 'title'], e.target.value)} />
                    </Field>
                    <Field label="Deskripsi Halaman" className="md:col-span-2">
                      <textarea className={textareaCls} rows={2} value={site.catalogPage.description} onChange={(e) => update(['catalogPage', 'description'], e.target.value)} />
                    </Field>
                  </div>
                </Card>

                <Card title={`Kelola Produk Katalog (${site.products.length} produk)`} badge="CRUD">
                  <div className="flex justify-between items-center mb-5">
                    <p className="text-xs text-stone-400">Upload foto dari file atau gunakan URL.</p>
                    <button
                      onClick={() => setEditingProduct({
                        product: { id: 'p_' + Date.now(), name: '', category: 'Chairs', material: 'Rattan', price: 'Rp ', image: '', images: [], description: '', dimensions: '', finish: 'Natural Oil', customAvailable: true, featured: false },
                        isNew: true,
                      })}
                      className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-white bg-amber-700 hover:bg-amber-800 px-5 py-2.5 transition-colors"
                    >
                      + Tambah Produk
                    </button>
                  </div>

                  {editingProduct && (
                    <ProductModal product={editingProduct.product} isNew={editingProduct.isNew} onSave={saveProduct} onCancel={() => setEditingProduct(null)} />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {site.products.map((p) => (
                      <div key={p.id} className="bg-stone-50 border border-stone-200 flex gap-4 p-4 hover:border-amber-300 transition-colors">
                        <div className="w-16 h-16 bg-stone-200 shrink-0 overflow-hidden">
                          {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] tracking-[0.15em] uppercase font-semibold text-amber-700">{p.category}</span>
                            {p.featured && <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 uppercase font-bold tracking-wide">Featured</span>}
                          </div>
                          <h4 className="text-sm font-medium text-stone-800 truncate">{p.name || '(Tanpa Nama)'}</h4>
                          <p className="text-xs text-stone-500 mt-0.5">{p.material} · {p.price}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button onClick={() => setEditingProduct({ product: p, isNew: false })} className="text-[10px] tracking-wider uppercase font-semibold text-amber-700 border border-amber-300 hover:bg-amber-700 hover:text-white px-3 py-1.5 transition-colors">Edit</button>
                          <button onClick={() => deleteProduct(p)} className="text-[10px] tracking-wider uppercase font-semibold text-red-500 border border-red-200 hover:bg-red-500 hover:text-white px-3 py-1.5 transition-colors">Hapus</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* ════════════════ TAB: GALERI PROYEK ════════════════ */}
            {activeTab === 'gallery' && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🖼️</span>
                  <div>
                    <h2 className="text-xl font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Galeri Proyek</h2>
                    <p className="text-xs text-stone-400 mt-0.5">Kelola judul halaman dan semua proyek instalasi</p>
                  </div>
                </div>

                <Card title="Header Halaman Galeri Proyek" badge="12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Subtitle Halaman">
                      <input className={inputCls} value={site.galleryPage.subtitle} onChange={(e) => update(['galleryPage', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Halaman">
                      <input className={inputCls} value={site.galleryPage.title} onChange={(e) => update(['galleryPage', 'title'], e.target.value)} />
                    </Field>
                    <Field label="Deskripsi Halaman" className="md:col-span-2">
                      <textarea className={textareaCls} rows={2} value={site.galleryPage.description} onChange={(e) => update(['galleryPage', 'description'], e.target.value)} />
                    </Field>
                  </div>
                </Card>

                <Card title={`Kelola Galeri Proyek (${site.projects.length} proyek)`} badge="CRUD">
                  <div className="flex justify-between items-center mb-5">
                    <p className="text-xs text-stone-400">Upload foto proyek dari file atau gunakan URL.</p>
                    <button
                      onClick={() => setEditingProject({
                        project: { id: 'pr_' + Date.now(), title: '', type: 'Hotel', location: '', image: '', products: '' },
                        isNew: true,
                      })}
                      className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-white bg-amber-700 hover:bg-amber-800 px-5 py-2.5 transition-colors"
                    >
                      + Tambah Proyek
                    </button>
                  </div>

                  {editingProject && (
                    <ProjectModal project={editingProject.project} isNew={editingProject.isNew} onSave={saveProject} onCancel={() => setEditingProject(null)} />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {site.projects.map((p) => (
                      <div key={p.id} className="bg-stone-50 border border-stone-200 flex gap-4 p-4 hover:border-amber-300 transition-colors">
                        <div className="w-20 h-16 bg-stone-200 shrink-0 overflow-hidden">
                          {p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] tracking-[0.15em] uppercase font-semibold text-amber-700">{p.type} · {p.location}</span>
                          <h4 className="text-sm font-medium text-stone-800 mt-0.5 truncate">{p.title || '(Tanpa Judul)'}</h4>
                          <p className="text-xs text-stone-400 mt-0.5 truncate">{p.products}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button onClick={() => setEditingProject({ project: p, isNew: false })} className="text-[10px] tracking-wider uppercase font-semibold text-amber-700 border border-amber-300 hover:bg-amber-700 hover:text-white px-3 py-1.5 transition-colors">Edit</button>
                          <button onClick={() => deleteProject(p)} className="text-[10px] tracking-wider uppercase font-semibold text-red-500 border border-red-200 hover:bg-red-500 hover:text-white px-3 py-1.5 transition-colors">Hapus</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* ════════════════ TAB: HALAMAN ABOUT ════════════════ */}
            {activeTab === 'about' && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📖</span>
                  <div>
                    <h2 className="text-xl font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Halaman About Us</h2>
                    <p className="text-xs text-stone-400 mt-0.5">Kelola konten lengkap halaman About termasuk upload gambar</p>
                  </div>
                </div>

                <Card title="Hero & Judul Halaman About" badge="10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Subtitle (Kecil di Atas)">
                      <input className={inputCls} value={site.aboutPage.subtitle} onChange={(e) => update(['aboutPage', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Baris 1">
                      <input className={inputCls} value={site.aboutPage.titlePart1} onChange={(e) => update(['aboutPage', 'titlePart1'], e.target.value)} />
                    </Field>
                    <Field label="Judul Baris 2">
                      <input className={inputCls} value={site.aboutPage.titlePart2} onChange={(e) => update(['aboutPage', 'titlePart2'], e.target.value)} />
                    </Field>
                    <Field label="Judul Highlight (Italic, Warna Rattan)">
                      <input className={inputCls} value={site.aboutPage.titleHighlight} onChange={(e) => update(['aboutPage', 'titleHighlight'], e.target.value)} />
                    </Field>
                  </div>

                  {/* Hero About image upload */}
                  <div className="mt-4">
                    <ImageUploadField
                      label="Foto Banner Hero About (Lebar Penuh)"
                      value={site.aboutPage.heroImage}
                      onChange={(url) => update(['aboutPage', 'heroImage'], url)}
                      maxWidthPx={1600}
                      maxHeightPx={700}
                      quality={0.88}
                      aspectHint="Landscape 21:9 · Max 1600px"
                    />
                  </div>
                </Card>

                <Card title="Narasi / Cerita Workshop" badge="Story">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Judul Cerita Workshop">
                      <input className={inputCls} value={site.aboutPage.storyTitle} onChange={(e) => update(['aboutPage', 'storyTitle'], e.target.value)} />
                    </Field>

                    {/* Story side image upload */}
                    <ImageUploadField
                      label="Foto Samping Narasi"
                      value={site.aboutPage.storyImage}
                      onChange={(url) => update(['aboutPage', 'storyImage'], url)}
                      maxWidthPx={800}
                      maxHeightPx={1000}
                      quality={0.85}
                      aspectHint="Portrait 4:5 · Max 800px"
                    />

                    <Field label="Paragraf Narasi 1" className="md:col-span-2">
                      <textarea className={textareaCls} rows={3} value={site.aboutPage.storyP1} onChange={(e) => update(['aboutPage', 'storyP1'], e.target.value)} />
                    </Field>
                    <Field label="Paragraf Narasi 2" className="md:col-span-2">
                      <textarea className={textareaCls} rows={3} value={site.aboutPage.storyP2} onChange={(e) => update(['aboutPage', 'storyP2'], e.target.value)} />
                    </Field>
                    <Field label="Paragraf Narasi 3" className="md:col-span-2">
                      <textarea className={textareaCls} rows={3} value={site.aboutPage.storyP3} onChange={(e) => update(['aboutPage', 'storyP3'], e.target.value)} />
                    </Field>
                  </div>
                </Card>

                <Card title="Nilai Perusahaan (Our Core Values)" badge="Values">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {site.aboutPage.values.map((v, i) => (
                      <div key={i} className="bg-stone-50 border border-stone-200 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400">Value 0{i + 1}</span>
                          {site.aboutPage.values.length > 1 && (
                            <button onClick={() => update(['aboutPage', 'values'], site.aboutPage.values.filter((_, idx) => idx !== i))} className="text-[10px] text-red-500 hover:text-red-700 font-medium uppercase tracking-wide">× Hapus</button>
                          )}
                        </div>
                        <Field label="Judul Nilai">
                          <input className={inputCls} value={v.title}
                            onChange={(e) => {
                              const copy = site.aboutPage.values.map((val, idx) => idx === i ? { ...val, title: e.target.value } : val)
                              update(['aboutPage', 'values'], copy)
                            }} />
                        </Field>
                        <Field label="Deskripsi">
                          <textarea className={textareaCls} rows={2} value={v.desc}
                            onChange={(e) => {
                              const copy = site.aboutPage.values.map((val, idx) => idx === i ? { ...val, desc: e.target.value } : val)
                              update(['aboutPage', 'values'], copy)
                            }} />
                        </Field>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => update(['aboutPage', 'values'], [...site.aboutPage.values, { title: '', desc: '' }])}
                    className="mt-4 flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-amber-700 border border-amber-300 hover:bg-amber-50 px-5 py-2.5 transition-colors"
                  >+ Tambah Nilai Perusahaan</button>
                </Card>
              </>
            )}

            {/* ════════════════ TAB: HALAMAN LAINNYA ════════════════ */}
            {activeTab === 'pages' && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📄</span>
                  <div>
                    <h2 className="text-xl font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Halaman Lainnya</h2>
                    <p className="text-xs text-stone-400 mt-0.5">Teks halaman Request a Quote dan deskripsi brand footer</p>
                  </div>
                </div>

                <Card title="Halaman Custom Orders / Request a Quote" badge="14">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Subtitle Halaman">
                      <input className={inputCls} value={site.requestQuotePage.subtitle} onChange={(e) => update(['requestQuotePage', 'subtitle'], e.target.value)} />
                    </Field>
                    <Field label="Judul Halaman">
                      <input className={inputCls} value={site.requestQuotePage.title} onChange={(e) => update(['requestQuotePage', 'title'], e.target.value)} />
                    </Field>
                    <Field label="Deskripsi / Instruksi" className="md:col-span-2">
                      <textarea className={textareaCls} rows={3} value={site.requestQuotePage.description} onChange={(e) => update(['requestQuotePage', 'description'], e.target.value)} />
                    </Field>
                  </div>
                </Card>

                <Card title="Deskripsi Brand & Copyright (Footer)" badge="Footer">
                  <Field label="Deskripsi Brand (Teks pendek di footer bawah logo)">
                    <textarea className={textareaCls} rows={3} value={site.contactInfo.brandDesc} onChange={(e) => update(['contactInfo', 'brandDesc'], e.target.value)} />
                  </Field>
                  <Field label="Teks Copyright" className="mt-4">
                    <input className={inputCls} value={site.contactInfo.copyright} onChange={(e) => update(['contactInfo', 'copyright'], e.target.value)} />
                  </Field>
                </Card>
              </>
            )}

            {/* ════════════════ TAB: KONTAK & BRAND ════════════════ */}
            {activeTab === 'contact' && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h2 className="text-xl font-medium text-stone-800" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Identitas Brand, Logo & Kontak</h2>
                    <p className="text-xs text-stone-400 mt-0.5">Upload logo, favicon, nama brand, WhatsApp, email, dan alamat</p>
                  </div>
                </div>

                {/* ── LOGO & FAVICON UPLOAD ── */}
                <Card title="Logo Website & Favicon" badge="Logo">
                  <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-6 flex items-start gap-3">
                    <span className="text-xl">🖼️</span>
                    <div>
                      <p className="text-sm font-semibold text-amber-800 mb-1">Panduan Upload Logo & Favicon</p>
                      <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                        <li><strong>Logo</strong>: Tampil di header/nav semua halaman. Gunakan gambar PNG transparan, rasio bebas, tinggi minimal 100px. Jika kosong, teks brand akan tampil.</li>
                        <li><strong>Favicon</strong>: Ikon kecil di tab browser. Gunakan gambar kotak (1:1), minimal 32×32px. Format PNG/ICO/SVG disarankan.</li>
                        <li>Gambar otomatis dikompres — tidak perlu khawatir ukuran file besar.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo Upload */}
                    <div>
                      <ImageUploadField
                        label="Logo Header (PNG transparan disarankan)"
                        value={site.contactInfo.logoUrl}
                        onChange={(url) => update(['contactInfo', 'logoUrl'], url)}
                        maxWidthPx={400}
                        maxHeightPx={200}
                        quality={0.95}
                        aspectHint="Bebas · PNG transparan"
                      />
                      {site.contactInfo.logoUrl && (
                        <div className="mt-3 space-y-1">
                          {/* Light bg preview (scrolled header = bg-ivory) */}
                          <div className="flex items-center justify-center p-4 border border-stone-200" style={{ background: '#faf7f2' }}>
                            <img src={site.contactInfo.logoUrl} alt="Logo preview" className="h-12 max-w-[200px] object-contain" />
                          </div>
                          <div className="flex gap-1">
                            <span className="text-[9px] text-stone-400 uppercase tracking-wider flex-1 text-center">Header terang (scroll)</span>
                          </div>
                          {/* Dark bg preview (hero transparent header) */}
                          <div className="flex items-center justify-center p-4 border border-stone-200" style={{ background: '#5c3d2e' }}>
                            <img src={site.contactInfo.logoUrl} alt="Logo preview dark" className="h-12 max-w-[200px] object-contain" />
                          </div>
                          <div className="flex gap-1">
                            <span className="text-[9px] text-stone-400 uppercase tracking-wider flex-1 text-center">Header gelap (hero area)</span>
                          </div>
                        </div>
                      )}
                      {!site.contactInfo.logoUrl && (
                        <p className="text-xs text-stone-400 mt-2">💡 Jika tidak diisi, teks "{site.contactInfo.brandName}" akan tampil sebagai logo di header.</p>
                      )}

                    </div>

                    {/* Favicon Upload */}
                    <div>
                      <ImageUploadField
                        label="Favicon (Ikon Tab Browser)"
                        value={site.contactInfo.faviconUrl}
                        onChange={(url) => update(['contactInfo', 'faviconUrl'], url)}
                        maxWidthPx={64}
                        maxHeightPx={64}
                        quality={0.95}
                        aspectHint="Kotak 1:1 · 32×32 atau 64×64px"
                      />
                      {site.contactInfo.faviconUrl && (
                        <div className="mt-3 bg-white border border-stone-200 p-3 flex items-center gap-3">
                          <img src={site.contactInfo.faviconUrl} alt="Favicon preview" className="w-6 h-6 object-contain" />
                          <p className="text-xs text-stone-500">Preview favicon di tab browser</p>
                        </div>
                      )}
                      {!site.contactInfo.faviconUrl && (
                        <p className="text-xs text-stone-400 mt-2">💡 Favicon otomatis diterapkan ke semua tab browser setelah disimpan.</p>
                      )}
                    </div>
                  </div>

                  {(site.contactInfo.logoUrl || site.contactInfo.faviconUrl) && (
                    <div className="mt-4 flex gap-3">
                      {site.contactInfo.logoUrl && (
                        <button
                          onClick={() => update(['contactInfo', 'logoUrl'], '')}
                          className="text-[10px] tracking-wider uppercase font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 transition-colors"
                        >
                          × Hapus Logo
                        </button>
                      )}
                      {site.contactInfo.faviconUrl && (
                        <button
                          onClick={() => update(['contactInfo', 'faviconUrl'], '')}
                          className="text-[10px] tracking-wider uppercase font-semibold text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 transition-colors"
                        >
                          × Hapus Favicon
                        </button>
                      )}
                    </div>
                  )}
                </Card>

                {/* Brand Identity */}
                <Card title="Identitas Brand (Header & Footer)" badge="Brand">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Nama Brand Utama">
                      <input className={inputCls} value={site.contactInfo.brandName} onChange={(e) => update(['contactInfo', 'brandName'], e.target.value)} placeholder="Kinawa" />
                    </Field>
                    <Field label="Subtitle Brand">
                      <input className={inputCls} value={site.contactInfo.brandSub} onChange={(e) => update(['contactInfo', 'brandSub'], e.target.value)} placeholder="Furniture" />
                    </Field>
                  </div>
                </Card>

                {/* WhatsApp */}
                <Card title="Nomor WhatsApp" badge="13">
                  <div className="bg-amber-50 border border-amber-200 px-5 py-4 mb-4">
                    <p className="text-xs text-amber-800 font-medium mb-1">Nomor WhatsApp Aktif:</p>
                    <p className="text-2xl font-semibold text-amber-700" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
                      {site.contactInfo.phoneDisplay}
                    </p>
                    <a href={site.contactInfo.whatsappUrl} target="_blank" rel="noreferrer" className="text-xs text-amber-600 underline mt-1 inline-block">
                      Test: {site.contactInfo.whatsappUrl}
                    </a>
                  </div>
                  <Field label="Nomor Tampil (e.g. +62 877-8830-4421)">
                    <input
                      className={inputCls}
                      value={site.contactInfo.phoneDisplay}
                      onChange={(e) => {
                        const display = e.target.value
                        const raw = display.replace(/[^0-9]/g, '')
                        update(['contactInfo', 'phoneDisplay'], display)
                        update(['contactInfo', 'phoneRaw'], raw)
                        update(['contactInfo', 'whatsappUrl'], `https://wa.me/${raw}`)
                      }}
                      placeholder="+62 877-8830-4421"
                    />
                  </Field>
                  <p className="text-xs text-stone-400 mt-2">URL WhatsApp otomatis diperbarui saat nomor diubah.</p>
                </Card>

                {/* Contact Info */}
                <Card title="Informasi Kontak" badge="9">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Email Resmi">
                      <input className={inputCls} value={site.contactInfo.email} onChange={(e) => update(['contactInfo', 'email'], e.target.value)} placeholder="info@kinawafurniture.com" />
                    </Field>
                    <Field label="URL Instagram">
                      <input className={inputCls} value={site.contactInfo.instagramUrl} onChange={(e) => update(['contactInfo', 'instagramUrl'], e.target.value)} placeholder="https://instagram.com/..." />
                    </Field>
                    <Field label="Alamat Workshop / Showroom" className="md:col-span-2">
                      <textarea className={textareaCls} rows={2} value={site.contactInfo.address} onChange={(e) => update(['contactInfo', 'address'], e.target.value)} />
                    </Field>
                  </div>
                </Card>

                {/* Password Setting */}
                <Card title="Keamanan & Kata Sandi Admin" badge="Keamanan">
                  <Field label="Kata Sandi Login Admin">
                    <input
                      type="text"
                      className={inputCls}
                      value={site.contactInfo.adminPassword || 'kinawafurniture'}
                      onChange={(e) => update(['contactInfo', 'adminPassword'], e.target.value)}
                      placeholder="kinawafurniture"
                    />
                  </Field>
                  <p className="text-xs text-stone-400 mt-2">
                    Kata sandi ini digunakan untuk masuk ke dashboard admin melalui link <strong>/admin</strong>. Kata sandi bawaan: <code>kinawafurniture</code>.
                  </p>
                </Card>
              </>
            )}

          </div>

          {/* Bottom save bar */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-stone-200 px-6 py-4 flex items-center justify-between shadow-xl">
            <p className="text-xs text-stone-400">Perubahan belum tersimpan hingga Anda menekan <strong>Simpan Semua</strong>.</p>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-semibold text-white bg-amber-700 hover:bg-amber-800 px-7 py-3 transition-colors shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Simpan Semua Perubahan
            </button>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
