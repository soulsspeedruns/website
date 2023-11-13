import { config, fields, collection, type Config } from '@keystatic/core'

const storage: Config['storage'] =
	import.meta.env && false
		? {
				kind: 'local',
		  }
		: {
				kind: 'github',
				repo: {
					owner: 'soulsspeedruns',
					name: 'website',
				},
		  }

export default config({
	storage,
	ui: {
		brand: {
			name: 'Souls Speedruns',
		},
	},
	collections: {
		docs: collection({
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
					images: {
						directory: 'src/content/docs/_images',
						publicPath: '/src/content/docs/_images',
					},
				}),
			},
		}),
		games: collection({
			label: 'Games',
			slugField: 'name',
			path: 'src/content/games/*',
			format: 'yaml',
			schema: {
				name: fields.text({
					label: 'Name',
					validation: {
						length: {
							min: 0,
						},
					},
				}),
				homepage: fields.relationship({
					label: 'Homepage',
					collection: 'docs',
					validation: {
						isRequired: true,
					},
				}),
				assets: fields.object({
					background: fields.image({
						label: 'Background',
						directory: 'public/assets',
					}),
				}),
			},
		}),
	},
})
