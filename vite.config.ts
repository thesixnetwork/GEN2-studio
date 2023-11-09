import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
// import { resolve, join } from 'path'
// import * as fs from 'fs';
// const root = resolve(__dirname, 'src')
// const outDir = resolve(__dirname, 'dist')

// plugin
// const redirectToDir = ({ root }) => ({
//   name: 'redirect-to-dir',
//   configureServer(server) {
//     server.middlewares.use((req, res, next) => {
//       const filePath = join(root, req.url);
// console.log(req)
//       fs.stat(filePath, (err, stats) => {
//         if (!err && stats.isDirectory() && !req.url.endsWith('/')) {
//           res.statusCode = 300;
//           res.setHeader('Location', req.url+"/");
//           res.setHeader('Content-Length', '0');
//           res.end();
//           return;
//         }
//         next();
//       });
//     })
//   },
// });

export default defineConfig({
  plugins: [react(), 
    // redirectToDir({root})
  ],
  // root,
  resolve: {
    alias: {
      crypto: 'crypto-js',
    },
  },
  
  // build: {
  //   outDir,
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: resolve(root, 'index.html'),
  //     }
  //   }
  // }
  
})

