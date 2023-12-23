import { collection, fields } from '@keystatic/core'

export const games = collection({
	label: 'Games',
	slugField: 'name',
	path: 'src/content/games/*',
	schema: {
		name: fields.slug({
			name: {
				label: 'Name',
			},
		}),
		homepage: fields.relationship({
			label: 'Homepage',
			collection: 'pages',
			validation: {
				isRequired: true,
			},
		}),
		assets: fields.object({
			background: fields.image({
				label: 'Background',
				directory: 'public/games',
				publicPath: '/games',
				validation: {
					isRequired: true,
				},
			}),
		}),
	},
})
