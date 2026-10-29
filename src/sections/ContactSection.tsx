import { useState } from 'react'
import type { FormEvent } from 'react'
import { Clock, Mail, MapPin } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import SocialIcon from '../components/SocialIcon'
import { SITE } from '../data/site'

const SERVICE_OPTIONS = ['3D Modeling', 'Rendering', 'Motion Design', 'Branding', 'Web Design', 'Something else']

const FIELD =
  'w-full rounded-[28px] border-2 border-[#D7E2EA]/25 bg-transparent px-6 py-4 font-light text-[#D7E2EA] placeholder:text-[#D7E2EA]/40 outline-none transition-colors duration-200 focus:border-[#D7E2EA]'

const LABEL = 'mb-2 block pl-2 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60'

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
      const body = `Hi ${SITE.name},\n\n${message}\n\n— ${name}\n${email}`
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
    } catch {
      setStatus('error')
    }
  }

  const details = [
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: 'Location', value: SITE.location },
    { icon: Clock, label: 'Response time', value: SITE.availability },
  ]

  return (
    <section id="contact" className="relative bg-[#0C0C0C] px-5 pb-20 pt-10 sm:px-8 sm:pb-24 md:px-10 md:pb-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, #7621B0 0%, #B600A8 40%, transparent 70%)' }}
      />

      <FadeIn delay={0} y={40} className="relative">
        <h2
          className="hero-heading mb-6 text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Contact
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20} className="relative">
        <p
          className="mx-auto mb-16 max-w-xl text-center font-light leading-relaxed text-[#D7E2EA]/70 sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
        >
          Have a project in mind? Tell me a little about it and let&apos;s build something incredible together.
        </p>
      </FadeIn>

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <FadeIn delay={0.15} x={-40} y={0} className="flex flex-col gap-4">
          {details.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#D7E2EA]/25 text-[#D7E2EA]">
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">{label}</span>
                  <span className="block break-words font-light text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}>
                    {value}
                  </span>
                </span>
              </>
            )
            const classes = 'flex items-center gap-5 rounded-[32px] border-2 border-[#D7E2EA]/15 p-5 sm:p-6'

            return href ? (
              <a key={label} href={href} className={`${classes} transition-colors duration-200 hover:border-[#D7E2EA]`}>
                {content}
              </a>
            ) : (
              <div key={label} className={classes}>
                {content}
              </div>
            )
          })}

          <div className="mt-4 flex flex-col gap-4 pl-2">
            <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">Follow me</span>
            <div className="flex gap-3">
              {SITE.socials.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25} x={40} y={0}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-[40px] border-2 border-[#D7E2EA] p-6 sm:rounded-[50px] sm:p-8 md:rounded-[60px] md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <span className={LABEL}>Name</span>
                <input name="name" required autoComplete="name" placeholder="Your name" className={FIELD} />
              </label>
              <label>
                <span className={LABEL}>Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={FIELD} />
              </label>
            </div>
            <label>
              <span className={LABEL}>Service</span>
              <select name="service" defaultValue={SERVICE_OPTIONS[0]} className={`${FIELD} appearance-none`}>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-[#0C0C0C]">
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={LABEL}>Message</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project, timeline and budget..."
                className={`${FIELD} resize-none`}
              />
            </label>

            {/* Honeypot: hidden from people, bots that tick it get rejected by Web3Forms */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p
                className={`text-center text-sm font-light sm:text-left ${
                  status === 'success' ? 'text-[#D7E2EA]' : status === 'error' ? 'text-[#FF7A7A]' : 'text-[#D7E2EA]/50'
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
