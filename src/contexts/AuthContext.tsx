import { useState, useCallback, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { queryClient } from '@/lib/queryClient'
import * as authApi from '@/api/auth'
import { AuthContext } from './authContext'
import type { User, LoginDto } from '@/types/auth'

const TOKEN_KEY = 'auth_token'

interface JwtPayload {
  id: number
  email: string
  exp: number
}

function restoreSession(): { token: string | null; user: User | null } {
  const stored = localStorage.getItem(TOKEN_KEY)
  if (!stored) return { token: null, user: null }
  try {
    const payload = jwtDecode<JwtPayload>(stored)
    if (payload.exp * 1000 > Date.now()) {
      return { token: stored, user: { id: payload.id, email: payload.email } }
    }
  } catch {
    // invalid token — ignore
  }
  localStorage.removeItem(TOKEN_KEY)
  return { token: null, user: null }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ token, user }, setSession] = useState(() => {
    const restored = restoreSession()
    return { token: restored.token, user: restored.user, isLoading: false }
  })

  const saveSession = (newToken: string, newUser: User) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    setSession({ token: newToken, user: newUser, isLoading: false })
  }

  const login = async (dto: LoginDto) => {
    const { token: newToken, user: newUser } = await authApi.login(dto)
    saveSession(newToken, newUser)
  }

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setSession({ token: null, user: null, isLoading: false })
    queryClient.clear()
  }, [])

  const { isLoading } = { isLoading: false }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}