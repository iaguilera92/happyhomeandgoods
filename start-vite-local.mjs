import { createServer } from "./node_modules/vite/dist/node/index.js";
import react from "./node_modules/@vitejs/plugin-react/dist/index.mjs";

const server = await createServer({
  root: process.cwd(),
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    open: false,
  },
});

await server.listen();
console.log(JSON.stringify(server.resolvedUrls));
