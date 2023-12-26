import { defineMarkdocConfig, component } from '@astrojs/markdoc/config'

export default defineMarkdocConfig({
	tags: {
		icon: {
			render: component('@/components/markdoc/icon.astro'),
			attributes: {
				name: {
					type: String,
					required: true,
				},
			},
		},
		youtube: {
			render: component('@/components/markdoc/youtube.astro'),
			attributes: {
				src: {
					type: String,
					required: true,
				},
			},
		},
	},
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
		table: {
			render: component('@/components/markdoc/table.astro'),
		},
		tbody: {
			render: component('@/components/markdoc/tbody.astro'),
		},
		thead: {
			render: component('@/components/markdoc/thead.astro'),
		},
		tr: {
			render: component('@/components/markdoc/tr.astro'),
		},
		th: {
			render: component('@/components/markdoc/th.astro'),
			attributes: {
				align: {
					type: String,
				},
				width: {
					type: [String, Number],
				},
			},
		},
		td: {
			render: component('@/components/markdoc/td.astro'),
			attributes: {
				align: {
					type: String,
				},
				colspan: {
					type: [String, Number],
				},
				rowspan: {
					type: [String, Number],
				},
			},
		},
	},
})
