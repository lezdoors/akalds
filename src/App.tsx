import { useEffect, useState } from 'react'

const NAV = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Approach', href: '#approach' },
  { label: 'Company', href: '#company' },
  { label: 'Contact', href: '#contact' },
]

const CAPABILITIES = [
  {
    eyebrow: '01',
    title: 'Digital Marketing',
    body: 'Performance-led acquisition, paid search and social, conversion engineering, and analytics — built for businesses that measure marketing in customers, not impressions.',
  },
  {
    eyebrow: '02',
    title: 'Payments Infrastructure',
    body: 'Merchant-of-record arrangements, Stripe Connect implementations, dispute resolution, and treasury workflows. We operate the rails so our portfolio companies can focus on product.',
  },
  {
    eyebrow: '03',
    title: 'Operating Ventures',
    body: 'A small portfolio of consumer and B2B brands operated under Akal — including atelier goods, energy-sector services, and emerging digital products.',
  },
]

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`group inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="font-display text-[1.05rem] font-semibold tracking-[-0.01em] text-ink-900">
        Akal
      </span>
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-500 transition-colors group-hover:text-ink-700">
        Digital Services
      </span>
    </a>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-colors ${
        scrolled ? 'bg-paper/85 border-b border-ink-100' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <Wordmark />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full border border-ink-900 px-4 py-1.5 text-sm font-medium text-ink-900 transition-all hover:bg-ink-900 hover:text-paper md:inline-flex"
        >
          Get in touch
        </a>
        <a
          href="#contact"
          className="rounded-full border border-ink-900 px-3 py-1 text-xs font-medium text-ink-900 md:hidden"
        >
          Contact
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:px-10 md:pb-40 md:pt-32">
        <p className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-ink-500">
          <span className="inline-block h-px w-6 bg-ink-300" />
          A UK holding company
        </p>
        <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.025em] text-ink-900 md:text-7xl lg:text-[5.5rem]">
          Building durable
          <br />
          digital businesses.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-600 md:mt-10 md:text-xl">
          Akal Digital Services operates and invests in marketing, payments, and consumer
          ventures. We own the infrastructure our brands run on — and the discipline that
          keeps them growing.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-14">
          <a
            href="#capabilities"
            className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper transition-all hover:bg-ink-700"
          >
            What we do
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#company"
            className="text-sm font-medium text-ink-700 underline decoration-ink-300 decoration-1 underline-offset-4 transition-colors hover:text-ink-900 hover:decoration-ink-900"
          >
            About the company
          </a>
        </div>
      </div>
      <div className="border-t border-ink-100" />
    </section>
  )
}

function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-ink-100">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-ink-500">
              Capabilities
            </p>
            <h2 className="font-display text-3xl font-medium tracking-[-0.02em] text-ink-900 md:text-4xl">
              Three disciplines,
              <br />
              run as one operation.
            </h2>
            <p className="mt-5 max-w-md text-ink-600">
              Akal is structured as a small holding company. Each capability is a profit center,
              and each compounds the others.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-px overflow-hidden rounded-2xl border border-ink-100 bg-white">
              {CAPABILITIES.map((c) => (
                <article
                  key={c.eyebrow}
                  className="group grid grid-cols-[auto,1fr] gap-x-6 gap-y-3 border-b border-ink-100 p-6 last:border-b-0 md:grid-cols-[4rem,1fr] md:p-8"
                >
                  <span className="font-mono text-xs text-ink-400 md:pt-1.5">{c.eyebrow}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-ink-900 md:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-ink-600 md:text-[0.975rem] md:leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-ink-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-ink-500">
              Approach
            </p>
            <h2 className="font-display text-3xl font-medium tracking-[-0.02em] text-ink-900 md:text-4xl">
              Operators,
              <br />
              not advisors.
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-7 text-lg leading-relaxed text-ink-700 md:space-y-8 md:text-xl">
              <p>
                We don't write strategy decks. We run businesses — owning the P&L, hiring the
                team, deploying the capital, and shipping the product.
              </p>
              <p>
                Every brand under Akal shares the same infrastructure: payments stack, analytics
                pipeline, ad accounts, compliance posture. That shared spine is what allows new
                ventures to launch in weeks instead of quarters.
              </p>
              <p>
                The model is simple. Find a category we understand, build the cleanest possible
                operation inside it, and reinvest cash flow into the next one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Company() {
  const items = [
    { label: 'Entity', value: 'Akal Digital Services Ltd' },
    { label: 'Jurisdiction', value: 'England & Wales' },
    { label: 'Registered Office', value: 'London, United Kingdom' },
    { label: 'Status', value: 'In formation' },
  ]
  return (
    <section id="company" className="border-b border-ink-100">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-ink-500">
              Company
            </p>
            <h2 className="font-display text-3xl font-medium tracking-[-0.02em] text-ink-900 md:text-4xl">
              Registered in
              <br />
              the United Kingdom.
            </h2>
            <p className="mt-5 max-w-md text-ink-600">
              Akal Digital Services Ltd is a private limited company. Statutory filings,
              accounts, and the public register are maintained with Companies House.
            </p>
          </div>
          <div className="md:col-span-8">
            <dl className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
              {items.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[10rem,1fr] gap-6 px-6 py-5 md:grid-cols-[14rem,1fr] md:px-8 md:py-6"
                >
                  <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-500 md:text-sm">
                    {row.label}
                  </dt>
                  <dd className="text-ink-900 md:text-lg">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-ink-900 text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-ink-300">
              Contact
            </p>
            <h2 className="font-display text-4xl font-medium tracking-[-0.025em] md:text-6xl">
              Press, partnerships,
              <br />
              opportunities.
            </h2>
            <p className="mt-6 max-w-xl text-ink-300 md:text-lg">
              The fastest way to reach Akal is by email. We read everything; we reply
              to what we can move forward.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
                  General
                </p>
                <a
                  href="mailto:hello@akalds.com"
                  className="mt-2 inline-block font-display text-2xl font-medium tracking-[-0.01em] underline decoration-ink-600 decoration-1 underline-offset-[6px] transition-colors hover:decoration-paper md:text-3xl"
                >
                  hello@akalds.com
                </a>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
                  Operations
                </p>
                <a
                  href="mailto:contact@akalds.com"
                  className="mt-2 inline-block font-display text-2xl font-medium tracking-[-0.01em] underline decoration-ink-600 decoration-1 underline-offset-[6px] transition-colors hover:decoration-paper md:text-3xl"
                >
                  contact@akalds.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink-900 text-ink-400">
      <div className="mx-auto max-w-6xl px-6 pb-10 md:px-10">
        <div className="border-t border-ink-700 pt-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-sm font-semibold text-paper">Akal</span>
              <span className="text-[0.7rem] uppercase tracking-[0.22em] text-ink-400">
                Digital Services
              </span>
            </div>
            <p className="text-xs text-ink-500">
              © {year} Akal Digital Services Ltd. Registered in England & Wales.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <Approach />
        <Company />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
