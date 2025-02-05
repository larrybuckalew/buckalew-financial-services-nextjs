import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserSettings {
  theme: "light" | "dark"
  currency: string
  notifications: boolean
}

interface UserStore {
  settings: UserSettings
  updateSettings: (settings: Partial<UserSettings>) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      settings: {
        theme: "light",
        currency: "USD",
        notifications: true,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: "user-settings",
    }
  )
)
