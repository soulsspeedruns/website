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
		table: {
			render: component('@/components/markdoc/table.astro'),
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
	tags: {
		alert: {
			render: component('@/components/markdoc/alert.astro'),
			attributes: {
				title: {
					type: String,
				},
			},
		},
		'youtube-icon': {
			render: component('@/components/markdoc/youtube-icon.astro'),
			selfClosing: true,
		},
	},
})
