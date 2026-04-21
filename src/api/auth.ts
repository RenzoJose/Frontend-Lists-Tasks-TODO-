import api from '@/lib/axios'
import type { AuthResponse, LoginDto, RegisterDto } from '@/types/auth'

export const login = async (dto: LoginDto): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', dto)
  return data
}

export const register = async (dto: Omit<RegisterDto, 'confirmPassword'>): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', dto)
  return data
}
