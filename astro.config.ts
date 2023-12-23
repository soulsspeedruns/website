import { defineConfig, type ViteUserConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import markdoc from '@astrojs/markdoc'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import keystatic from '@keystatic/astro'

const vite: ViteUserConfig = {
	server: {
		fs: {
			allow: ['../'],
		},
	},
}

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	adapter: vercel(),
	vite,
	site: 'https://soulsspeedruns.com',
	integrations: [
		markdoc(),
		prefetch(),
		react(),
		keystatic(),
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
})
