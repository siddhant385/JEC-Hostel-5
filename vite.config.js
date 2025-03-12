import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  
})

// import react from "@vitejs/plugin-react";

// import { defineConfig } from "vite";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   define: {
//     "process.env": {},
//   },
// });
