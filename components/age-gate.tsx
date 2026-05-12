"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function AgeGate() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already verified age
    const isVerified = localStorage.getItem("ageVerified")
    if (!isVerified) {
      setIsOpen(true)
    }
  }, [])

  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true")
    setIsOpen(false)
  }

  const handleExit = () => {
    window.location.href = "https://www.google.com"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-primary/20 bg-gradient-to-b from-secondary to-background p-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo-white.png"
            alt="Bebidas São Rafael"
            width={180}
            height={60}
            className="h-auto w-auto"
          />
        </div>

        {/* Title */}
        <h2 className="mb-3 text-center font-barlow text-2xl font-bold text-foreground">
          Verificação de idade
        </h2>

        {/* Text */}
        <p className="mb-8 text-center font-barlow text-muted-foreground">
          Este site é destinado apenas a maiores de 18 anos
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full rounded-lg bg-primary py-3 font-barlow font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
          >
            Tenho 18 anos ou mais
          </button>
          <button
            onClick={handleExit}
            className="w-full rounded-lg border border-muted-foreground/30 bg-transparent py-3 font-barlow font-medium text-muted-foreground transition-all hover:border-muted-foreground/50 hover:text-foreground"
          >
            Sair
          </button>
        </div>

        {/* 18+ Badge */}
        <div className="mt-6 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/50">
            <span className="font-barlow text-sm font-bold text-primary">18+</span>
          </div>
        </div>
      </div>
    </div>
  )
}
