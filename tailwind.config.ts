import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mdoc}'],
	plugins: [typography],
} satisfies Config
