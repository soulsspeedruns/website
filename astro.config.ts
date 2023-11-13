import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	adapter: vercel(),
	integrations: [
		markdoc(),
		keystatic(),
		react(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
})
