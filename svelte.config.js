import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";

const mdExtensions = [".svx", ".md"];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
  },
  preprocess: [mdsvex({ extensions: mdExtensions })],
  extensions: [".svelte", ...mdExtensions],
};

export default config;
