import type { MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Click handler for landing-page section anchors (#tarifs, #fonctionnalites, ...).
 * Scrolls directly when already on "/"; navigates there first otherwise.
 * Always intercepts the click instead of letting the browser change
 * location.hash natively, since that hash also drives client-side routing.
 */
export function useSectionLink() {
  const navigate = useNavigate()
  const location = useLocation()

  return (id: string) => (event: MouseEvent) => {
    event.preventDefault()
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
