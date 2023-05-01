import { createRouter, createWebHistory } from 'vue-router';
import Verifier from './components/Verifier.vue';
import GenderDistinguisher from './components/GenderDistinguisher.vue';

const routes = [
  { path: '/verifier', component: Verifier },
  { path: '/identifier', component: GenderDistinguisher },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;