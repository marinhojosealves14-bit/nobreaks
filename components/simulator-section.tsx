"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Monitor,
  Server,
  Wifi,
  Camera,
  Tv,
  Printer,
  Plus,
  Minus,
  Zap,
  WrenchIcon,
  ShoppingCart,
  CalendarClock,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"

/* ─── Aparelhos predefinidos ─────────────────────────────── */
const APPLIANCES = [
  { id: "pc_gamer",   label: "PC Gamer",          icon: Monitor,  watts: 450 },
  { id: "servidor",   label: "Servidor",           icon: Server,   watts: 600 },
  { id: "roteador",   label: "Roteador",           icon: Wifi,     watts: 20  },
  { id: "dvr",        label: "DVR de Câmeras",     icon: Camera,   watts: 30  },
  { id: "tv",         label: "TV 55\"",            icon: Tv,       watts: 120 },
  { id: "impressora", label: "Impressora Laser",   icon: Printer,  watts: 400 },
]

/* ─── Sintomas de conserto ───────────────────────────────── */
const SYMPTOMS = [
  {
    id: "no_power",
    label: "Não liga",
    detail: "Sem LED, sem display ou sem resposta ao botão.",
    likely: "bateria em curto, fusível, fonte interna ou placa de potência",
    urgency: "Alta",
    action: "Evite insistir ligando várias vezes.",
  },
  {
    id: "beeping",
    label: "Apita constantemente",
    detail: "Alarme sonoro mesmo com energia normal na tomada.",
    likely: "bateria vencida, sobrecarga, falha no carregador ou erro interno",
    urgency: "Média",
    action: "Confira se a carga conectada não passou do limite.",
  },
  {
    id: "no_load",
    label: "Não segura carga",
    detail: "Desliga rápido quando falta energia.",
    likely: "baterias sem autonomia, bateria sulfadata ou banco mal dimensionado",
    urgency: "Alta",
    action: "Indicado teste de autonomia e troca preventiva.",
  },
  {
    id: "fast_discharge",
    label: "Bateria descarrega rápido",
    detail: "Autonomia caiu muito em relação ao normal.",
    likely: "fim de vida útil das baterias ou consumo acima do recomendado",
    urgency: "Média",
    action: "Precisamos medir carga, tensão e tempo real de autonomia.",
  },
  {
    id: "overload",
    label: "Indica sobrecarga",
    detail: "Luz/aviso de overload, falha ou desligamento com equipamentos ligados.",
    likely: "equipamentos demais conectados ou potência VA insuficiente",
    urgency: "Alta",
    action: "Desligue parte da carga antes de novo teste.",
  },
  {
    id: "heating",
    label: "Aquece ou tem cheiro forte",
    detail: "Aquecimento excessivo, cheiro de queimado ou ruído fora do comum.",
    likely: "ventilação, capacitor, transformador, placa ou bateria em falha",
    urgency: "Crítica",
    action: "Desligue da tomada e solicite avaliação técnica.",
  },
  {
    id: "switching",
    label: "Fica alternando modo rede/bateria",
    detail: "Entra e sai do modo bateria mesmo com energia na tomada.",
    likely: "rede elétrica instável, relé, sensor de entrada ou calibração",
    urgency: "Média",
    action: "Pode exigir teste da rede e calibração do nobreak.",
  },
  {
    id: "not_charging",
    label: "Não carrega a bateria",
    detail: "Fica sempre com bateria baixa ou não completa carga.",
    likely: "carregador interno, bateria danificada ou conexão no banco",
    urgency: "Alta",
    action: "Não resolve só deixando mais tempo na tomada.",
  },
  {
    id: "turns_off",
    label: "Desliga sozinho",
    detail: "Apaga durante uso normal, mesmo sem queda de energia.",
    likely: "sobrecarga, superaquecimento, bateria ruim ou falha de placa",
    urgency: "Alta",
    action: "Registre quando ocorre: ao ligar carga, em bateria ou em rede.",
  },
  {
    id: "preventive",
    label: "Quero revisão preventiva",
    detail: "Está funcionando, mas precisa de checagem antes de falhar.",
    likely: "limpeza, teste de autonomia, baterias, bornes e ventilação",
    urgency: "Baixa",
    action: "Ideal para empresas, condomínios e equipamentos críticos.",
  },
]

/* ─── Helpers ────────────────────────────────────────────── */
const POWER_FACTOR = 0.7
function wattsToVA(w: number) { return Math.round(w / POWER_FACTOR) }
function recommendedSize(va: number) {
  if (va <= 600)   return "700 VA"
  if (va <= 1050)  return "1200 VA"
  if (va <= 1400)  return "1500 VA"
  if (va <= 2100)  return "2200 VA"
  if (va <= 2800)  return "3000 VA"
  return "Solução Trifásica (acima de 3000 VA)"
}

/* ─── Tipos ──────────────────────────────────────────────── */
type Tab = "simulador" | "conserto" | "comparativo"
type Qty  = Record<string, number>

/* ─── Componente principal ───────────────────────────────── */
export default function SimulatorSection() {
  const [activeTab, setActiveTab] = useState<Tab>("simulador")

  /* — Simulador — */
  const [qty, setQty]           = useState<Qty>({})
  const [customW, setCustomW]   = useState<string>("")
  const [choiceMode, setChoiceMode] = useState<"compra" | "aluguel" | null>(null)

  /* — Conserto — */
  const [symptoms, setSymptoms] = useState<Record<string, boolean>>({})
  const [repairDone, setRepairDone] = useState(false)

  /* ─── Cálculos ─── */
  const totalWatts = useMemo(() => {
    const fromAppliances = APPLIANCES.reduce(
      (sum, a) => sum + (qty[a.id] ?? 0) * a.watts, 0
    )
    const fromCustom = parseFloat(customW) || 0
    return fromAppliances + fromCustom
  }, [qty, customW])

  const totalVA = wattsToVA(totalWatts)
  const maxVA   = 4000
  const pct     = Math.min((totalVA / maxVA) * 100, 100)

  const barColor =
    pct < 50  ? "#00BFFF" :
    pct < 80  ? "#f59e0b" : "#ef4444"

  function changeQty(id: string, delta: number) {
    setQty(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }))
  }

  function toggleSymptom(id: string) {
    setSymptoms(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const selectedSymptoms = Object.values(symptoms).filter(Boolean).length
  const selectedSymptomItems = SYMPTOMS.filter(symptom => symptoms[symptom.id])
  const repairMessage = encodeURIComponent(
    `Olá! Meu nobreak está com problema. Sintomas: ${selectedSymptomItems
      .map(symptom => `${symptom.label} (${symptom.likely})`)
      .join("; ")}. Podem me ajudar com uma avaliação técnica?`
  )

  const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "simulador",  label: "Calcular Potência", icon: Zap          },
    { key: "conserto",   label: "Diagnóstico",       icon: WrenchIcon   },
    { key: "comparativo",label: "Compra vs. Aluguel",icon: CalendarClock},
  ]

  return (
    <section id="simulador" className="relative bg-card py-28 border-t border-border px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-5">
            Ferramenta Interativa
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance"
            style={{ letterSpacing: "-0.04em" }}
          >
            Simulador de Energia
          </h2>
          <p className="mt-4 text-foreground/45 text-sm max-w-lg mx-auto leading-relaxed">
            Descubra qual nobreak você precisa — ou diagnostique se o seu pode ser consertado.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-card border border-border rounded-md p-1 mb-8 gap-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[5px] text-sm font-semibold transition-all duration-200 ${
                activeTab === key
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Panels */}
        <AnimatePresence mode="wait">
          {/* ── TAB 1 — Simulador ── */}
          {activeTab === "simulador" && (
            <motion.div
              key="simulador"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Aparelhos */}
              <div className="bg-card border border-border rounded-md p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-5">
                  Selecione seus aparelhos
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {APPLIANCES.map(({ id, label, icon: Icon, watts }) => {
                    const count = qty[id] ?? 0
                    return (
                      <div
                        key={id}
                        className={`flex flex-col gap-3 p-4 rounded-md border transition-all duration-200 ${
                          count > 0
                            ? "border-primary/50 bg-primary/8"
                            : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 shrink-0 ${count > 0 ? "text-primary" : "text-foreground/40"}`} />
                          <span className="text-sm font-medium leading-tight">{label}</span>
                        </div>
                        <span className="text-xs text-foreground/35">{watts} W</span>
                        <div className="flex items-center gap-2 mt-auto">
                          <button
                            onClick={() => changeQty(id, -1)}
                            disabled={count === 0}
                            className="w-7 h-7 flex items-center justify-center rounded-sm border border-border text-foreground/50 hover:text-foreground hover:border-border disabled:opacity-25 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{count}</span>
                          <button
                            onClick={() => changeQty(id, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-sm border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Potência manual */}
                <div className="mt-5 flex items-center gap-3">
                  <label className="text-xs text-foreground/40 whitespace-nowrap">
                    + Outros (Watts)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={customW}
                    onChange={e => setCustomW(e.target.value)}
                    placeholder="0"
                    className="w-full bg-background border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <span className="text-xs text-foreground/40">W</span>
                </div>
              </div>

              {/* Resultado — barra de carga */}
              <div className="bg-card border border-border rounded-md p-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-1">
                      Potência total necessária
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold tracking-tight" style={{ color: barColor }}>
                        {totalVA.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-lg text-foreground/40 font-medium">VA</span>
                      <span className="text-foreground/30 text-sm ml-1">
                        ({totalWatts.toLocaleString("pt-BR")} W)
                      </span>
                    </div>
                  </div>
                  {/* Circular ring */}
                  <div className="relative w-20 h-20 shrink-0">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#ffffff08" strokeWidth="6" />
                      <circle
                        cx="40" cy="40" r="34" fill="none"
                        stroke={barColor}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 34}`}
                        strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
                        style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.4s ease" }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: barColor }}>
                      {Math.round(pct)}%
                    </span>
                  </div>
                </div>

                {/* Barra linear */}
                <div className="h-2 bg-card/6 rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: barColor, boxShadow: `0 0 12px ${barColor}60` }}
                  />
                </div>

                {/* Recomendação */}
                {totalVA > 0 ? (
                  <div className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-md px-4 py-3">
                    <Zap className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm text-foreground/80">
                      Recomendamos um nobreak de no mínimo{" "}
                      <span className="font-bold text-primary">{recommendedSize(totalVA)}</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-foreground/30 text-center py-2">
                    Adicione aparelhos acima para ver a recomendação.
                  </p>
                )}
              </div>

              {/* Modo de aquisição */}
              {totalVA > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {(["compra", "aluguel"] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setChoiceMode(mode === choiceMode ? null : mode)}
                      className={`flex flex-col items-start gap-2 p-5 rounded-md border transition-all duration-200 text-left ${
                        choiceMode === mode
                          ? "border-primary bg-primary/10 shadow-[0_0_24px_rgba(0,191,255,0.15)]"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      {mode === "compra"
                        ? <ShoppingCart className={`w-5 h-5 ${choiceMode === mode ? "text-primary" : "text-foreground/40"}`} />
                        : <CalendarClock className={`w-5 h-5 ${choiceMode === mode ? "text-primary" : "text-foreground/40"}`} />
                      }
                      <span className="font-bold capitalize">{mode === "compra" ? "Comprar" : "Alugar"}</span>
                      <span className="text-xs text-foreground/40 leading-snug">
                        {mode === "compra"
                          ? "Investimento único, equipamento próprio"
                          : "Mensalidade fixa, manutenção inclusa"}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* CTA final */}
              {choiceMode && totalVA > 0 && (
                <motion.a
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  href={`https://api.whatsapp.com/send/?phone=5581986225485&text=Olá!%20Fiz%20o%20simulador%20e%20preciso%20de%20um%20nobreak%20de%20${recommendedSize(totalVA)}.%20Tenho%20interesse%20em%20${choiceMode === "compra" ? "comprar" : "alugar"}.%20Podem%20me%20passar%20um%20orçamento%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-sm py-4 rounded-sm hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 shadow-[0_0_30px_rgba(0,191,255,0.2)]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Receber orçamento para {choiceMode === "compra" ? "Compra" : "Aluguel"} — {recommendedSize(totalVA)}
                </motion.a>
              )}
            </motion.div>
          )}

          {/* ── TAB 2 — Conserto ── */}
          {activeTab === "conserto" && (
            <motion.div
              key="conserto"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="bg-card border border-border rounded-md p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-5">
                  Quais sintomas seu nobreak apresenta?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SYMPTOMS.map(({ id, label, detail, urgency }) => {
                    const checked = !!symptoms[id]
                    return (
                      <button
                        key={id}
                        onClick={() => { toggleSymptom(id); setRepairDone(false) }}
                        className={`flex items-start gap-3 p-4 rounded-md border text-left transition-all duration-200 ${
                          checked
                            ? "border-amber-500/50 bg-amber-500/8 text-foreground"
                            : "border-border bg-background hover:border-border text-foreground/60"
                        }`}
                      >
                        {checked
                          ? <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                          : <AlertTriangle className="w-5 h-5 text-foreground/25 shrink-0 mt-0.5" />
                        }
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 text-sm font-semibold">
                            {label}
                            <span className={`text-[10px] uppercase tracking-wide ${
                              urgency === "Crítica"
                                ? "text-red-400"
                                : urgency === "Alta"
                                  ? "text-amber-400"
                                  : "text-foreground/35"
                            }`}>
                              {urgency}
                            </span>
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-foreground/40">
                            {detail}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>

                {selectedSymptoms > 0 && !repairDone && (
                  <motion.button
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    onClick={() => setRepairDone(true)}
                    className="mt-5 w-full flex items-center justify-center gap-2 border border-amber-500/40 text-amber-400 hover:bg-amber-500/8 font-semibold text-sm py-3 rounded-md transition-all duration-200"
                  >
                    <WrenchIcon className="w-4 h-4" />
                    Analisar sintomas ({selectedSymptoms} selecionado{selectedSymptoms > 1 ? "s" : ""})
                  </motion.button>
                )}
              </div>

              {/* Resultado diagnóstico */}
              <AnimatePresence>
                {repairDone && selectedSymptoms > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="bg-card border border-amber-500/30 rounded-md p-6 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-500/15 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Pré-diagnóstico técnico</p>
                        <p className="text-sm text-foreground/50 mt-0.5">
                          Isto não substitui a bancada, mas ajuda a orientar o atendimento.
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="space-y-3">
                      {selectedSymptomItems.map(symptom => (
                        <div key={symptom.id} className="rounded-md border border-border bg-background/60 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <p className="text-sm font-bold text-foreground">{symptom.label}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${
                              symptom.urgency === "Crítica"
                                ? "text-red-400"
                                : symptom.urgency === "Alta"
                                  ? "text-amber-400"
                                  : "text-foreground/35"
                            }`}>
                              Urgência {symptom.urgency}
                            </p>
                          </div>
                          <p className="mt-2 text-xs text-foreground/50 leading-relaxed">
                            Possíveis causas: {symptom.likely}.
                          </p>
                          <p className="mt-1 text-xs text-foreground/40 leading-relaxed">
                            Orientação: {symptom.action}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      Para confirmar, nossa equipe avalia bateria, tensão de entrada e saída, carga conectada, placa, carregador e autonomia real.
                    </p>
                    <a
                      href={`https://api.whatsapp.com/send/?phone=5581986225485&text=${repairMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-amber-500 text-black font-bold text-sm py-4 rounded-md hover:bg-amber-400 hover:scale-[1.02] transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Solicitar estimativa de reparo via WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── TAB 3 — Comparativo ── */}
          {activeTab === "comparativo" && (
            <motion.div
              key="comparativo"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-border rounded-md overflow-hidden"
            >
              {/* Cabeçalho da tabela */}
              <div className="grid grid-cols-3 border-b border-border">
                <div className="p-5 text-xs font-semibold uppercase tracking-widest text-foreground/30" />
                <div className="p-5 border-l border-border flex flex-col items-center gap-1">
                  <ShoppingCart className="w-5 h-5 text-foreground/50 mb-1" />
                  <span className="font-bold text-sm">Compra</span>
                </div>
                <div className="p-5 border-l border-border flex flex-col items-center gap-1 bg-primary/5">
                  <CalendarClock className="w-5 h-5 text-primary mb-1" />
                  <span className="font-bold text-sm text-primary">Aluguel</span>
                  <span className="text-[10px] text-primary/70 font-semibold uppercase tracking-wide">Recomendado</span>
                </div>
              </div>

              {/* Linhas */}
              {[
                {
                  label: "Investimento inicial",
                  compra: "Alto",
                  aluguel: "Zero",
                  aluguelHighlight: true,
                },
                {
                  label: "Custo mensal",
                  compra: "Zero",
                  aluguel: "Mensalidade fixa",
                  aluguelHighlight: false,
                },
                {
                  label: "Manutenção",
                  compra: "Por conta do dono",
                  aluguel: "Inclusa",
                  aluguelHighlight: true,
                },
                {
                  label: "Substituição em caso de falha",
                  compra: "Custo extra",
                  aluguel: "Imediata",
                  aluguelHighlight: true,
                },
                {
                  label: "Propriedade do equipamento",
                  compra: "Seu",
                  aluguel: "Nossa",
                  aluguelHighlight: false,
                },
                {
                  label: "Ideal para",
                  compra: "Uso doméstico ou longo prazo",
                  aluguel: "Empresas, eventos, projetos",
                  aluguelHighlight: true,
                },
              ].map(({ label, compra, aluguel, aluguelHighlight }, i) => (
                <div key={label} className={`grid grid-cols-3 ${i < 5 ? "border-b border-border" : ""}`}>
                  <div className="p-4 text-xs text-foreground/40 flex items-center">{label}</div>
                  <div className="p-4 border-l border-border text-sm font-medium text-foreground/70 flex items-center justify-center text-center">
                    {compra}
                  </div>
                  <div className={`p-4 border-l border-border text-sm font-semibold flex items-center justify-center text-center bg-primary/5 ${aluguelHighlight ? "text-primary" : "text-foreground/70"}`}>
                    {aluguel}
                  </div>
                </div>
              ))}

              {/* CTA comparativo */}
              <div className="p-5 border-t border-border flex flex-col sm:flex-row gap-3">
                <a
                  href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá!%20Tenho%20interesse%20em%20comprar%20um%20nobreak.%20Podem%20me%20passar%20um%20orçamento%3F"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-border font-semibold text-sm py-3.5 rounded-full transition-all duration-200"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Quero Comprar
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=5581986225485&text=Olá!%20Tenho%20interesse%20em%20alugar%20um%20nobreak.%20Podem%20me%20passar%20um%20orçamento%3F"
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-3.5 rounded-sm hover:bg-primary/90 hover:scale-[1.02] transition-all duration-200 shadow-[0_0_24px_rgba(0,191,255,0.18)]"
                >
                  <CalendarClock className="w-4 h-4" />
                  Quero Alugar
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
