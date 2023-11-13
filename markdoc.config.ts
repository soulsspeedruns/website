import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'

export default defineMarkdocConfig({
	nodes: {
		link: {
			render: component('@/components/markdoc/link.astro'),
			attributes: {
				title: {
					type: String,
				},
				href: {
					type: String,
				},
			},
		},
		image: {
			render: component('@/components/markdoc/image.astro'),
			attributes: {
				src: {
					type: String,
				},
				alt: {
					type: String,
				},
				title: {
					type: String,
				},
			},
		},
	},
})
