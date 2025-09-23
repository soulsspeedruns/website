import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import markdoc from '@astrojs/markdoc'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import { MagicRegExpTransformPlugin } from 'magic-regexp/transform'

// https://astro.build/config
export default defineConfig({
	output: 'static',
	adapter: vercel(),
	vite: {
		server: {
			fs: {
				allow: ['../'],
			},
		},
		plugins: [MagicRegExpTransformPlugin.vite()],
	},
	site: 'https://soulsspeedruns.com',
	integrations: [
		markdoc(),
		prefetch(),
		react(),
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
})
