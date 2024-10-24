<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useLoaderStore } from '@/stores/loaderStore.js';
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore';


const userStore = useUserStore();
userStore.loadUserFromLocalStorage(); // Charger l'utilisateur dès que l'application démarre

const loaderStore = useLoaderStore();
const loading = computed(() => loaderStore.loading);

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>

      <span v-if="userStore.user">
        {{ userStore.user.username }}
        | <RouterLink to="/profile">Profile</RouterLink> |
        | <RouterLink to="/diplomes">Diplômes</RouterLink> |
        <RouterLink to="/logout">Logout</RouterLink>
      </span>
    </nav>
  </header>

  <div class="loader" v-if="loading">
    <div class="spinner"></div>
  </div>
  <RouterView />
</template>

<style scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
