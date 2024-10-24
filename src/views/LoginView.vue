// src/components/Login.vue
<template>
  <div>
    <form @submit.prevent="login">
      <InputText v-model="username" placeholder="Login" />
      <InputText type="password" v-model="password" placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import AuthService from '@/services/authService'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useUserStore } from '@/stores/userStore.js'

const username = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const route = useRoute();
const userStore = useUserStore()
const login = () => {
  userStore.login({ username: username.value, password: password.value })
    .then(() => {
      const redirectTo = route.query.redirect || '/';
      console.log(redirectTo)
      router.push(redirectTo);
    })
    .catch(() => {
      error.value = 'Failed to login'
    })
}
</script>
