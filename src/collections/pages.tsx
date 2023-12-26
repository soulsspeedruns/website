import { collection, component, fields } from '@keystatic/core'
import { YouTube as YouTubePreview } from '@/components/markdoc/youtube.preview'

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
			componentBlocks: {
				icon: component({
					preview: () => null,
					label: 'Icon',
					schema: {
						name: fields.text({
							label: 'Icon name',
							description: 'An icon name from the lucide.dev icon library',
						}),
					},
				}),
				youtube: component({
					preview: ({ fields }) => {
						return <YouTubePreview src={fields.src.value} />
					},
					label: 'Youtube',
					schema: {
						src: fields.text({
							label: 'Source',
							description: 'Link to the YouTube video',
							validation: {
								length: {
									min: 0,
								},
							},
						}),
					},
				}),
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
