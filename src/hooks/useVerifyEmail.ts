import { useState, useEffect } from 'react'
import * as authApi from '@/api/auth'

export type VerifyState = 'loading' | 'success' | 'invalid' | 'expired'

export function useVerifyEmail(token: string | null) {
  const [state, setState] = useState<VerifyState>('loading')

  useEffect(() => {
    if (!token) {
      setState('invalid')
      return
    }

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
