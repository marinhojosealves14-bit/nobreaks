"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react"

const contacts = [
  {
    icon: Phone,
    label: "Telefone / WhatsApp",
    values: ["(81) 3224-2384", "(81) 98622-5485"],
    href: "https://api.whatsapp.com/send/?phone=5581986225485&text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista!",
    external: true,
  },
  {
    icon: Mail,
    label: "E-mail",
    values: ["ftmnobreaks@gmail.com"],
    href: "mailto:ftmnobreaks@gmail.com",
    external: false,
  },
  {
    icon: Instagram,
    label: "Instagram",
    values: ["@ftmnobreak"],
    href: "https://www.instagram.com/ftmnobreak/",
    external: true,
  },
  {
    icon: MapPin,
    label: "Endereço",
    values: ["Rua Sargento Melo Junior, 135", "Loja 07 — Recife, PE 51030-550"],
    href: "https://www.google.com/maps/place/FTM+NOBREAK/@-8.1341317,-34.9139652,17z/data=!3m1!4b1!4m6!3m5!1s0x7ab1f75f4407195:0x65f025270936184e!8m2!3d-8.134137!4d-34.9113903!16s%2Fg%2F11xt44w289?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
    external: true,
  },
]

const mapsUrl =
  "https://www.google.com/maps/place/FTM+NOBREAK/@-8.1341317,-34.9139652,17z/data=!3m1!4b1!4m6!3m5!1s0x7ab1f75f4407195:0x65f025270936184e!8m2!3d-8.134137!4d-34.9113903!16s%2Fg%2F11xt44w289?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
const mapsEmbedUrl =
  "https://www.google.com/maps?q=FTM%20NOBREAK%20Rua%20Sargento%20Melo%20Junior%20135%20Loja%2007%20Recife&z=17&output=embed"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="contato" className="py-28 px-6 bg-background border-t border-border" ref={ref}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-4">
            Fale Conosco
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance leading-none max-w-2xl"
              style={{ letterSpacing: "-0.04em" }}
            >
              Pronto para proteger{" "}
              <span className="text-primary">sua infraestrutura?</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Entre em contato e receba um orçamento personalizado sem compromisso.
            </p>
          </div>
        </motion.div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-sm overflow-hidden divide-x divide-y divide-border mb-4">
          {contacts.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i + 1}
              className="group p-8 flex flex-col gap-5 min-h-[160px] bg-card hover:bg-muted transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-semibold">{item.label}</div>
                {item.values.map((v) => (
                  <div key={v} className="text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors duration-150 leading-snug">
                    {v}
                  </div>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={5}
          className="mb-4 overflow-hidden rounded-sm border border-border bg-card"
        >
          <div className="flex flex-col gap-3 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-foreground">FTM Nobreak</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Rua Sargento Melo Junior, 135 — Loja 07, Recife-PE
              </p>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-primary px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Abrir no Google Maps
            </a>
          </div>
          <iframe
            title="Mapa da FTM Nobreak"
            src={mapsEmbedUrl}
            className="h-[320px] w-full border-0 grayscale md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        {/* CTA WhatsApp — banner full-width estilo Stripe */}
        <motion.a
          href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá,%20gostaria%20de%20agendar%20uma%20consultoria%20técnica!"
          target="_blank"
          rel="noopener noreferrer"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={6}
          className="group flex items-center justify-between border border-border rounded-sm px-10 py-8 bg-card hover:border-primary/40 hover:bg-muted transition-all duration-200"
        >
          <div>
            <p className="text-lg font-bold tracking-tight mb-1">Agendar Consultoria Técnica</p>
            <p className="text-sm text-muted-foreground">Resposta em minutos via WhatsApp — sem compromisso.</p>
          </div>
          <div           className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-sm group-hover:bg-primary/90 transition-colors duration-150 shrink-0 ml-6">
            <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
            (81) 98622-5485
          </div>
        </motion.a>
      </div>
    </section>
  )
}
