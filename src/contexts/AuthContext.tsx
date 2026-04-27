import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { queryClient } from '@/lib/queryClient'
import * as authApi from '@/api/auth'
import type { User, LoginDto } from '@/types/auth'

const TOKEN_KEY = 'auth_token'

interface JwtPayload {
  id: number
  email: string
  exp: number
}

interface AuthContextValue {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (dto: LoginDto) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) {
      try {
        const payload = jwtDecode<JwtPayload>(stored)
        if (payload.exp * 1000 > Date.now()) {
          setToken(stored)
          setUser({ id: payload.id, email: payload.email })
        } else {
          localStorage.removeItem(TOKEN_KEY)
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const saveSession = (newToken: string, newUser: User) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
    setUser(newUser)
  }

  const login = async (dto: LoginDto) => {
    const { token: newToken, user: newUser } = await authApi.login(dto)
    saveSession(newToken, newUser)
  }

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
    queryClient.clear()
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
