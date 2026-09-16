import Badge from './Badge.jsx'
import { instagramProfileUrl } from '../lib/contact.js'

export default function Hero() {
  const igUrl = instagramProfileUrl()
  const location = import.meta.env.VITE_SITE_LOCATION

  return (
    <section className="hero wrap">
      <div>
        <h1>Feito devagar, à mão, um nó de cada vez.</h1>
        <p className="hero-sub">
          Macramê, cestos trançados e peças em tecido para casa — cada uma feita sob encomenda
          {location ? ` em ${location}` : ''}. Veja as peças abaixo e mande uma mensagem para
          perguntar sobre alguma.
        </p>
        <div className="hero-cta-row">
          <a href="#shop" className="btn primary">
            Ver o que foi feito
          </a>
          {igUrl && (
            <a href={igUrl} target="_blank" rel="noreferrer" className="btn ghost">
              Acompanhe no Instagram
            </a>
          )}
        </div>
      </div>
      <div className="hero-visual">
        <Badge size="lg" />
      </div>
    </section>
  )
}
