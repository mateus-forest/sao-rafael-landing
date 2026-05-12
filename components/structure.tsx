"use client"

import { useEffect, useRef, useState } from "react"
import { Truck, MapPin, BadgeCheck, Clock } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Frota própria",
    description: "Veículos modernos para garantir a entrega rápida e segura dos produtos.",
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Atendimento regional",
    description: "Cobertura em toda a região com atendimento personalizado.",
  },
  {
    icon: <BadgeCheck className="w-8 h-8" />,
    title: "Revendedor autorizado",
    description: "Parceiro oficial Heineken com certificação de qualidade.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Décadas de experiência",
    description: "Mais de 35 anos de tradição e confiança no mercado de bebidas.",
  },
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
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
      className={`group text-center p-8 rounded-2xl bg-secondary/30 border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-accent mb-6 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  )
}

export function Structure() {
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
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Nossa Estrutura
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance max-w-4xl mx-auto">
            Estrutura própria, logística eficiente e{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              atendimento regional consolidado
            </span>
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>


      </div>
    </section>
  )
}
