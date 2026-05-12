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
  { city: "Pontão", x: 94, y: 160 },
  { city: "Passo Fundo", x: 146, y: 238, primary: true, labelDx: -8, labelDy: -26 },
  { city: "Coxilha", x: 194, y: 196 },
  { city: "Vila Langaro", x: 228, y: 202 },
  { city: "Santa Cecília do Sul", x: 262, y: 220 },
  { city: "Água Santa", x: 248, y: 244 },
  { city: "Mato Castelhano", x: 184, y: 256 },
  { city: "Caseiros", x: 320, y: 248 },
  { city: "Capão Bonito do Sul", x: 382, y: 206 },
  { city: "Lagoa Vermelha", x: 356, y: 242, primary: true, labelDx: -18, labelDy: -28 },
  { city: "Pinhal da Serra", x: 446, y: 130 },
  { city: "Esmeralda", x: 454, y: 170 },
  { city: "Vacaria", x: 518, y: 266, primary: true, labelDx: 18, labelDy: -10 },
  { city: "Muitos Capões", x: 438, y: 302 },
  { city: "Bom Jesus", x: 624, y: 342, primary: true, labelDx: 18, labelDy: -10 },
  { city: "São José dos Ausentes", x: 724, y: 360 },
  { city: "Monte Alegre dos Campos", x: 502, y: 360 },
  { city: "Campestre da Serra", x: 454, y: 388 },
  { city: "Jaquirana", x: 614, y: 488 },
  { city: "São Marcos", x: 454, y: 506, primary: true, labelDx: 14, labelDy: -8 },
  { city: "Flores da Cunha", x: 390, y: 536, primary: true, labelDx: -16, labelDy: 18 },
  { city: "Nova Roma do Sul", x: 430, y: 526 },
  { city: "Veranópolis", x: 324, y: 504, primary: true, labelDx: -10, labelDy: 22 },
  { city: "Cotiporã", x: 282, y: 530 },
  { city: "Vila Flores", x: 312, y: 482 },
  { city: "Protásio Alves", x: 392, y: 474 },
  { city: "Antônio Prado", x: 424, y: 492 },
  { city: "Fagundes Varela", x: 292, y: 474 },
  { city: "Guaporé", x: 236, y: 482 },
  { city: "Vista Alegre do Prata", x: 262, y: 462 },
  { city: "Nova Prata", x: 292, y: 434, primary: true, labelDx: -10, labelDy: -26 },
  { city: "Nova Araçá", x: 346, y: 424 },
  { city: "Nova Bassano", x: 324, y: 452 },
  { city: "Nova Pádua", x: 414, y: 550 },
  { city: "Paraí", x: 316, y: 396 },
  { city: "Guabiju", x: 350, y: 376 },
  { city: "São Jorge", x: 324, y: 364 },
  { city: "Ibiraiaras", x: 376, y: 322 },
  { city: "David Canabarro", x: 268, y: 332 },
  { city: "Vanini", x: 252, y: 364 },
  { city: "Ciríaco", x: 232, y: 304 },
  { city: "Gentil", x: 204, y: 322 },
  { city: "Santo Antônio do Palma", x: 150, y: 334 },
  { city: "Ernestina", x: 118, y: 314 },
  { city: "Santo Antônio do Planalto", x: 98, y: 292 },
  { city: "Nicolau Vergueiro", x: 144, y: 362 },
  { city: "Marau", x: 176, y: 360 },
  { city: "Ibirapuitã", x: 106, y: 410 },
  { city: "Camargo", x: 186, y: 430 },
  { city: "Vila Maria", x: 222, y: 416 },
  { city: "Casca", x: 258, y: 396 },
  { city: "Montauri", x: 236, y: 446 },
  { city: "Nova Alvorada", x: 180, y: 460 },
  { city: "União da Serra", x: 214, y: 486 },
  { city: "André da Rocha", x: 242, y: 456 },
  { city: "Serafina Corrêa", x: 266, y: 448 },
  { city: "Muliterno", x: 294, y: 284 },
  { city: "São Domingos do Sul", x: 292, y: 380 },
  { city: "Ipê", x: 470, y: 446 },
]

const neighboringContours = [
  "M104 94 164 76 220 82 240 112 234 142 200 166 148 162 104 138 88 116Z",
  "M546 76 612 66 678 88 720 132 734 188 714 238 674 250 646 220 626 170 582 138 542 120Z",
  "M650 246 720 256 754 292 752 356 714 390 656 382 628 340 628 286Z",
  "M184 500 248 474 330 494 384 542 354 586 262 590 188 560 162 524Z",
]

const neighboringLabels = [
  { label: "Erechim", x: 192, y: 48 },
  { label: "Lages", x: 642, y: 54 },
  { label: "Criciúma", x: 694, y: 306 },
  { label: "Tubarão", x: 728, y: 226 },
  { label: "Bento Gonçalves", x: 220, y: 580 },
  { label: "Caxias do Sul", x: 402, y: 578 },
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
            <linearGradient id="neighbor-stroke" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(173, 187, 179, 0.24)" />
              <stop offset="100%" stopColor="rgba(173, 187, 179, 0.08)" />
            </linearGradient>
          </defs>

          <g opacity="0.55">
            {neighboringContours.map((path, index) => (
              <path
                key={`neighbor-${index}`}
                d={path}
                fill="rgba(197, 210, 202, 0.035)"
                stroke="url(#neighbor-stroke)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            ))}
          </g>

          <path
            d="M96 160 126 134 172 128 198 110 244 118 262 166 316 178 366 148 410 122 444 132 458 98 496 112 522 152 578 184 666 190 706 222 728 288 714 332 742 356 736 390 694 398 690 424 656 430 642 506 616 520 602 502 520 504 498 470 456 468 444 520 382 544 324 522 292 486 236 478 202 440 130 420 110 376 88 358 82 306 100 266 86 234 108 202Z"
            fill="url(#coverage-base)"
            stroke="url(#coverage-stroke)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <path
            d="M302 194 354 188 398 208 432 184 478 196 474 242 446 286 398 308 348 300 316 270 294 228Z"
            fill="rgba(245, 198, 54, 0.16)"
            stroke="rgba(245, 198, 54, 0.3)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M118 198 188 178 254 188 306 214 302 268 278 326 220 340 148 330 104 292 102 232Z"
            fill="rgba(238, 81, 62, 0.14)"
            stroke="rgba(238, 81, 62, 0.24)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M432 164 512 160 566 188 642 208 694 248 704 322 688 382 638 404 594 400 548 382 514 356 482 366 432 350 408 300 402 240Z"
            fill="rgba(72, 195, 101, 0.12)"
            stroke="rgba(103, 228, 133, 0.22)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M196 380 266 372 330 386 384 418 410 468 380 532 312 526 250 490 208 440Z"
            fill="rgba(238, 81, 62, 0.12)"
            stroke="rgba(238, 81, 62, 0.22)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M410 430 468 412 520 430 540 478 512 510 454 512 420 482Z"
            fill="rgba(245, 198, 54, 0.11)"
            stroke="rgba(245, 198, 54, 0.2)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <ellipse cx="548" cy="280" rx="172" ry="132" fill="url(#coverage-glow)" opacity="0.28" />
          <ellipse cx="250" cy="304" rx="188" ry="140" fill="url(#coverage-glow)" opacity="0.14" />
          <ellipse cx="350" cy="486" rx="126" ry="94" fill="url(#coverage-glow)" opacity="0.12" />

          {neighboringLabels.map((item) => (
            <text
              key={item.label}
              x={item.x}
              y={item.y}
              fill="rgba(225, 232, 227, 0.3)"
              fontSize="12"
              fontWeight="500"
              letterSpacing="0.02em"
            >
              {item.label}
            </text>
          ))}

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
