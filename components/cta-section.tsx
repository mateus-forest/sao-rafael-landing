"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="contato" 
      className="py-24 lg:py-32 bg-gradient-to-b from-background via-primary/10 to-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div 
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">Atendimento rápido</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Precisa de bebidas para seu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              negócio?
            </span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto text-pretty">
            Entre em contato conosco e receba um atendimento personalizado para suas necessidades.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 hover:scale-105 group"
            >
              <a
                href="https://wa.me/5554999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:border-accent/50 hover:bg-accent/10 text-foreground font-semibold px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <a href="mailto:contato@saorafael.com.br">
                <Mail className="w-5 h-5 mr-2" />
                Solicitar contato
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
