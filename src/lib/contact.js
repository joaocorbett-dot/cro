const IG_HANDLE = import.meta.env.VITE_INSTAGRAM_HANDLE || ''
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || ''

export function instagramProfileUrl() {
  return IG_HANDLE ? `https://www.instagram.com/${IG_HANDLE}/` : null
}

export function whatsappBuyUrl(productName) {
  if (!WHATSAPP_NUMBER) return null
  const text = encodeURIComponent(`Oi! Eu queria comprar "${productName}".`)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}
