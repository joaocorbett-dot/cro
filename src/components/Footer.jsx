import { instagramProfileUrl } from '../lib/contact.js'

export default function Footer() {
  const igUrl = instagramProfileUrl()
  const location = import.meta.env.VITE_SITE_LOCATION

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <span>CRÓ arts &amp; crafts{location ? ` — ${location}` : ''}</span>
        {igUrl && (
          <a href={igUrl} target="_blank" rel="noreferrer">
            instagram.com/cro.arts.crafts
          </a>
        )}
      </div>
    </footer>
  )
}
