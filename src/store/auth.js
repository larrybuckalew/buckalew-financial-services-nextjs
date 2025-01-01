import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(persist(
  (set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    login: (userData, token) => set({
      user: userData,
      token: token,
      isAuthenticated: true
    }),

    logout: () => set({
      user: null,
      token: null,
      isAuthenticated: false
    }),

    updateUser: (userData) => set(state => ({
      user: { ...state.user, ...userData }
    }))
  }),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated
    })
  }
));

export default useAuthStore;