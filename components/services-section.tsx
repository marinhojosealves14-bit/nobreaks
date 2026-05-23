"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingCart, Building2, Wrench, ShieldCheck, Clock } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="servicos" className="py-28 px-6 bg-background border-t border-border" ref={ref}>
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
            O que fazemos
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              Sua operação{" "}
              <span className="text-primary">100% ativa.</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Da aquisição à manutenção, cobrimos todo o ciclo de vida do seu nobreak com técnicos certificados.
            </p>
          </div>
        </motion.div>

        {/* Grid no estilo Engetron — cards com borda e fundo levemente elevado */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-sm overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border">

          {/* Venda — maior, col-span-2 */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={1}
            className="md:col-span-2 group p-10 lg:p-14 flex flex-col justify-between min-h-[320px] bg-card hover:bg-muted transition-colors duration-200"
          >
            <div>
              <div className="w-11 h-11 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
                <ShoppingCart className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-3" style={{ letterSpacing: "-0.03em" }}>
                Venda de Nobreaks
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Comercializamos nobreaks e estabilizadores das principais marcas do mercado.
                Assessoria técnica gratuita para escolher o equipamento certo para sua carga.
              </p>
            </div>
            <a
              href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá,%20tenho%20interesse%20em%20comprar%20um%20nobreak!"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 self-start inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-bold px-6 py-3 rounded-sm hover:bg-primary/90 transition-colors duration-150"
            >
              Solicitar orçamento &rarr;
            </a>
          </motion.div>

          {/* Locação */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={2}
            className="group p-8 flex flex-col justify-between bg-card hover:bg-muted transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <Building2 className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight mb-2">Locação</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Soluções flexíveis para eventos, obras e emergências corporativas com equipamentos de alta performance.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Segunda linha */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-x border-b border-border rounded-sm overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border mt-0">

          {/* Manutenção */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={3}
            className="group p-8 flex flex-col justify-between bg-card hover:bg-muted transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <Wrench className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight mb-2">Manutenção</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diagnóstico preciso, peças originais e reparos que prolongam a vida útil do equipamento.
              </p>
            </div>
          </motion.div>

          {/* Garantia */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={4}
            className="group p-8 flex flex-col justify-between bg-card hover:bg-muted transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <ShieldCheck className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight mb-2">Garantia de Qualidade</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Técnicos certificados e peças originais em todos os serviços realizados.
              </p>
            </div>
          </motion.div>

          {/* Resposta rápida */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={5}
            className="group p-8 flex flex-col justify-between bg-card hover:bg-muted transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight mb-2">Resposta Rápida</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Agilidade no diagnóstico para minimizar o tempo de inatividade da sua infraestrutura.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
