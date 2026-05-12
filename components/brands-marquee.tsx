"use client"

import Image from "next/image"

const brands = [
  { name: "Heineken", logo: "/brands/heineken.png" },
  { name: "Heineken 0.0", logo: "/brands/heineken-00.png" },
  { name: "Amstel", logo: "/brands/amstel.png" },
  { name: "Amstel Ultra", logo: "/brands/amstel-ultra.png" },
  { name: "Amstel Vibes", logo: "/brands/amstel-vibes.png" },
  { name: "Schin", logo: "/brands/schin.png" },
  { name: "Glacial", logo: "/brands/glacial.png" },
  { name: "Praya", logo: "/brands/praya.png" },
  { name: "Baden Baden", logo: "/brands/baden-baden.png" },
  { name: "Blue Moon", logo: "/brands/blue-moon.png" },
  { name: "Lagunitas", logo: "/brands/lagunitas.png" },
  { name: "FYS", logo: "/brands/fys.png" },
  { name: "Itubaína", logo: "/brands/itubaina.png" },
  { name: "Skinka", logo: "/brands/skinka.png" },
  { name: "Baer-Mate", logo: "/brands/baer-mate.png" },
  { name: "Mamba Water", logo: "/brands/mamba-water.png" },
]

export function BrandsMarquee() {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 mb-10">
        <p className="text-center text-muted-foreground text-lg">
          Trabalhamos com as principais marcas do mercado
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Marquee track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* First set */}
          <div className="flex items-center gap-16 flex-shrink-0">
            {brands.map((brand) => (
              <div 
                key={brand.name} 
                className="flex-shrink-0 w-28 h-28 flex items-center justify-center"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={112}
                  height={112}
                  className="max-h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-16 flex-shrink-0 ml-16">
            {brands.map((brand) => (
              <div 
                key={`${brand.name}-dup`} 
                className="flex-shrink-0 w-28 h-28 flex items-center justify-center"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={112}
                  height={112}
                  className="max-h-20 w-auto object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
