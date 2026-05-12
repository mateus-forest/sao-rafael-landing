import { MapPin, Phone, Instagram, Facebook } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo-white.png"
                alt="São Rafael Distribuidora"
                width={80}
                height={80}
              />
            </div>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              Há mais de 35 anos entregando qualidade e tradição. Revendedor autorizado Heineken com atendimento regional e estrutura própria.
            </p>
          </div>

          <div>
            <h3 className="mb-6 font-bold text-foreground">Contato</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">Vacaria - RS</p>
                    <p className="leading-relaxed">
                      R. Fontoura da Costa, 61 - Seminário, Vacaria - RS, 95200-000
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">Passo Fundo - RS</p>
                    <p className="leading-relaxed">
                      R. Antônio Gentil Fiori, 69 - Vila Mattos, Passo Fundo - RS, 99064-280
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="tel:+5554994588022"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-accent group"
                >
                  <Phone className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
                  <span>(54) 99458-8022</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-bold text-foreground">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/bebidassaorafael/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-accent/10 hover:text-accent"
                aria-label="Instagram @bebidassaorafael"
                title="@bebidassaorafael"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100063616479239"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-accent/10 hover:text-accent"
                aria-label="Facebook São Rafael Distribuidora"
                title="São Rafael Distribuidora"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} São Rafael Distribuidora de Bebidas. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Desde 1989 • Vacaria e Passo Fundo - RS
          </p>
        </div>
      </div>
    </footer>
  )
}
