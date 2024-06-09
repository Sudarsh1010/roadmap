/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

await import("./src/env.js");

if (process.env.NODE_ENV === "development") {
	setupDevPlatform();
}

/** @type {import("next").NextConfig} */
const config = {
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
	images: {
		remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
	},
};

export default config;
