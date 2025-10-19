import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useUserStore = create()(persist((set) => ({
    settings: {
        theme: "light",
        currency: "USD",
        notifications: true,
    },
    updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings },
    })),
}), {
    name: "user-settings",
}));
