import { Link } from 'react-router-dom'
import Badge from './Badge.jsx'
import { instagramProfileUrl } from '../lib/contact.js'

export default function Header() {
  const igUrl = instagramProfileUrl()

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <Badge size="sm" />
        <span className="brand-word">CRÓ</span>
      </Link>
      <div className="header-actions">
        {igUrl && (
          <a className="ig-link" href={igUrl} target="_blank" rel="noreferrer">
            @cro.arts.crafts
          </a>
        )}
      </div>
    </header>
  )
}
