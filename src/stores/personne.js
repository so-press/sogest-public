import { defineStore } from 'pinia'
import http from '../http'

export const usePersonneStore = defineStore('personne', {
  state: () => ({
    personnes: [],
    error: null,
  }),
  actions: {
    async fetch() {
      try {
        const res = await http.get('/personne')
        this.personnes = res.data
        this.error = null
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch personnes'
      }
    },
    async create(data) {
      try {
        const res = await http.post('/personne', data)
        this.personnes.push(res.data)
        this.error = null
      } catch (err) {
        this.error = err.response?.data?.message || 'Create failed'
      }
    },
    async update(id, data) {
      try {
        const res = await http.put(`/personne/${id}`, data)
        const index = this.personnes.findIndex(p => p.id === id)
        if (index !== -1) this.personnes[index] = res.data
        this.error = null
      } catch (err) {
        this.error = err.response?.data?.message || 'Update failed'
      }
    },
    async remove(id) {
      try {
        await http.delete(`/personne/${id}`)
        this.personnes = this.personnes.filter(p => p.id !== id)
        this.error = null
      } catch (err) {
        this.error = err.response?.data?.message || 'Delete failed'
      }
    },
  },
})
