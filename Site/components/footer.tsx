import Image from "next/image"

const footerLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Marcas", href: "#marcas" },
  { label: "Por que nós", href: "#diferenciais" },
  { label: "Simulador", href: "#simulador" },
  { label: "Contato", href: "#contato" },
]

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Image
            src="/ftm-logo-site.png"
            alt="FTM Nobreaks"
            width={112}
            height={112}
            className="h-20 w-20 object-contain rounded-sm"
          />
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            Assistência técnica especializada em nobreaks e estabilizadores.
            Venda, locação e manutenção em Recife-PE.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">Navegação</p>
          <ul className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">Contato</p>
          <ul className="flex flex-col gap-3">
            {[
              { text: "(81) 3224-2384", href: "tel:8132242384" },
              { text: "(81) 98622-5485", href: "https://api.whatsapp.com/send/?phone=5581986225485&text&type=phone_number&app_absent=0" },
              { text: "ftmnobreaks@gmail.com", href: "mailto:ftmnobreaks@gmail.com" },
              {
                text: "Rua Sargento Melo Junior, 135 — Loja 07, Recife-PE",
                href: "https://www.google.com/maps/place/FTM+NOBREAK/@-8.1341317,-34.9139652,17z/data=!3m1!4b1!4m6!3m5!1s0x7ab1f75f4407195:0x65f025270936184e!8m2!3d-8.134137!4d-34.9113903!16s%2Fg%2F11xt44w289?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
              },
            ].map((item) => (
              <li key={item.text}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} FTM Nobreaks. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-muted-foreground">
            Boa Viagem, Recife &mdash; PE
          </p>
        </div>
      </div>
    </footer>
  )
}
