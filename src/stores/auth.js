import { defineStore } from 'pinia'
import http from '../http';

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    user: null,
    token: null,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(email, password) {
      try {
        const res = await http.post('/login', { email, password })
        this.token = res.data.token
        this.user = res.data.user
        this.error = null
        return true
      } catch (err) {
        console.log(err)
        this.error = err.response?.data?.message || 'Login failed'
        return false
      }
    },
  },
})
