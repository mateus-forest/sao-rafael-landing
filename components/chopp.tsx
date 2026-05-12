"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ChoppBrand {
  name: string
  description: string
  sizes: string[]
  image?: string
}

const choppBrands: ChoppBrand[] = [
  { 
    name: "Heineken", 
    description: "O chopp premium mais famoso do mundo. Sabor puro e refrescante com a qualidade Heineken.",
    sizes: ["30L", "50L"],
    image: "/chopp/heineken-chopp.png",
  },
  { 
    name: "Amstel", 
    description: "Disponível em barris de 30L e 50L para eventos e estabelecimentos.",
    sizes: ["30L", "50L"],
    image: "/chopp/amstel-chopp.png",
  },
  { 
    name: "Schin", 
    description: "Chopp leve e refrescante, ideal para grandes eventos com excelente custo-benefício.",
    sizes: ["30L", "50L"],
    image: "/chopp/schin-chopp.png",
  },
]

function ChoppCard({ brand, index }: { brand: ChoppBrand; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

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
    <div
      ref={cardRef}
      className={`group relative bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Chopp image */}
      <div className="h-[220px] w-full flex items-center justify-center relative overflow-hidden p-6">
        {brand.image ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={brand.image}
              alt={`Chopp ${brand.name}`}
              width={180}
              height={180}
              className="object-contain max-h-[160px] w-auto scale-100 group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        ) : (
          <div className="w-24 h-28 rounded-xl bg-primary/20 border-2 border-primary/40 flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-bold text-accent">{brand.name.charAt(0)}</span>
            <span className="text-xs text-muted-foreground">Chopp</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-foreground text-2xl group-hover:text-accent transition-colors duration-300 mb-2">
          Chopp {brand.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {brand.description}
        </p>

        {/* Volume badges */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs text-muted-foreground mr-1">Volumes:</span>
          {brand.sizes.map((size) => (
            <span 
              key={size}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
            >
              {size}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
        >
          <a
            href="https://wa.me/5554999999999"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Solicitar orçamento
          </a>
        </Button>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-accent/30 transition-all duration-500 pointer-events-none" />
    </div>
  )
}

export function Chopp() {
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
      id="chopp"
      className="py-24 lg:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Chopp
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Chopp para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              eventos e estabelecimentos
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos chopp das melhores marcas em barris de 30L e 50L para seu evento ou estabelecimento.
          </p>
        </div>

        {/* Chopp grid - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {choppBrands.map((brand, index) => (
            <ChoppCard key={`${brand.name}-${index}`} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
