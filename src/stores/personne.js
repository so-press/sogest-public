import { defineStore } from 'pinia'
import http from '../http'

export const usePersonneStore = defineStore('personne', {
  persist: true,
  state: () => ({
    data: {},
    error: null,
  }),
  actions: {
    async fetch() {
      try {
        const res = await http.get('/personne')
        this.data = res.data
        this.error = null
      } catch (err) {
        console.log(err)
        this.error = err.response?.data?.message || 'Failed to fetch user details'
      }
    },
    updateField(field, value) {
      this.data = { ...this.data, [field]: value }
    },
  },
})
