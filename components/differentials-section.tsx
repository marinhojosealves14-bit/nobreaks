"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BadgeCheck, TrendingUp, Users, MapPin } from "lucide-react"

const items = [
  {
    icon: BadgeCheck,
    title: "Técnicos Certificados",
    description:
      "Equipe com certificações específicas nas principais marcas, garantindo diagnósticos precisos e reparos de qualidade.",
    metric: "100%",
    metricLabel: "dos serviços com técnico certificado",
  },
  {
    icon: TrendingUp,
    title: "Referência em Recife",
    description:
      "Décadas de atuação nos tornaram a principal referência em manutenção e venda de nobreaks na região metropolitana.",
    metric: "20+",
    metricLabel: "anos no mercado",
  },
  {
    icon: Users,
    title: "Atendimento Personalizado",
    description:
      "Cada cliente recebe uma solução sob medida, desde pequenos escritórios até grandes infraestruturas corporativas.",
    metric: "9+",
    metricLabel: "marcas no portfólio",
  },
  {
    icon: MapPin,
    title: "Localização Estratégica",
    description:
      "Situados em Boa Viagem, Recife-PE — Rua Sargento Melo Junior, 135, Loja 07.",
    metric: "Boa Viagem",
    metricLabel: "Recife — PE",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
}

export default function DifferentialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="diferenciais" className="py-28 px-6 bg-background border-t border-border" ref={ref}>
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
            Por que escolher a FTM
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance leading-none max-w-2xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Confiança medida em{" "}
            <span className="text-primary">anos de resultado.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border border-border rounded-sm overflow-hidden divide-x divide-y divide-border">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={i + 1}
              className="group p-10 flex flex-col justify-between min-h-[220px] bg-card hover:bg-muted transition-colors duration-200"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-9 h-9 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
                  <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground tracking-tight">{item.metric}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{item.metricLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
