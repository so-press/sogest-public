import { defineStore } from 'pinia'
import http from '../http'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    token: null,
    userId: null,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => {
      if (!state.token) return null
      try {
        const base64 = state.token.split('.')[1]
        const json = atob(base64)
        return JSON.parse(json)
      } catch (e) {
        return null
      }
    },
  },

  actions: {
    init() {
      if (this.token) {
        http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      }
    },
    async login(email, password) {
      try {
        const res = await http.post('/login', { email, password })
        this.token = res.data.token
        this.userId = res.data.userId
        this.error = null
        http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return true
      } catch (err) {
        console.log(err)
        this.error = err.response?.data?.message || 'Login failed'
        return false
      }
    },
    logout() {
      this.userId = null
      this.token = null
      delete http.defaults.headers.common['Authorization']
    },
  },
})
