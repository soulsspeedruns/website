import { collection, fields } from '@keystatic/core'

export const socials = collection({
	label: 'Socials',
	slugField: 'name',
	path: 'src/content/socials/*',
	schema: {
		name: fields.slug({
			name: {
				label: 'Name',
			},
		}),
		link: fields.text({
			label: 'Link',
			validation: {
				length: {
					min: 0,
				},
			},
		}),
	},
})
