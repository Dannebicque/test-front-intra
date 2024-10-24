
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles.scss'

import PrimeVue from 'primevue/config';
import Nora from '@primevue/themes/nora';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Nora
  }
});

app.mount('#app')
