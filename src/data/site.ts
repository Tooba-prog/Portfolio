// Personal details used across the site — replace these with your own
export const SITE = {
  name: 'Tooba Farid',
  firstName: 'Tooba',
  email: 'toobafarid242@gmail.com',
  // WhatsApp number in international format, digits only (e.g. '923001234567').
  // Leave empty to hide the WhatsApp button and contact row.
  whatsapp: '',
  location: 'Punjab, Pakistan',
  availability: 'Usually replies within 24 hours',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tooba-farid/' },
    { label: 'Twitter', href: 'https://x.com/' },
  ],
}

export const whatsappLink = (message = '') =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

// Picking a service from outside the contact section (e.g. "Get Free SEO Audit")
export const FREE_AUDIT = 'Free SEO Audit'
export const SELECT_SERVICE_EVENT = 'select-service'
export const selectService = (service: string) =>
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service }))
