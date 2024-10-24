import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AuthService from '@/services/authService';
import DiplomeView from '@/views/DiplomeView.vue'
import ProfileView from '@/views/ProfileView.vue' // Service pour gérer l'authentification

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/diplomes',
      name: 'diplomes',
      component: DiplomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        AuthService.logout(); // Appeler la méthode de déconnexion
        next({ name: 'login' }); // Rediriger vers la page de connexion
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  // Vérifier si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = AuthService.getCurrentUser(); // Récupérer l'utilisateur actuel

    if (!user) {
      // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      next({ name: 'login' });
    } else {
      // L'utilisateur est authentifié, continuer vers la route demandée
      next();
    }
  } else {
    // La route ne nécessite pas d'authentification, continuer
    next();
  }
});

export default router
