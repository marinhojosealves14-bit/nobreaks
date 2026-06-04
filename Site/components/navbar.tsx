"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Marcas", href: "#marcas" },
  { label: "Por que nós", href: "#diferenciais" },
  { label: "Simulador", href: "#simulador" },
  { label: "Contato", href: "#contato" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="shrink-0 flex items-center gap-3" aria-label="FTM Nobreaks">
            <Image
              src="/ftm-logo-header.png"
              alt="FTM Nobreaks"
              width={96}
              height={96}
              className="h-14 w-14 object-contain rounded-sm"
              priority
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="text-sm text-foreground/55 hover:text-foreground font-medium transition-colors duration-150 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:8132242384"
              className="text-sm text-foreground/50 hover:text-foreground font-medium transition-colors duration-150"
            >
              (81) 3224-2384
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista!"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary text-primary text-sm font-semibold px-5 py-2 rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
            >
              Falar com especialista
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-sm hover:bg-primary/90 transition-colors duration-150"
            >
              Solicitar orçamento
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Abrir menu"
            className="md:hidden text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 bg-card border-b border-border flex flex-col py-6 px-6 gap-1"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left text-base font-medium text-foreground/60 hover:text-foreground py-3 border-b border-border last:border-0 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-primary text-primary-foreground font-semibold text-sm text-center px-6 py-3 rounded-sm hover:bg-primary/90 transition-colors"
            >
              Solicitar orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
