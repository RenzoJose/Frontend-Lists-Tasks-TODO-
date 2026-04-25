import { useLocation } from 'react-router-dom'
import { Fade } from '@mui/material'
import type { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <Fade key={location.pathname} in timeout={220}>
      <div style={{ display: 'contents' }}>{children}</div>
    </Fade>
  )
}
