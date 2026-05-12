export interface User {
  id: number
  email: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}
