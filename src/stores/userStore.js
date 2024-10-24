// src/stores/userStore.js
import { defineStore } from 'pinia'
import AuthService from '@/services/authService'
import authService from '@/services/authService' // Service d'authentification

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // État utilisateur
    token: null // Stocke le token JWT
  }),
  getters: {
    isAuthenticated: (state) => !!state.user // Vérifie si l'utilisateur est connecté
  },
  actions: {
    // Action pour se connecter
    async login(credentials) {
      try {
        const response = await AuthService.login(credentials) // AuthService retourne le token JWT et l'utilisateur

        if (response.token) {
          // Stocker l'utilisateur et le token dans localStorage
          this.user = JSON.parse(localStorage.getItem('user'))
          this.token = localStorage.getItem('token')
        }
      } catch (error) {
        console.error('Failed to login', error)
        throw error
      }
    },

    // Action pour se déconnecter
    logout() {
      this.user = null
      this.token = null
      authService.logout()
    },

    // Restaurer l'état de l'utilisateur depuis localStorage (utile au chargement de l'application)
    loadUserFromLocalStorage() {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      if (user && token) {
        this.user = JSON.parse(user)
        this.token = token
      }
    }
  }
})
