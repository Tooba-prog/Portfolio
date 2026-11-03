import { MessageCircle } from 'lucide-react'
import { SITE, whatsappLink } from '../data/site'

// Floating chat button; renders nothing until a WhatsApp number is set in site.ts
export default function WhatsAppButton() {
  if (!SITE.whatsapp) return null

  return (
    <a
      href={whatsappLink(`Hi ${SITE.firstName}, I found your portfolio and would like to discuss a project.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={1.75} />
    </a>
  )
}
