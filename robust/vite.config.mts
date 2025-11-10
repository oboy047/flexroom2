import { defineConfig } from "vite";
import { redwood } from "rwsdk/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  environments: {
    ssr: {}, // nødvendig for React Server Components
  },
  plugins: [
    redwood(),
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
  ],
});
