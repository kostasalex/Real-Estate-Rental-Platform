import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
  server: {
    fs: {
      allow: [
        'C:/Users/mpamp/OneDrive/ThisPC/AirbnbClone/airbnb_clone/frontend',
        'C:/Users/mpamp/OneDrive/ThisPC/AirbnbClone/airbnb_clone/node_modules/vite/dist/client',
        'C:/Users/mpamp/OneDrive/ThisPC/AirbnbClone/airbnb_clone/node_modules/leaflet/dist/images'
      ],
    },
  },
};
