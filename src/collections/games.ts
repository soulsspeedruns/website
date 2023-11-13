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
			collection: 'docs',
			validation: {
				isRequired: true,
			},
		}),
		assets: fields.object({
			background: fields.image({
				label: 'Background',
				directory: 'src/assets/images/games',
				publicPath: '../../assets/images/games',
			}),
		}),
	},
})
