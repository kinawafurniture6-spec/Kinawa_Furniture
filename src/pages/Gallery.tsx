import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import type { ProjectType, Project } from '../data'
import type { SiteData } from '../data/useSiteStore'

interface GalleryProps {
  siteData?: SiteData
}

const filters: ('All' | ProjectType)[] = ['All', 'Hotel', 'Café', 'Residential', 'Restaurant']

export default function Gallery({ siteData }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectType>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const galleryHeader = siteData?.galleryPage || {
    subtitle: 'Portofolio',
    title: 'Project Gallery',
    description: 'Selected residential, hotel, café, and restaurant installations featuring custom Kinawa Furniture pieces.',
  }

  const projectsList = siteData?.projects || []

  const filtered = projectsList.filter((p) => activeFilter === 'All' || p.type === activeFilter)

  return (
    <div className="bg-ivory pt-24 min-h-screen">
      {/* Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-ivory w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] overflow-hidden bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-sandstone mb-1 font-semibold">
                    {selectedProject.type} · {selectedProject.location}
                  </p>
                  <h2
                    className="text-3xl font-light text-charcoal"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-charcoal/40 hover:text-charcoal transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="border-t border-charcoal/10 pt-4 mt-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal/40 mb-1 font-medium">
                  Furnished With
                </p>
                <p className="text-sm text-charcoal/80 leading-relaxed font-medium">{selectedProject.products}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-sandstone mb-4 font-semibold">
            {galleryHeader.subtitle}
          </p>
          <h1
            className="text-5xl md:text-6xl font-light text-charcoal leading-tight"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            {galleryHeader.title}
          </h1>
          <p className="mt-4 text-base text-charcoal/65 max-w-md leading-relaxed">
            {galleryHeader.description}
          </p>
        </Reveal>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors duration-200 ${
                  activeFilter === f
                    ? 'bg-rattan text-ivory border-rattan font-medium'
                    : 'text-charcoal border-charcoal/20 hover:border-sandstone hover:text-sandstone'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <div
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-sandstone/10 mb-4 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-charcoal/80 text-ivory px-2.5 py-1 backdrop-blur-sm font-medium">
                    {project.type}
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-sandstone mb-1 font-semibold">
                  {project.location}
                </p>
                <h3
                  className="text-2xl font-light text-charcoal group-hover:text-sandstone transition-colors"
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
    </div>
  )
}
