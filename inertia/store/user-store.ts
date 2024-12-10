import { AccessToken, User } from '~/types/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserState = {
  user: User | null
  tokens: AccessToken | null
}

type UserActions = {
  setUser: (user: User) => void
  setTokens: (tokens: AccessToken) => void
}

type UserStore = UserState & UserActions

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      tokens: null,
      setUser: (user: User) => set({ user }),
      setTokens: (tokens: AccessToken) => set({ tokens }),
    }),
    {
      name: 'user-store',
    }
  )
)
