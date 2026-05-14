import { useState, useEffect, useRef } from 'react'
import * as authApi from '@/api/auth'

export type VerifyState = 'loading' | 'success' | 'invalid' | 'expired'

export function useVerifyEmail(token: string | null) {
  const [state, setState] = useState<VerifyState>(token ? 'loading' : 'invalid')
  const hasVerifiedRef = useRef(false)

  useEffect(() => {
    if (!token) return

    if (hasVerifiedRef.current) return
    hasVerifiedRef.current = true

    authApi
      .verifyEmail(token)
      .then(() => setState('success'))
      .catch((err: unknown) => {
        const status = (err as { response?: { status?: number } })?.response?.status
        setState(status === 410 ? 'expired' : 'invalid')
      })
  }, [token])

  return { state }
}
