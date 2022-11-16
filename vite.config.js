import vue from '@vitejs/plugin-vue';
import path from 'path';

export default {
  base: '/qui-veut-gagner-des-plots/',
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, '/src'),
  },
};
