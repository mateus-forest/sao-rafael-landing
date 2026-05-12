"use client"

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react"
import { CheckCircle2, MapPin, Search, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const featuredCities = [
  "Vacaria",
  "Passo Fundo",
  "Lagoa Vermelha",
  "Bom Jesus",
  "São Marcos",
  "Nova Prata",
  "Flores da Cunha",
  "Veranópolis",
]

const serviceCities = [
  "Água Santa",
  "André da Rocha",
  "Antônio Prado",
  "Bom Jesus",
  "Camargo",
  "Campestre da Serra",
  "Capão Bonito do Sul",
  "Casca",
  "Caseiros",
  "Ciríaco",
  "Cotiporã",
  "Coxilha",
  "David Canabarro",
  "Ernestina",
  "Esmeralda",
  "Fagundes Varela",
  "Flores da Cunha",
  "Gentil",
  "Guabiju",
  "Guaporé",
  "Ibirapuitã",
  "Ibiraiaras",
  "Ipê",
  "Jaquirana",
  "Lagoa Vermelha",
  "Marau",
  "Mato Castelhano",
  "Monte Alegre dos Campos",
  "Montauri",
  "Muitos Capões",
  "Muliterno",
  "Nicolau Vergueiro",
  "Nova Alvorada",
  "Nova Araçá",
  "Nova Bassano",
  "Nova Pádua",
  "Nova Prata",
  "Nova Roma do Sul",
  "Paraí",
  "Passo Fundo",
  "Pinhal da Serra",
  "Pontão",
  "Protásio Alves",
  "Santa Cecília do Sul",
  "Santo Antônio do Palma",
  "Santo Antônio do Planalto",
  "São Domingos do Sul",
  "São Jorge",
  "São José dos Ausentes",
  "São Marcos",
  "Serafina Corrêa",
  "União da Serra",
  "Vacaria",
  "Vanini",
  "Veranópolis",
  "Vila Flores",
  "Vila Langaro",
  "Vila Maria",
  "Vista Alegre do Prata",
]

const regionalPoints = [
  { city: "Pontão", x: 102, y: 168 },
  { city: "Passo Fundo", x: 142, y: 240, primary: true, labelDx: -8, labelDy: -26 },
  { city: "Coxilha", x: 182, y: 205 },
  { city: "Vila Langaro", x: 212, y: 208 },
  { city: "Santa Cecília do Sul", x: 232, y: 224 },
  { city: "Água Santa", x: 220, y: 246 },
  { city: "Mato Castelhano", x: 176, y: 258 },
  { city: "Caseiros", x: 278, y: 252 },
  { city: "Capão Bonito do Sul", x: 356, y: 214 },
  { city: "Lagoa Vermelha", x: 330, y: 246, primary: true, labelDx: -18, labelDy: -28 },
  { city: "Pinhal da Serra", x: 390, y: 132 },
  { city: "Esmeralda", x: 395, y: 168 },
  { city: "Vacaria", x: 498, y: 246, primary: true, labelDx: 18, labelDy: -10 },
  { city: "Muitos Capões", x: 398, y: 302 },
  { city: "Bom Jesus", x: 606, y: 322, primary: true, labelDx: 18, labelDy: -10 },
  { city: "São José dos Ausentes", x: 682, y: 350 },
  { city: "Monte Alegre dos Campos", x: 474, y: 358 },
  { city: "Campestre da Serra", x: 422, y: 378 },
  { city: "Jaquirana", x: 590, y: 470 },
  { city: "São Marcos", x: 394, y: 500, primary: true, labelDx: 14, labelDy: -8 },
  { city: "Flores da Cunha", x: 342, y: 528, primary: true, labelDx: -16, labelDy: 18 },
  { city: "Nova Roma do Sul", x: 380, y: 520 },
  { city: "Veranópolis", x: 300, y: 498, primary: true, labelDx: -10, labelDy: 22 },
  { city: "Cotiporã", x: 260, y: 520 },
  { city: "Vila Flores", x: 286, y: 474 },
  { city: "Protásio Alves", x: 345, y: 468 },
  { city: "Antônio Prado", x: 344, y: 486 },
  { city: "Fagundes Varela", x: 272, y: 470 },
  { city: "Guaporé", x: 222, y: 478 },
  { city: "Vista Alegre do Prata", x: 246, y: 462 },
  { city: "Nova Prata", x: 252, y: 430, primary: true, labelDx: -10, labelDy: -26 },
  { city: "Nova Araçá", x: 312, y: 422 },
  { city: "Nova Bassano", x: 292, y: 448 },
  { city: "Nova Pádua", x: 360, y: 544 },
  { city: "Paraí", x: 278, y: 392 },
  { city: "Guabiju", x: 314, y: 372 },
  { city: "São Jorge", x: 292, y: 366 },
  { city: "Ibiraiaras", x: 332, y: 324 },
  { city: "David Canabarro", x: 246, y: 334 },
  { city: "Vanini", x: 232, y: 368 },
  { city: "Ciríaco", x: 214, y: 308 },
  { city: "Gentil", x: 192, y: 324 },
  { city: "Santo Antônio do Palma", x: 124, y: 336 },
  { city: "Ernestina", x: 100, y: 316 },
  { city: "Santo Antônio do Planalto", x: 84, y: 298 },
  { city: "Nicolau Vergueiro", x: 134, y: 364 },
  { city: "Marau", x: 154, y: 362 },
  { city: "Ibirapuitã", x: 92, y: 414 },
  { city: "Camargo", x: 164, y: 430 },
  { city: "Vila Maria", x: 202, y: 420 },
  { city: "Casca", x: 234, y: 398 },
  { city: "Montauri", x: 212, y: 444 },
  { city: "Nova Alvorada", x: 164, y: 456 },
  { city: "União da Serra", x: 196, y: 484 },
  { city: "André da Rocha", x: 218, y: 454 },
  { city: "Serafina Corrêa", x: 238, y: 446 },
  { city: "Muliterno", x: 258, y: 286 },
  { city: "São Domingos do Sul", x: 262, y: 380 },
  { city: "Ipê", x: 412, y: 442 },
]

function normalizeCityName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function RegionalMap() {
  const primaryPoints = regionalPoints.filter((point) => point.primary)
  const secondaryPoints = regionalPoints.filter((point) => !point.primary)

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-secondary/55 via-secondary/25 to-background/90 shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(65,190,93,0.14),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0))]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-y-8 left-8 w-24 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute right-4 top-4 rounded-full border border-accent/15 bg-background/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80 backdrop-blur-md sm:right-5 sm:top-5">
        59 cidades atendidas
      </div>

      <div className="relative aspect-[10/7.2] p-4 sm:p-5">
        <svg viewBox="0 0 760 600" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="coverage-base" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(58, 86, 63, 0.95)" />
              <stop offset="55%" stopColor="rgba(31, 42, 34, 0.95)" />
              <stop offset="100%" stopColor="rgba(15, 19, 16, 0.98)" />
            </linearGradient>
            <linearGradient id="coverage-stroke" x1="0%" x2="100%" y1="50%" y2="50%">
              <stop offset="0%" stopColor="rgba(113, 228, 138, 0.42)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.08)" />
            </linearGradient>
            <radialGradient id="coverage-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(76, 214, 109, 0.55)" />
              <stop offset="100%" stopColor="rgba(76, 214, 109, 0)" />
            </radialGradient>
          </defs>

          <g opacity="0.35">
            <path
              d="M134 202 184 158 255 138 322 88 390 62 430 82 474 70 522 84 578 118 640 142 672 184 694 248 684 320 708 378 676 440 618 472 586 530 502 512 468 552 404 540 358 574 284 560 244 514 180 498 132 452 82 416 64 350 80 282 116 254Z"
              fill="rgba(255,255,255,0.04)"
            />
          </g>

          <path
            d="M122 208 178 162 252 144 314 92 386 62 434 82 482 74 530 92 584 126 640 148 674 188 694 246 688 304 712 358 688 422 630 460 586 520 510 506 462 548 390 536 346 568 280 552 238 506 176 486 126 444 94 390 76 336 88 280 116 246Z"
            fill="url(#coverage-base)"
            stroke="url(#coverage-stroke)"
            strokeWidth="3"
          />

          <path
            d="M248 178 308 152 362 170 410 150 470 176 482 232 454 270 380 292 320 276 268 244Z"
            fill="rgba(245, 198, 54, 0.18)"
            stroke="rgba(245, 198, 54, 0.32)"
            strokeWidth="2"
          />
          <path
            d="M154 210 222 188 278 212 292 266 254 314 184 324 128 292 120 240Z"
            fill="rgba(238, 81, 62, 0.15)"
            stroke="rgba(238, 81, 62, 0.26)"
            strokeWidth="2"
          />
          <path
            d="M328 332 396 314 454 336 434 394 378 426 320 394Z"
            fill="rgba(113, 228, 138, 0.12)"
            stroke="rgba(113, 228, 138, 0.2)"
            strokeWidth="2"
          />

          <ellipse cx="508" cy="238" rx="150" ry="120" fill="url(#coverage-glow)" opacity="0.28" />
          <ellipse cx="240" cy="322" rx="170" ry="130" fill="url(#coverage-glow)" opacity="0.14" />

          {secondaryPoints.map((item) => (
            <g key={item.city}>
              <circle cx={item.x} cy={item.y} r="6.5" fill="rgba(76, 214, 109, 0.08)" />
              <circle cx={item.x} cy={item.y} r="2.6" fill="rgba(193, 255, 207, 0.78)" />
            </g>
          ))}

          {primaryPoints.map((item) => (
            <g key={item.city}>
              <circle cx={item.x} cy={item.y} r="14" fill="rgba(76, 214, 109, 0.16)" />
              <circle cx={item.x} cy={item.y} r="4.5" fill="rgba(117, 255, 157, 0.98)" />
            </g>
          ))}

          {primaryPoints.map((item) => (
            <g
              key={`${item.city}-label`}
              transform={`translate(${item.x + (item.labelDx ?? 14)} ${item.y + (item.labelDy ?? -10)})`}
            >
              <rect
                width={item.city.length * 8.3 + 20}
                height="26"
                rx="13"
                fill="rgba(11, 15, 12, 0.7)"
                stroke="rgba(108, 207, 132, 0.18)"
              />
              <text
                x="12"
                y="17"
                fill="rgba(245, 248, 246, 0.92)"
                fontSize="11.5"
                fontWeight="600"
                letterSpacing="0.02em"
              >
                {item.city}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

export function RegionalCoverage() {
  const [isVisible, setIsVisible] = useState(false)
  const [query, setQuery] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const normalizedCities = useMemo(
    () => new Set(serviceCities.map((city) => normalizeCityName(city))),
    []
  )

  const normalizedQuery = normalizeCityName(deferredQuery)

  const searchMatches = useMemo(() => {
    if (!normalizedQuery) {
      return []
    }

    return serviceCities.filter((city) =>
      normalizeCityName(city).includes(normalizedQuery)
    ).slice(0, 8)
  }, [normalizedQuery])

  const cityIsServed = normalizedQuery ? normalizedCities.has(normalizedQuery) : null

  return (
    <section
      ref={sectionRef}
      id="atendimento-regional"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/10 to-background py-24 lg:py-32"
    >
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto mb-16 max-w-3xl text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Atendimento Regional
          </span>
          <h2 className="text-3xl font-bold text-foreground text-balance sm:text-4xl lg:text-5xl">
            Onde a São Rafael está presente
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            A São Rafael está presente em dezenas de cidades do Rio Grande do Sul, levando grandes marcas com eficiência e tradição.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-10">
          <div
            className={cn(
              "transition-all duration-700 delay-100",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <RegionalMap />
          </div>

          <div
            className={cn(
              "rounded-[2rem] border border-white/10 bg-secondary/25 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all duration-700 delay-200 sm:p-8",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Cidades em destaque</h3>
                  <p className="text-sm text-muted-foreground">
                    {serviceCities.length} cidades atendidas na região.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {featuredCities.map((city) => {
                  const isActive = normalizeCityName(query) === normalizeCityName(city)

                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setQuery(city)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                        "border-accent/20 bg-background/60 text-foreground hover:border-accent/45 hover:bg-accent/10 hover:text-accent",
                        isActive && "border-accent/50 bg-accent/10 text-accent shadow-[0_0_0_4px_rgba(71,191,99,0.08)]"
                      )}
                    >
                      {city}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar sua cidade..."
                  className="h-14 rounded-2xl border-white/10 bg-background/70 pl-11 pr-4 text-[15px] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 placeholder:text-muted-foreground/80 focus-visible:border-accent/40 focus-visible:ring-accent/20"
                />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-background/55 p-5">
              {normalizedQuery ? (
                <div className="space-y-4">
                  <div
                    className={cn(
                      "flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm leading-7",
                      cityIsServed
                        ? "border-accent/20 bg-accent/10 text-foreground"
                        : "border-border/80 bg-secondary/40 text-muted-foreground"
                    )}
                  >
                    {cityIsServed ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    ) : (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                    <p>
                      {cityIsServed
                        ? "✔ Sua cidade faz parte da nossa região de atendimento."
                        : "Esta cidade está fora da nossa região de atendimento."}
                    </p>
                  </div>

                  {searchMatches.length > 0 && (
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Cidades encontradas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {searchMatches.map((city) => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => setQuery(city)}
                            className="rounded-full border border-white/10 bg-secondary/50 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent/35 hover:text-accent"
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Busca regional
                  </p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Digite o nome da sua cidade para verificar se ela faz parte da nossa região de atendimento.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
