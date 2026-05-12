"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HistoryCard {
  year: string
  title: string
  description: string
  image?: string
  imagePosition?: string
}

const historyCards: HistoryCard[] = [
  {
    year: "1986",
    title: "Tudo começou em 1986",
    description:
      "Ulysses e Ignês Maraschin, ao lado de seus 8 filhos, decidiram mudar de vida. Saíram de Ipê - RS rumo a Vacaria, onde deram início a uma jornada empreendedora no setor de bebidas.",
    image: "/family-1986.png",
    imagePosition: "object-[center_22%]",
  },
  {
    year: "1989",
    title: "O nascimento da São Rafael",
    description:
      "Em 30 de agosto de 1989, nasce oficialmente a São Rafael Distribuidora de Bebidas. Com muito trabalho, visão e união familiar, a empresa começa a se consolidar no mercado local.",
    image: "/warehouse-1989.png",
    imagePosition: "object-center",
  },
  {
    year: "2000s",
    title: "Crescimento que ultrapassa fronteiras",
    description:
      "Ao longo dos anos, a São Rafael fortalece sua presença e dá passos importantes. A parceria com o grupo Schincariol e a expansão para a região de Passo Fundo marcam uma nova fase de crescimento e estrutura.",
    image: "/fleet-2000s.png",
    imagePosition: "object-[center_38%]",
  },
  {
    year: "2017",
    title: "Uma nova era com a Heineken",
    description:
      "Em 2017, com a aquisição da Brasil Kirin pelo grupo Heineken, a São Rafael passa a integrar uma das maiores potências do setor no mundo. Um marco que reforça sua credibilidade e projeta a empresa para um novo nível — e segue evoluindo sem perder sua essência familiar.",
    image: "/heineken-era-2017.png",
    imagePosition: "object-[center_28%]",
  },
]

function HistoryCardComponent({ card, index }: { card: HistoryCard; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const isEven = index % 2 === 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={cardRef}
      className={cn(
        "relative transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      <div className="relative lg:hidden pl-10">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />
        <div className="absolute left-[7px] top-8 h-3 w-3 rounded-full border border-accent/60 bg-background shadow-[0_0_0_6px_rgba(12,18,14,0.9)]" />

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-secondary/25 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
          <div className="relative aspect-[16/10] overflow-hidden">
            {card.image && (
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={cn(
                  "object-cover transition-transform duration-700",
                  card.imagePosition
                )}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/18 via-transparent to-transparent" />
          </div>

          <div className="space-y-4 px-5 py-6 sm:px-7 sm:py-7">
            <div className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-sm font-semibold tracking-[0.18em] text-accent">
              {card.year}
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold leading-tight text-foreground">
                {card.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-6 xl:gap-10">
        <div className={cn("relative lg:col-span-5", !isEven && "lg:order-3")}>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-secondary/20 shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
            <div className="relative aspect-[16/11] overflow-hidden">
              {card.image && (
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1280px) 42vw, 38vw"
                  className={cn(
                    "object-cover transition-transform duration-700",
                    card.imagePosition
                  )}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-2" />

        <div className={cn("relative lg:col-span-5", isEven && "lg:order-3")}>
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-secondary/32 via-secondary/16 to-background/90 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-md xl:p-10">
            <div className="mb-5 inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              {card.year}
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-bold leading-tight text-foreground xl:text-[2rem]">
                {card.title}
              </h3>
              <p className="text-base leading-8 text-muted-foreground">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function History() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section
      ref={sectionRef}
      id="historia"
      className="relative overflow-hidden bg-background py-24 lg:py-32"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 bg-secondary/40 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto mb-16 max-w-3xl text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Nossa História
          </span>
          <h2 className="text-3xl font-bold text-foreground text-balance sm:text-4xl lg:text-5xl">
            Uma trajetória de{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              tradição e sucesso
            </span>
          </h2>
        </div>

        <div className="relative space-y-8 lg:space-y-12">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent lg:block" />
          {historyCards.map((card, index) => (
            <HistoryCardComponent key={card.year} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
