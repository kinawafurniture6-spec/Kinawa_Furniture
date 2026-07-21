import { useRef, useState } from 'react'

interface ImageUploadFieldProps {
  label: string
  value: string
  onChange: (url: string) => void
  maxWidthPx?: number
  maxHeightPx?: number
  quality?: number
  aspectHint?: string
  className?: string
}

/* Resize + compress image to a target size using canvas */
function resizeToBase64(file: File, maxW: number, maxH: number, quality: number): Promise<string> {
  // Detect if this format supports transparency — if so, preserve it
  const hasAlphaSupport = file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/gif'

  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      let { width, height } = img
      if (width > maxW || height > maxH) {
        const ratio = Math.min(maxW / width, maxH / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas 2D context not available'))

      if (hasAlphaSupport) {
        // Clear canvas so transparent pixels stay transparent (not black)
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
        // Output as PNG to preserve alpha channel
        resolve(canvas.toDataURL('image/png'))
      } else {
        // JPEG is fine for photos without transparency
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image'))
    }
    img.src = objectUrl
  })
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  maxWidthPx = 1200,
  maxHeightPx = 1200,
  quality = 0.85,
  aspectHint,
  className = '',
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [fileInfo, setFileInfo] = useState<{ name: string; originalSize: number; compressedSize: number } | null>(null)
  const [dragOver, setDragOver] = useState(false)

  // Always coerce to string to prevent crashes when value is undefined/null
  const safeValue = value ?? ''
  const isBase64 = safeValue.startsWith('data:')

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar (JPG, PNG, WebP, dll.)')
      return
    }
    const originalSize = file.size
    setLoading(true)
    setError(null)
    setFileInfo(null)
    try {
      const base64 = await resizeToBase64(file, maxWidthPx, maxHeightPx, quality)
      // Estimate compressed size
      const compressedSize = Math.round((base64.length * 3) / 4)
      setFileInfo({ name: file.name, originalSize, compressedSize })
      onChange(base64)
    } catch (e: any) {
      setError('Gagal memproses gambar: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    // Reset input so same file can be re-uploaded
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  return (
    <div className={className}>
      {/* Label + Mode Toggle */}
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-[10px] tracking-[0.18em] uppercase font-semibold text-stone-500">
          {label}
        </label>
        <div className="flex items-center gap-0.5 bg-stone-100 p-0.5 rounded">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`text-[9px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded transition-colors ${
              mode === 'upload' ? 'bg-white text-amber-700 shadow-sm' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`text-[9px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded transition-colors ${
              mode === 'url' ? 'bg-white text-amber-700 shadow-sm' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            URL Link
          </button>
        </div>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed cursor-pointer transition-all py-5 px-4 ${
            dragOver
              ? 'border-amber-500 bg-amber-50'
              : loading
              ? 'border-stone-300 bg-stone-50 cursor-wait'
              : 'border-stone-300 bg-stone-50 hover:border-amber-400 hover:bg-amber-50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
          {loading ? (
            <>
              <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-stone-400">Memproses & mengkompresi gambar...</p>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-stone-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <div className="text-center">
                <p className="text-xs font-semibold text-stone-600">
                  Drag &amp; drop atau <span className="text-amber-700 underline">klik untuk pilih file</span>
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">
                  JPG, PNG, WebP · Otomatis dikompres {aspectHint ? `· ${aspectHint}` : ''}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <input
          type="text"
          value={isBase64 ? '' : safeValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full bg-stone-50 border border-stone-200 px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-amber-700 transition-colors placeholder:text-stone-300"
        />
      )}

      {/* Error */}
      {error && (
        <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}

      {/* File info after upload */}
      {fileInfo && (
        <div className="mt-1.5 flex items-center gap-2 text-[10px] text-stone-400">
          <span className="text-green-600 font-semibold">✓</span>
          <span className="truncate max-w-[160px]">{fileInfo.name}</span>
          <span className="text-stone-300">|</span>
          <span className="line-through">{formatBytes(fileInfo.originalSize)}</span>
          <span>→</span>
          <span className="font-semibold text-green-600">{formatBytes(fileInfo.compressedSize)}</span>
        </div>
      )}

      {/* Preview */}
      {safeValue && (
        <div className="mt-2 relative group">
          <div className="w-full h-32 bg-stone-100 border border-stone-200 overflow-hidden">
            <img
              src={safeValue}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.opacity = '0'
              }}
              onLoad={(e) => {
                ;(e.target as HTMLImageElement).style.opacity = '1'
              }}
              style={{ opacity: 1 }}
            />
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange('') }}
            className="absolute top-1.5 right-1.5 w-6 h-6 bg-stone-900/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            title="Hapus gambar"
          >
            ✕
          </button>
          {isBase64 && (
            <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-green-600 text-white px-1.5 py-0.5 font-semibold tracking-wide">
              LOCAL
            </span>
          )}
        </div>
      )}
    </div>
  )
}
