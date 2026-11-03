import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Clock, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import SocialIcon from '../components/SocialIcon'
import SectionHeading, { Accent, SectionLabel } from '../components/SectionHeading'
import { FREE_AUDIT, SELECT_SERVICE_EVENT, SITE, whatsappLink } from '../data/site'

const SERVICE_OPTIONS = [
  'WordPress Development',
  'Website Redesign',
  'On-Page SEO',
  'Technical SEO',
  'Off-Page SEO',
  FREE_AUDIT,
  'Something else',
]

const LINKEDIN = SITE.socials.find((social) => social.label === 'LinkedIn')?.href

// Underlined fields, like the line under the hero's links
const FIELD =
  'w-full border-b border-[#CFCFCF] bg-transparent py-3 font-inter text-[15px] text-[#111] placeholder:text-[#AAAAAA] outline-none transition-colors duration-200 focus:border-[#111]'

const LABEL = 'block font-inter text-[12px] lowercase text-[#888]'

// Web3Forms access key (set VITE_WEB3FORMS_KEY in .env.local and in Vercel). It is safe to expose.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error'

const STATUS_TEXT: Record<Status, string> = {
  idle: 'I usually reply within 24 hours.',
  sending: 'Sending your message...',
  success: 'Thanks! Your message has been sent. I’ll get back to you soon.',
  error: 'Something went wrong. Please try again or email me directly.',
}

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [service, setService] = useState(SERVICE_OPTIONS[0])

  // Buttons elsewhere (e.g. "Get Free SEO Audit") pre-select a service before scrolling here
  useEffect(() => {
    const pick = (e: Event) => setService((e as CustomEvent<string>).detail)
    window.addEventListener(SELECT_SERVICE_EVENT, pick)
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, pick)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name'))
    const email = String(data.get('email'))
    const service = String(data.get('service'))
    const message = String(data.get('message'))
    const subject = `New project inquiry — ${service}`

    // Without a key, fall back to opening the visitor's email app so the form still works
    if (!WEB3FORMS_KEY) {
      const body = `Hi ${SITE.firstName},\n\n${message}\n\n— ${name}\n${email}`
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: `${SITE.name} Portfolio`,
          name,
          email,
          service,
          message,
          botcheck: data.get('botcheck') === 'on',
        }),
      })
      const result = await response.json()
      if (!result.success) throw new Error(result.message)
      setStatus('success')
      form.reset()
      setService(SERVICE_OPTIONS[0])
    } catch {
      setStatus('error')
    }
  }

  const details = [
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    // Shown only once a WhatsApp number is set in site.ts
    ...(SITE.whatsapp
      ? [{ icon: MessageCircle, label: 'WhatsApp', value: SITE.whatsappDisplay, href: whatsappLink(), external: true }]
      : []),
    ...(LINKEDIN ? [{ icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/tooba-farid', href: LINKEDIN, external: true }] : []),
    { icon: MapPin, label: 'Location', value: SITE.location },
    { icon: Clock, label: 'Response time', value: SITE.availability },
  ] as { icon: typeof Mail; label: string; value: string; href?: string; external?: boolean }[]

  return (
    <section id="contact" className="bg-white px-4 py-20 sm:px-8 lg:px-[5.6vw] lg:py-28">
      <div className="grid gap-12 bg-[#F7F7F7] px-5 py-14 sm:px-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-14 lg:py-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <SectionHeading
              label="contact"
              bold="Get In"
              regular={
                <>
                  T<Accent>o</Accent>uch
                </>
              }
            />
            <FadeIn delay={0.15} y={20}>
              <p className="max-w-md font-inter text-[15px] leading-[1.75] text-[#666] lg:text-[16px]">
                Have a project in mind? Tell me a little about it and let&apos;s build something incredible together.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} y={20} className="flex flex-col">
            {details.map(({ icon: Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-[#FF6A00]">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-inter text-[12px] lowercase text-[#888]">{label}</span>
                    <span className="block break-words font-exo text-[17px] font-medium text-[#111] lg:text-[19px]">{value}</span>
                  </span>
                </>
              )
              const classes = 'flex items-center gap-4 border-b border-[#E2E2E2] py-4 first:pt-0'

              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${classes} transition-colors duration-200 hover:text-[#FF6A00]`}
                >
                  {content}
                </a>
              ) : (
                <div key={label} className={classes}>
                  {content}
                </div>
              )
            })}

            <div className="mt-8 flex flex-col gap-4">
              <SectionLabel>follow me</SectionLabel>
              <div className="flex gap-3">
                {SITE.socials.map((social) => (
                  <SocialIcon key={social.label} {...social} />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.25} y={30}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 bg-white p-6 sm:p-8 lg:p-10">
            <div className="grid gap-7 sm:grid-cols-2">
              <label>
                <span className={LABEL}>name</span>
                <input name="name" required autoComplete="name" placeholder="Your name" className={FIELD} />
              </label>
              <label>
                <span className={LABEL}>email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={FIELD} />
              </label>
            </div>
            <label>
              <span className={LABEL}>service</span>
              <select
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${FIELD} cursor-pointer`}
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={LABEL}>message</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project, timeline and budget..."
                className={`${FIELD} resize-none`}
              />
            </label>

            {/* Honeypot: hidden from people, bots that tick it get rejected by Web3Forms */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p
                className={`text-center font-inter text-[13px] sm:text-left ${
                  status === 'success' ? 'text-[#111]' : status === 'error' ? 'text-[#D93025]' : 'text-[#888]'
                }`}
                aria-live="polite"
              >
                {STATUS_TEXT[status]}
              </p>
              <ContactButton
                type="submit"
                label={status === 'sending' ? 'Sending...' : 'Send Message'}
                disabled={status === 'sending'}
                className="shrink-0"
              />
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  )
}
