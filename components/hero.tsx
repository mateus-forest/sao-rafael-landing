"use client"

import { useEffect, useState } from "react"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with two images side by side */}
      <div className="absolute inset-0">
        {/* Left image - Founders */}
        <div className="absolute inset-y-0 left-0 w-1/2">
          <Image
            src="/founders.png"
            alt="Fundadores São Rafael"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient fade to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background" />
        </div>
        
        {/* Right image - Warehouse */}
        <div className="absolute inset-y-0 right-0 w-1/2">
          <Image
            src="/warehouse-old.png"
            alt="Armazém antigo São Rafael"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient fade to left */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background" />
        </div>
        
        {/* Center smoke/fog effect */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-64 bg-gradient-to-r from-transparent via-background to-transparent" />
        
        {/* Overall dark overlay for readability */}
        <div className="absolute inset-0 bg-background/70" />
        
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Subtle green accent */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">Desde 1989</span>
          </div>

          {/* Headline */}
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Distribuição de bebidas com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent">
              tradição
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Revendedor autorizado Heineken • Atendimento regional • Estrutura própria
          </p>

          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:scale-105 group"
            >
              <a href="#produtos">
                Ver produtos
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:border-accent/50 hover:bg-accent/10 text-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <a
                href="https://wa.me/5554999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-accent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
