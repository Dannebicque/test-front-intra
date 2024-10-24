import axios from 'axios'
import { useLoaderStore } from '@/stores/loaderStore'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL de base de l'API (dans le fichier .env)
  timeout: 10000, // Timeout
  headers: {
    'Content-Type': 'application/ld+json',
    Accept: 'application/ld+json'
  }
})

// Intercepter les requêtes pour ajouter un token d'authentification, par exemple
apiClient.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

apiClient.interceptors.request.use(
  (config) => {
    const loaderStore = useLoaderStore()
    // Activer le loader avant la requête
    loaderStore.setLoading(true)
    return config
  },
  (error) => {
    const loaderStore = useLoaderStore()
    // Désactiver le loader en cas d'erreur de requête
    loaderStore.setLoading(false)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    const loaderStore = useLoaderStore()
    // Désactiver le loader après la réponse
    loaderStore.setLoading(false)
    return response
  },
  (error) => {
    const loaderStore = useLoaderStore()
    // Désactiver le loader en cas d'erreur de réponse
    loaderStore.setLoading(false)
    if (error.response.status === 401) {
      // Rediriger vers la page de connexion si non authentifié
    }
    return Promise.reject(error)
  }
)

export default apiClient
