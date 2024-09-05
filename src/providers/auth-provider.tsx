"use client"
import AuthProvider from '@/providers/auth-provider'
import { SessionProvider } from "next-auth/react"

interface ProviderProps {
  children: React.ReactNode
}
export default function AuthProvider({children}: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}