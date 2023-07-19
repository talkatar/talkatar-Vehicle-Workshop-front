import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  VitePWA({
    manifest: {
      "name": "Vehicle Workshop ",
      "short_name": "Vehicle Workshop",
      "start_url": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "lang": "en",
      "scope": "/",
      "icons": [
        {
          "src": "https://res.cloudinary.com/dm72lanye/image/upload/v1688572623/y9wiwttwsa7kssrfrcmh.png",
          "sizes": "48x48",
          "type": "image/png"
        },

        {
          "src": "https://res.cloudinary.com/dm72lanye/image/upload/v1688572623/vprla0asorrxltit4art.png",
          "sizes": "144x144",
          "type": "image/png"
        }
      ]
    }

  }),
  ],
  build:{
    outDir:'../backend/public',
    emptyOutDir:true,
    chunkSizeWarningLimit: 1024 * 1024, 
  }
})