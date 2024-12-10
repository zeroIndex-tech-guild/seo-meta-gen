import { AccessToken, User } from '~/types/auth'
import { createStore } from 'zustand'
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

export const userStore = createStore(
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
