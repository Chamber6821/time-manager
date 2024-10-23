import { create } from "zustand";
import { getItem, setItem } from "expo-secure-store";

type Session = {
  username?: string,
  login: (name: string) => void,
  logout: () => void
}

export const useSession = create<Session>((set) => ({
  username: getItem('username') || undefined,
  login: (name: string) => {
    setItem('username', name)
    set({ username: name })
  },
  logout: () => {
    setItem('username', '')
    set({ username: undefined })
  }
}))
