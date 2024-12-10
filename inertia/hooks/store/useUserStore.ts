import { useStore } from 'zustand'
import { userStore } from '~/store/user-store'

export const useUserStore = () => useStore(userStore)
