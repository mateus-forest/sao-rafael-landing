"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { buildWhatsAppUrl, getBrandWhatsAppMessage } from "@/lib/whatsapp"

interface BrandProduct {
  name: string
  category: string
  image?: string
}

interface Brand {
  name: string
  summary: string
  description: string
  logo: string
  logoClassName?: string
  modalLogoClassName?: string
  logoSurfaceClassName?: string
  modalLogoSurfaceClassName?: string
  logoImageClassName?: string
  modalLogoImageClassName?: string
  products: BrandProduct[]
}

const product = (name: string, category: string, image: string): BrandProduct => ({
  name,
  category,
  image,
})

const brands: Brand[] = [
  {
    name: "Heineken",
    summary: "Premium lager global com presença marcante no portfólio.",
    description:
      "Heineken é uma das marcas mais reconhecidas do mundo, referência em qualidade, tradição cervejeira e presença global.",
    logo: "/brands/heineken.png",
    logoClassName: "h-16 max-w-[210px]",
    modalLogoClassName: "h-16 max-w-[220px]",
    products: [
      product("Heineken Long Neck 250ml", "Premium Lager", "/produtos/heineken/cerveja-heineken-ln-250ml.png"),
      product("Heineken Long Neck 330ml", "Premium Lager", "/produtos/heineken/cerveja-heineken-ln-330ml.png"),
      product(
        "Heineken Long Neck Retornável 330ml",
        "Premium Lager",
        "/produtos/heineken/cerveja-heineken-ln-retornavel-330ml.png"
      ),
      product("Heineken Lata 269ml", "Premium Lager", "/produtos/heineken/cerveja-heineken-lt-269ml.png"),
      product("Heineken Lata 350ml", "Premium Lager", "/produtos/heineken/cerveja-heineken-lt-350ml.png"),
      product("Heineken Lata 473ml", "Premium Lager", "/produtos/heineken/cerveja-heineken-lt-473ml.png"),
      product("Heineken Garrafa 600ml", "Premium Lager", "/produtos/heineken/cerveja-heineken-gfa-600ml.png"),
      product("Heineken Barril 5L", "Barril", "/produtos/heineken/cerveja-heineken-keg-5l.png"),
      product("Chopp Heineken 30L", "Chopp", "/produtos/heineken/chopp-heineken-30l.png"),
      product("Chopp Heineken 50L", "Chopp", "/produtos/heineken/chopp-heineken-50l.png"),
    ],
  },
  {
    name: "Heineken 0.0",
    summary: "A versão sem álcool da experiência premium Heineken.",
    description:
      "Heineken 0.0 entrega o perfil clássico da marca em uma opção sem álcool, ideal para ocasiões versáteis e consumo consciente.",
    logo: "/brands/heineken-00.png",
    logoClassName: "h-24 max-w-[124px]",
    modalLogoClassName: "h-20 max-w-[130px]",
    products: [
      product("Heineken 0.0 Long Neck 330ml", "Sem Álcool", "/produtos/heineken-00/cerveja-heineken-0-0-ln-330ml.png"),
      product("Heineken 0.0 Lata 269ml", "Sem Álcool", "/produtos/heineken-00/cerveja-heineken-0-0-lt-269ml.png"),
      product("Heineken 0.0 Lata 350ml", "Sem Álcool", "/produtos/heineken-00/cerveja-heineken-0-0-lt-350ml.png"),
    ],
  },
  {
    name: "Amstel",
    summary: "Puro malte equilibrada, com grande apelo comercial.",
    description:
      "Amstel combina tradição europeia, sabor equilibrado e forte reconhecimento de marca, sendo uma opção versátil para diferentes perfis de consumo.",
    logo: "/brands/amstel.png",
    logoClassName: "h-24 max-w-[122px]",
    modalLogoClassName: "h-20 max-w-[124px]",
    products: [
      product("Amstel Garrafa 1L", "Pure Malt", "/produtos/amstel/cerveja-amstel-1l.png"),
      product("Amstel Lata 269ml", "Pure Malt", "/produtos/amstel/cerveja-amstel-269ml.png"),
      product("Amstel Lata 350ml", "Pure Malt", "/produtos/amstel/cerveja-amstel-350ml.png"),
      product("Amstel Long Neck 355ml", "Pure Malt", "/produtos/amstel/cerveja-amstel-355ml.png"),
      product("Amstel Lata 473ml", "Pure Malt", "/produtos/amstel/cerveja-amstel-473ml.png"),
      product("Amstel Garrafa 600ml", "Pure Malt", "/produtos/amstel/cerveja-amstel-600ml.png"),
      product("Chopp Amstel 30L", "Chopp", "/produtos/amstel/chopp-amstel-30l.png"),
      product("Chopp Amstel 50L", "Chopp", "/produtos/amstel/chopp-amstel-50l.png"),
    ],
  },
  {
    name: "Amstel Ultra",
    summary: "Rótulo leve e contemporâneo para um público ativo.",
    description:
      "Amstel Ultra traz uma proposta moderna e leve, reforçando conveniência, refrescância, perfil sem glúten e posicionamento premium.",
    logo: "/brands/amstel-ultra-uploaded-v2.png",
    logoClassName: "h-28 max-w-[120px]",
    modalLogoClassName: "h-24 max-w-[130px]",
    products: [
      product("Amstel Ultra Long Neck 275ml", "Sem glúten", "/produtos/amstel-ultra/cerveja-amstel-ultra-ln-275ml.png"),
      product("Amstel Ultra Lata 269ml", "Sem glúten", "/produtos/amstel-ultra/cerveja-amstel-ultra-lt-269ml.png"),
    ],
  },
  {
    name: "Schin",
    summary: "Marca popular com excelente giro no ponto de venda.",
    description:
      "Schin é uma marca consolidada no mercado brasileiro, reconhecida pela acessibilidade, forte lembrança e ótimo potencial de volume.",
    logo: "/brands/schin.png",
    logoClassName: "h-20 max-w-[178px]",
    products: [
      product("Schin Garrafa 1L", "Pilsen", "/produtos/schin/cerveja-schin-gfa-1l.png"),
      product("Schin Garrafa 600ml", "Pilsen", "/produtos/schin/cerveja-schin-gfa-600ml.png"),
      product("Schin Lata 269ml", "Pilsen", "/produtos/schin/cerveja-schin-lt-269ml.png"),
      product("Schin Lata 350ml", "Pilsen", "/produtos/schin/cerveja-schin-lt-350ml.png"),
      product("Schin Lata 473ml", "Pilsen", "/produtos/schin/cerveja-schin-lt-473ml.png"),
      product("Chopp Schin 30L", "Chopp", "/produtos/schin/chopp-schin-30l.png"),
      product("Chopp Schin 50L", "Chopp", "/produtos/schin/chopp-schin-50l.png"),
    ],
  },
  {
    name: "Glacial",
    summary: "Opção democrática com forte presença regional.",
    description:
      "Glacial oferece praticidade comercial e boa aceitação de mercado, sendo uma marca importante para operações com foco em giro e cobertura.",
    logo: "/brands/glacial.png",
    logoClassName: "h-[4.5rem] max-w-[182px]",
    products: [
      product("Glacial Garrafa 1L", "Pilsen", "/produtos/glacial/cerveja-glacial-gfa-1l.png"),
      product("Glacial Garrafa 600ml", "Pilsen", "/produtos/glacial/cerveja-glacial-gfa-600ml.png"),
      product("Glacial Lata 350ml", "Pilsen", "/produtos/glacial/cerveja-glacial-lt-350ml.png"),
      product("Glacial Lata 473ml", "Pilsen", "/produtos/glacial/cerveja-glacial-lt-473ml.png"),
    ],
  },
  {
    name: "Praya",
    summary: "Cerveja com linguagem leve, tropical e contemporânea.",
    description:
      "Praya traz uma proposta descontraída e sofisticada, conectando branding premium, refrescância e experiência de consumo atual.",
    logo: "/brands/praya.png",
    logoClassName: "h-28 max-w-[136px]",
    modalLogoClassName: "h-24 max-w-[138px]",
    products: [
      product("Praya Lager Premium Long Neck 330ml", "Lager Premium • Sem glúten", "/produtos/praya/cerveja-praya-lager-premium-ln-330ml.png"),
      product("Praya Receita Clássica Garrafa 600ml", "Receita Clássica", "/produtos/praya/cerveja-praya-receita-classica-gfa-600ml.png"),
      product("Praya Receita Clássica Long Neck 355ml", "Receita Clássica", "/produtos/praya/cerveja-praya-receita-classica-ln-355ml.png"),
      product("Praya Receita Clássica Lata 269ml", "Receita Clássica", "/produtos/praya/cerveja-praya-receita-classica-lt-269ml.png"),
    ],
  },
  {
    name: "Baden Baden",
    summary: "Rótulo premium para ocasiões especiais e curadoria refinada.",
    description:
      "Baden Baden é uma marca de prestígio no universo cervejeiro nacional, associada a sofisticação, variedade e qualidade artesanal.",
    logo: "/brands/baden-baden.png",
    products: [
      product("Baden Baden Amber Lager Lata 473ml", "Amber Lager", "/produtos/baden-baden/cerveja-baden-baden-amber-lager-lt-473ml.png"),
      product("Baden Baden Cristal Garrafa 600ml", "Cristal", "/produtos/baden-baden/cerveja-baden-baden-cristal-gfa-600ml.png"),
      product("Baden Baden Cristal Lata 350ml", "Cristal", "/produtos/baden-baden/cerveja-baden-baden-cristal-lt-350ml.png"),
      product("Baden Baden Cristal Lata 473ml", "Cristal", "/produtos/baden-baden/cerveja-baden-baden-cristal-lt-473ml.png"),
      product("Baden Baden Golden Garrafa 600ml", "Golden", "/produtos/baden-baden/cerveja-baden-baden-golden-gfa-600ml.png"),
      product("Baden Baden Golden Lata 350ml", "Golden", "/produtos/baden-baden/cerveja-baden-baden-golden-lt-350ml.png"),
      product("Baden Baden IPA Garrafa 600ml", "IPA", "/produtos/baden-baden/cerveja-baden-baden-ipa-gfa-600ml.png"),
      product("Baden Baden IPA Lata 350ml", "IPA", "/produtos/baden-baden/cerveja-baden-baden-ipa-lt-350ml.png"),
      product("Baden Baden IPA Lata 473ml", "IPA", "/produtos/baden-baden/cerveja-baden-baden-ipa-lt-473ml.png"),
      product("Baden Baden Peach Garrafa 600ml", "Peach", "/produtos/baden-baden/cerveja-baden-baden-peach-gfa-600ml.png"),
      product("Baden Baden Peach Lata 350ml", "Peach", "/produtos/baden-baden/cerveja-baden-baden-peach-lt-350ml.png"),
      product("Baden Baden Witbier Garrafa 600ml", "Witbier", "/produtos/baden-baden/cerveja-baden-baden-witbier-gfa-600ml.png"),
      product("Baden Baden Witbier Lata 350ml", "Witbier", "/produtos/baden-baden/cerveja-baden-baden-witibier-lt-350ml.webp"),
      product("Chopp Baden Baden 30L", "Chopp", "/produtos/baden-baden/chopp-baden-baden-30l.png"),
    ],
  },
  {
    name: "Blue Moon",
    summary: "Importada de perfil marcante e identidade reconhecível.",
    description:
      "Blue Moon combina personalidade visual forte e perfil diferenciado, agregando valor ao portfólio com uma proposta premium e internacional.",
    logo: "/brands/blue-moon.png",
    products: [
      product("Blue Moon Long Neck 355ml", "Belgian White", "/produtos/blue-moon/cerveja-blue-moon-ln-355ml.png"),
      product("Blue Moon Lata 350ml", "Belgian White", "/produtos/blue-moon/cerveja-blue-moon-lt-350ml.png"),
      product("Chopp Blue Moon 30L", "Chopp", "/produtos/blue-moon/chopp-blue-moon-30l.png"),
    ],
  },
  {
    name: "Lagunitas",
    summary: "Marca de atitude com apelo craft e urbano.",
    description:
      "Lagunitas reforça um posicionamento ousado dentro da categoria de especiais, com forte apelo para consumidores que buscam identidade e sabor.",
    logo: "/brands/lagunitas.png",
    logoClassName: "h-14 max-w-[220px]",
    modalLogoClassName: "h-14 max-w-[240px]",
    logoImageClassName: "invert brightness-0",
    modalLogoImageClassName: "invert brightness-0",
    products: [
      product("Lagunitas DayTime Long Neck 355ml", "Session IPA", "/produtos/lagunitas/cerveja-lagunitas-day-time-ln-355ml.png"),
      product("Lagunitas IPA Long Neck 355ml", "IPA", "/produtos/lagunitas/cerveja-lagunitas-ipa-ln-355ml.png"),
      product("Lagunitas IPA Lata 350ml", "IPA", "/produtos/lagunitas/cerveja-lagunitas-ipa-lt-350ml.png"),
      product("Chopp Lagunitas IPA 30L", "Chopp", "/produtos/lagunitas/chopp-lagunitas-ipa-30l.png"),
    ],
  },
  {
    name: "Vibes",
    summary: "Hard seltzer com visual jovem e proposta refrescante.",
    description:
      "Vibes representa um consumo leve, atual e conectado com ocasiões de descontração, ampliando o portfólio com uma categoria em destaque.",
    logo: "/brands/amstel-vibes.png",
    logoClassName: "h-28 max-w-[126px]",
    modalLogoClassName: "h-24 max-w-[128px]",
    products: [
      product("Amstel Vibes Limão 269ml", "Drink Pronto", "/produtos/vibes/drink-pronto-amstel-vibes-limao-lt-269ml.png"),
      product(
        "Amstel Vibes Morango e Melancia 269ml",
        "Drink Pronto",
        "/produtos/vibes/drink-pronto-amstel-vibes-morango-e-melancia-lt-269ml.png"
      ),
    ],
  },
  {
    name: "FYS",
    summary: "Refrigerante com comunicação vibrante e alta lembrança.",
    description:
      "FYS combina presença de marca, variedade e boa performance comercial, sendo uma opção estratégica dentro da linha de não alcoólicos.",
    logo: "/brands/fys.png",
    logoClassName: "h-[4.5rem] max-w-[150px]",
    logoImageClassName: "invert brightness-0",
    modalLogoImageClassName: "invert brightness-0",
    products: [
      product("FYS Guaraná da Amazônia 350ml", "Refrigerante", "/produtos/fys/refrigerante-fys-guarana-da-amazonia-lt-350ml.png"),
      product("FYS Guaraná da Amazônia Zero 350ml", "Refrigerante Zero", "/produtos/fys/refrigerante-fys-guarana-da-amazonia-zero-lt-350ml.png"),
      product("FYS Laranja-Pera 350ml", "Refrigerante", "/produtos/fys/refrigerante-fys-laranja-pera-lt-350ml.png"),
      product("FYS Limão Siciliano 350ml", "Refrigerante", "/produtos/fys/refrigerante-fys-limao-siciliano-lt-350ml.png"),
      product("FYS Limão Siciliano Zero 350ml", "Refrigerante Zero", "/produtos/fys/refrigerante-fys-limao-siciliano-zero-lt-350ml.png"),
      product("FYS Tônica 350ml", "Tônica", "/produtos/fys/tonica-fys-lt-350ml.png"),
      product("FYS Tônica Zero 350ml", "Tônica Zero", "/produtos/fys/tonica-zero-fys-lt-350ml.png"),
    ],
  },
  {
    name: "Itubaína",
    summary: "Clássico brasileiro com forte apelo afetivo e regional.",
    description:
      "Itubaína é uma marca tradicional e querida pelo consumidor, trazendo familiaridade, nostalgia e excelente valor para o mix.",
    logo: "/brands/itubaina.png",
    logoClassName: "h-20 max-w-[184px]",
    modalLogoClassName: "h-[4.5rem] max-w-[188px]",
    products: [
      product("Itubaína Long Neck 355ml", "Refrigerante", "/produtos/itubaina/refrigerante-itubaina-ln-355ml.png"),
      product("Itubaína Lata 350ml", "Refrigerante", "/produtos/itubaina/refrigerante-itubaina-lt-350ml.png"),
    ],
  },
  {
    name: "Skinka",
    summary: "Linha de sucos com apelo direto e comercial.",
    description:
      "Skinka mantém uma linha de sucos prática, acessível e conhecida do público, contribuindo para variedade e amplitude no portfólio.",
    logo: "/brands/skinka.png",
    products: [
      product("Skinka Frutas Cítricas 450ml", "Suco", "/produtos/skinka/suco-skinka-frutas-citricas-gfa-450ml.png"),
      product("Skinka Frutas Vermelhas 450ml", "Suco", "/produtos/skinka/suco-skinka-frutas-vermelhas-gfa-450ml.png"),
      product("Skinka Uva 450ml", "Suco", "/produtos/skinka/suco-skinka-uva-gfa-450ml.png"),
    ],
  },
  {
    name: "Baer-Mate",
    summary: "Bebidas gaseificadas com personalidade e posicionamento alternativo.",
    description:
      "Baer-Mate amplia o mix com bebidas marcantes e diferenciadas, ideais para ocasiões de consumo dinâmicas, leves e contemporâneas.",
    logo: "/brands/baer-mate.png",
    logoClassName: "h-14 max-w-[224px]",
    modalLogoClassName: "h-14 max-w-[230px]",
    products: [
      product("Baer-Mate Long Neck 350ml", "Chá Mate Gaseificado", "/produtos/baer-mate/cha-mate-gaseificado-baer-mate-ln-350ml.png"),
      product("Baer-Mate Lata 269ml", "Chá Mate Gaseificado", "/produtos/baer-mate/cha-mate-gaseificado-baer-mate-lt-269ml.png"),
      product("Baer-Matcha Long Neck 350ml", "Matcha Gaseificado", "/produtos/baer-mate/matcha-gaseificado-baer-matcha-ln-350ml.png"),
    ],
  },
  {
    name: "Mamba Water",
    summary: "Linha de águas com visual limpo e proposta funcional.",
    description:
      "Mamba Water reforça conveniência e versatilidade no portfólio, entregando opções de hidratação e bebidas funcionais com apresentação moderna.",
    logo: "/brands/mamba-water.png",
    logoClassName: "h-12 max-w-[232px]",
    modalLogoClassName: "h-12 max-w-[240px]",
    products: [
      product("Mamba Water com Gás 350ml", "Água com Gás", "/produtos/mamba-water/agua-mamba-water-com-gas-lt-350ml.png"),
      product("Mamba Water sem Gás 350ml", "Água Mineral", "/produtos/mamba-water/agua-mamba-water-sem-gas-lt-350ml.png"),
      product(
        "Mamba Water Protein Abacaxi com Hortelã 350ml",
        "Bebida Proteica",
        "/produtos/mamba-water/bebida-proteica-mamba-water-protein-abacaxi-com-hortela-lt-350ml.png"
      ),
      product(
        "Mamba Water Protein Limão e Framboesa 350ml",
        "Bebida Proteica",
        "/produtos/mamba-water/bebida-proteica-mamba-water-protein-limao-e-framboesa-lt-350ml.png"
      ),
      product(
        "Mamba Water Protein Maracujá, Manga e Pêssego 350ml",
        "Bebida Proteica",
        "/produtos/mamba-water/bebida-proteica-mamba-water-protein-maracuja-manga-e-pessego-lt-350ml.png"
      ),
    ],
  },
]

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const whatsappUrl = buildWhatsAppUrl(getBrandWhatsAppMessage(brand.name))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          ref={cardRef}
          type="button"
          className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-secondary/45 text-left transition-all duration-500 hover:-translate-y-2 hover:border-accent/45 hover:shadow-2xl hover:shadow-accent/10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: `${(index % 8) * 55}ms` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(71,191,99,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0))]" />
          <div className="relative flex h-full flex-col p-5 lg:p-6">
            <div
              className={cn(
                "flex min-h-[168px] items-center justify-center rounded-[1.25rem] border border-white/8 bg-background/65 p-6",
                brand.logoSurfaceClassName
              )}
            >
              <div className={cn("relative h-24 w-full max-w-[180px]", brand.logoClassName)}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className={cn(
                    "object-contain transition-transform duration-500 group-hover:scale-105",
                    brand.logoImageClassName
                  )}
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                  {brand.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {brand.summary}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                Ver produtos
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-hidden border-white/10 bg-background/95 p-0 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:max-w-4xl">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(71,191,99,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0))] p-6 sm:p-8">
            <DialogHeader className="pr-10 text-left">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div
                  className={cn(
                    "flex h-24 w-full max-w-[200px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-secondary/55 p-5",
                    brand.modalLogoSurfaceClassName ?? brand.logoSurfaceClassName
                  )}
                >
                  <div className={cn("relative h-16 w-full max-w-[200px]", brand.modalLogoClassName ?? brand.logoClassName)}>
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className={cn("object-contain", brand.modalLogoImageClassName ?? brand.logoImageClassName)}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <DialogTitle className="text-2xl font-bold text-foreground sm:text-3xl">
                    {brand.name}
                  </DialogTitle>
                  <DialogDescription className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    {brand.description}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  Produtos da marca
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Linha real da marca {brand.name} disponível para consulta comercial.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brand.products.map((product) => (
                <div
                  key={`${brand.name}-${product.name}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/8 bg-secondary/35 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/8"
                >
                  <div className="flex h-[220px] items-center justify-center bg-background/55 p-6">
                    {product.image ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-muted-foreground/30">
                        {product.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h4 className="text-base font-bold text-foreground">{product.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-white/8 bg-secondary/25 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-base font-semibold text-foreground">
                  Quer consultar disponibilidade e mix completo?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fale com a equipe da São Rafael para receber atendimento comercial da marca {brand.name}.
                </p>
              </div>

              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-6 py-6 font-semibold shadow-lg shadow-accent/20"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Consultar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Products() {
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
      id="produtos"
      className="bg-gradient-to-b from-background via-secondary/10 to-background py-24 lg:py-32"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Nosso Portfólio
          </span>
          <h2 className="text-3xl font-bold text-foreground text-balance sm:text-4xl lg:text-5xl">
            Marcas de{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              qualidade
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Selecione a marca para conhecer a linha disponível e consultar produtos com a equipe da São Rafael.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:grid-cols-4">
          {brands.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
