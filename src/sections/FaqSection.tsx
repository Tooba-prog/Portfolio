import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import ContactButton from '../components/ContactButton'
import SectionHeading, { Accent, ORANGE } from '../components/SectionHeading'

// Drafted — Tooba should check these answers, especially timelines
const FAQS = [
  {
    question: 'What does the free SEO audit include?',
    answer:
      "I review your website's speed, mobile experience, indexing, on-page SEO and key technical issues, then send you a short list of the fixes that will make the biggest difference.",
  },
  {
    question: 'How long does it take to build a WordPress website?',
    answer:
      'It depends on the number of pages and features. After our first call I share a clear timeline, and I keep you updated at every step until launch.',
  },
  {
    question: 'Will my website be mobile-friendly and SEO-ready?',
    answer:
      'Yes. Every site I build is responsive, optimized for speed, and set up with on-page SEO basics like meta titles, descriptions, headings and clean structure.',
  },
  {
    question: 'Can I update the website myself after launch?',
    answer:
      'Absolutely. I build with WordPress and Elementor so you can edit text, images and pages yourself without any technical skills.',
  },
  {
    question: 'Do you work with clients outside Pakistan?',
    answer: 'Yes. I work remotely with businesses and agencies in different countries and communicate in English.',
  },
  {
    question: 'Do you offer support and maintenance?',
    answer:
      'Yes. I offer ongoing maintenance including updates, backups, security improvements, bug fixes and monthly SEO reporting.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-8 lg:px-[5.6vw] lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            label="faq"
            bold="Common"
            regular={
              <>
                Q<Accent>u</Accent>estions
              </>
            }
          />
          <FadeIn delay={0.15} y={20} className="flex flex-col items-start gap-6">
            <p className="max-w-sm font-inter text-[15px] leading-[1.75] text-[#666]">
              Can&apos;t find what you&apos;re looking for? Send me a message and I&apos;ll get back to you.
            </p>
            <ContactButton label="Ask a Question" />
          </FadeIn>
        </div>

        <div className="border-t border-[#E2E2E2]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <FadeIn key={faq.question} delay={i * 0.05} y={20} className="border-b border-[#E2E2E2]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left lg:py-7"
                >
                  <span className="font-exo text-[17px] font-semibold text-[#111] lg:text-[20px]">{faq.question}</span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-200 ${
                      isOpen ? 'border-[#FF6A00] bg-[#FF6A00] text-white' : 'border-[#111] text-[#111]'
                    }`}
                  >
                    <Plus
                      className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      strokeWidth={1.75}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="max-w-2xl border-l-2 pb-7 pl-5 font-inter text-[15px] leading-[1.8] text-[#666]"
                        style={{ borderColor: ORANGE }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
