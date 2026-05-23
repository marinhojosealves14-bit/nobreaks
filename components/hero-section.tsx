"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">

      {/* Fundo: imagem do nobreak cobrindo tudo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-nobreak.png"
          alt="Nobreaks FTM"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-background/75" />
        {/* fade bottom */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Headline enorme — sobreposta ao produto, no topo */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 pb-0 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center font-extrabold leading-none text-balance text-white"
          style={{
            fontSize: "clamp(2.75rem, 6.4vw, 5.8rem)",
            letterSpacing: "0",
          }}
        >
          Soluções FTM
          <br />
          <span className="text-primary">Nobreaks</span>
        </motion.h1>

      </div>

      {/* Subtítulo + CTAs — na base da seção sobre o produto */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-20 pt-8 gap-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-base md:text-lg text-foreground/55 max-w-2xl leading-relaxed"
        >
          Energia garantida com proteção, velocidade de atendimento e assistência técnica especializada em Recife desde 2000.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.58 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento!"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-sm hover:bg-primary/90 transition-colors duration-150"
          >
            Solicitar orçamento &rarr;
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista!"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/25 text-foreground/80 hover:border-white/50 hover:text-foreground font-semibold text-sm px-8 py-3.5 rounded-sm transition-colors duration-150"
          >
            Falar com especialista
          </a>
        </motion.div>
      </div>

      {/* Marcas — faixa logo abaixo do hero, integrada */}
      <div className="relative z-10 border-t border-border overflow-hidden bg-background">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee">
          {[
            "SMS","NHS","APC","Schneider Electric","Engetron","Ragtech","Eaton","TS Shara","Nobreak do Brasil",
            "SMS","NHS","APC","Schneider Electric","Engetron","Ragtech","Eaton","TS Shara","Nobreak do Brasil",
          ].map((brand, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center px-10 py-5 border-r border-border"
            >
              <span className="text-xs font-bold text-foreground/25 whitespace-nowrap tracking-widest uppercase select-none">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
