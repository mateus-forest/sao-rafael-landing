"use client"

const WHATSAPP_NUMBER = "54999902688"
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export function buildWhatsAppUrl(message: string) {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`
}

export function getBrandWhatsAppMessage(brandName: string) {
  return `Olá! Vim pelo site da São Rafael e gostaria de consultar os produtos da marca ${brandName}.`
}

export const whatsappLinks = {
  hero: buildWhatsAppUrl(
    "Olá! Vim pelo site da São Rafael Distribuidora de Bebidas e gostaria de conhecer melhor os produtos e atendimentos da empresa."
  ),
  regional: buildWhatsAppUrl(
    "Olá! Vim pelo site da São Rafael e gostaria de verificar atendimento para minha cidade."
  ),
  chopp: buildWhatsAppUrl(
    "Olá! Vim pelo site da São Rafael e gostaria de consultar os chopps disponíveis para eventos e estabelecimentos."
  ),
  footer: buildWhatsAppUrl(
    "Olá! Vim pelo site da São Rafael Distribuidora de Bebidas e gostaria de falar com a equipe."
  ),
}

export { WHATSAPP_NUMBER, WHATSAPP_BASE_URL }
