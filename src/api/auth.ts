import api from '@/lib/axios'
import type { AuthResponse, LoginDto, RegisterDto } from '@/types/auth'

export const login = async (dto: LoginDto): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', dto)
  return data
}

export const register = async (dto: Omit<RegisterDto, 'confirmPassword'>): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>('/auth/register', dto)
  return data
}

export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  const { data } = await api.get<{ message: string }>('/auth/verify-email', { params: { token } })
  return data
}

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>('/auth/forgot-password', { email })
  return data
}

export const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>('/auth/reset-password', { token, newPassword })
  return data
}
