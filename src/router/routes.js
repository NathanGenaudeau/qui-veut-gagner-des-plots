import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Presentation from '../views/Presentation.vue';
import NotFound from '../views/NotFound.vue';

export const routes = [
  {
    path: '/',
    name: 'Presentation',
    component: Presentation,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];
