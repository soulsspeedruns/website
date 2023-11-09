import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import markdoc from '@astrojs/markdoc'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
	integrations: [
		solidJs(),
		markdoc(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
})
