import { collection, fields } from '@keystatic/core'

export const pages = collection({
	label: 'Pages',
	slugField: 'title',
	path: 'src/content/pages/**',
	entryLayout: 'content',
	format: {
		contentField: 'content',
	},
	schema: {
		title: fields.slug({
			name: {
				label: 'Title',
				validation: {
					length: {
						min: 0,
					},
				},
			},
			slug: {
				validation: {
					length: {
						min: 0,
					},
				},
			},
		}),
		content: fields.document({
			label: 'Content',
			formatting: true,
			dividers: true,
			links: true,
			tables: true,
			images: {
				directory: 'public/pages',
				publicPath: '/pages',
			},
		}),
		hidden: fields.checkbox({
			label: 'Hidden from search',
			defaultValue: false,
			description:
				"If checked, this page won't appear in the website's search results. The page will still be index by search engines.",
		}),
	},
})
