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
		speedrundotcomId: fields.text({
			label: 'Speedrun.com ID',
			description: "If no id is provided, the game's slug will be used",
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
