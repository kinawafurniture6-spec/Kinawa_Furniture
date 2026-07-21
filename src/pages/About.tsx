import { Reveal } from '../components/Reveal'
import type { Page } from '../App'
import type { SiteData } from '../data/useSiteStore'

interface AboutProps {
  onNavigate: (page: Page) => void
  siteData?: SiteData
}

export default function About({ onNavigate, siteData }: AboutProps) {
  const about = siteData?.aboutPage || {
    subtitle: 'Our Story',
    titlePart1: 'Built on Craft,',
    titlePart2: 'Rooted in',
    titleHighlight: 'Nature.',
    heroImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&h=685&fit=crop&auto=format',
    storyTitle: 'From a Small Workshop in Jepara, 2012',
    storyP1: 'Kinawa Furniture started with a single craftsman...',
    storyP2: 'Over the past twelve years, we\'ve grown to a team of fifteen master craftsmen...',
    storyP3: 'We still work the same way we did in 2012...',
    storyImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=875&fit=crop&auto=format',
    values: [
      { title: 'Handcrafted', desc: 'Every joint, every weave is done by hand.' },
      { title: 'Natural Materials', desc: 'We source rattan from ethically managed forests.' },
      { title: 'Built to Endure', desc: 'Designed for decades of use.' },
      { title: 'Made to Order', desc: 'Every piece is custom.' },
    ],
  }

  return (
    <div className="bg-ivory pt-24">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-sandstone mb-4 font-semibold">{about.subtitle}</p>
          <h1
            className="text-5xl md:text-7xl font-light text-charcoal leading-[1.05] max-w-2xl"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            {about.titlePart1}
            <br />
            {about.titlePart2}
            <br />
            <em className="not-italic text-rattan">{about.titleHighlight}</em>
          </h1>
        </Reveal>
      </div>

      {/* Full image */}
      <Reveal>
        <div className="w-full aspect-[21/9] overflow-hidden bg-sandstone/20">
          <img
            src={about.heroImage}
            alt="Craftsmen at work"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </Reveal>

      {/* Story + photo */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <h2
                  className="text-3xl md:text-4xl font-light text-charcoal leading-tight mb-8"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  {about.storyTitle}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base text-charcoal/65 leading-relaxed mb-5">
                  {about.storyP1}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-base text-charcoal/65 leading-relaxed mb-5">
                  {about.storyP2}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  {about.storyP3}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden bg-sandstone/20">
                  <img
                    src={about.storyImage}
                    alt="Natural rattan material close-up"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-16">
              <p className="text-[11px] tracking-[0.25em] uppercase text-sandstone mb-3 font-semibold">
                What We Stand For
              </p>
              <h2
                className="text-4xl font-light text-charcoal"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                Our Core Values
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="border border-sandstone/15 p-8 bg-ivory/40 h-full">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-sandstone font-medium block mb-4">
                    0{i + 1}
                  </span>
                  <h3
                    className="text-xl font-light text-charcoal mb-3"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ivory text-center border-t border-charcoal/10">
        <div className="max-w-xl mx-auto px-6">
          <Reveal>
            <h2
              className="text-3xl font-light text-charcoal mb-4"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              Have a Custom Request in Mind?
            </h2>
            <p className="text-sm text-charcoal/60 leading-relaxed mb-8">
              We work directly with homeowners, architects, and interior designers.
            </p>
            <button
              onClick={() => onNavigate('quote')}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-ivory bg-rattan hover:bg-charcoal px-8 py-4 transition-colors duration-300"
            >
              Request a Custom Quote
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
