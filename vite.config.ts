// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/NobaanPWI-Task/",
// });

import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";
import replace from "@rollup/plugin-replace";
// interface MyManifestOptions extends Partial<ManifestOptions> {
//   assetsDir?: string;
// }

// const pwaOptions: Partial<VitePWAOptions<MyManifestOptions>> = {
const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  // base: "http://ali-khoshqamat.github.io/NobaanPWI-Task/",
  base: "/NobaanPWI-Task/",

  // base: "/",
  includeAssets: ["vite.svg", "assets"],
  // build: { assetsDir: "static" },
  manifest: {
    name: "Nobaan PWA",
    short_name: "Nobaan PWA",
    theme_color: "#ffffff",
    // start_url: "./",

    icons: [
      {
        src: "pwa-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    // add assetsDir to the manifest object
    // assetsDir: "assets",
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html",
  },
};

const replaceOptions = { __DATE__: new Date().toISOString() };
const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

if (process.env.SW === "true") {
  pwaOptions.srcDir = "src";
  pwaOptions.filename = claims ? "claims-sw.ts" : "prompt-sw.ts";
  pwaOptions.strategies = "injectManifest";
  (pwaOptions.manifest as Partial<ManifestOptions>).name =
    "PWA Inject Manifest";
  (pwaOptions.manifest as Partial<ManifestOptions>).short_name = "PWA Inject";
}

if (claims) pwaOptions.registerType = "autoUpdate";

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = "true";
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

export default defineConfig({
  // base: process.env.BASE_URL || 'https://github.com/',
  // base:
  //   process.env.BASE_URL || "http://ali-khoshqamat.github.io/NobaanPWI-Task",
  base: "/NobaanPWI-Task/",

  build: {
    sourcemap: process.env.SOURCE_MAP === "true",
  },
  plugins: [reactRefresh(), VitePWA(pwaOptions), replace(replaceOptions)],
});
