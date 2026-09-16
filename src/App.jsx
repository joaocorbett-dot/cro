import { Routes, Route } from 'react-router-dom'
import Storefront from './pages/Storefront.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import { useAuth } from './lib/useAuth.js'

function RequireAuth({ children }) {
  const { session, loading } = useAuth()
  if (loading) return <div className="page-loading">Loading…</div>
  if (!session) return <AdminLogin />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Storefront />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        }
      />
    </Routes>
  )
}
