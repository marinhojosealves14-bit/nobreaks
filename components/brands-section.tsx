"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const brands = [
  "SMS", "NHS", "APC", "Schneider Electric",
  "Engetron", "Ragtech", "Eaton", "TS Shara", "Nobreak do Brasil",
]

const marqueeItems = [...brands, ...brands]

export default function BrandsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="marcas" className="py-28 bg-background border-t border-border" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-4">
              Marcas Parceiras
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              Trabalhamos com os{" "}
              <span className="text-primary">maiores fabricantes.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Parceiros que garantem qualidade nos equipamentos que vendemos, locamos e mantemos.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative border border-border rounded-sm overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {marqueeItems.map((brand, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center justify-center px-12 py-7 border-r border-border select-none cursor-default"
              >
                <span className="text-sm font-bold text-foreground/30 whitespace-nowrap tracking-wide hover:text-primary transition-colors duration-200">
                  {brand}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grid mobile fallback */}
        <div className="md:hidden mt-4 grid grid-cols-3 border border-border rounded-sm overflow-hidden divide-x divide-y divide-border">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center justify-center py-5 px-3 bg-card">
              <span className="text-[11px] font-bold text-foreground/30 text-center leading-tight">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
