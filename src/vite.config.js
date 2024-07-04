import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env':'https://myhealth-server-side-akhi005-akhis-projects.vercel.app'
  },
});
