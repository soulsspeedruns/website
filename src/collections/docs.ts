import { collection, fields } from '@keystatic/core'

export const docs = collection({
	label: 'Pages',
	slugField: 'title',
	path: 'src/content/docs/**',
	format: {
		contentField: 'content',
	},
	schema: {
		title: fields.slug({
			name: {
				label: 'Title',
			},
		}),
		content: fields.document({
			label: 'Content',
			formatting: true,
			dividers: true,
			links: true,
			tables: true,
			images: {
				directory: 'src/assets/images/docs',
				publicPath: '../../assets/images/docs',
			},
		}),
	},
})
