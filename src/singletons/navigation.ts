import { fields, singleton } from '@keystatic/core'

const page = fields.object({
	slug: fields.relationship({
		label: 'Page',
		collection: 'pages',
		validation: {
			isRequired: true,
		},
	}),
	label: fields.text({
		label: 'Label',
		description: 'Overwrite the page title with a label',
	}),
})

const url = fields.object({
	url: fields.text({
		label: 'URL',
		validation: {
			length: {
				min: 0,
			},
		},
	}),
	label: fields.text({
		label: 'Label',
		description: "Required when using a URL, or overriding the page's title",
		validation: {
			length: {
				min: 0,
			},
		},
	}),
	newTab: fields.checkbox({
		label: 'Open in a new tab',
		defaultValue: true,
	}),
})

const link = fields.conditional(
	fields.select({
		label: 'Link type',
		options: [
			{ label: 'Page', value: 'page' },
			{ label: 'URL', value: 'url' },
		],
		defaultValue: 'page',
	}),
	{
		page,
		url,
	},
)

const group = fields.object({
	name: fields.text({
		label: 'Group name',
		validation: {
			length: {
				min: 0,
			},
		},
	}),
})

const linkOrGroup = fields.object({
	item: fields.conditional(
		fields.select({
			label: 'Link type or Group',
			options: [
				{ label: 'Page', value: 'page' },
				{ label: 'URL', value: 'url' },
				{ label: 'Group', value: 'group' },
			],
			defaultValue: 'page',
		}),
		{
			page,
			url,
			group,
		},
	),
	children: fields.array(link, {
		itemLabel: (props) => {
			if (props.discriminant === 'page') {
				return (
					props.value.fields.label.value ||
					props.value.fields.slug.value ||
					'Please select a page'
				)
			}

			return props.value.fields.label.value
		},
	}),
})

export const navigation = singleton({
	label: 'Navigation',
	path: 'src/content/navigation/main',
	schema: {
		items: fields.array(linkOrGroup, {
			itemLabel: (props) => {
				const getLabel = () => {
					if (props.fields.item.discriminant === 'group') {
						return props.fields.item.value.fields.name.value
					}

					if (props.fields.item.discriminant === 'url') {
						return props.fields.item.value.fields.label.value
					}

					return (
						props.fields.item.value.fields.label.value ||
						props.fields.item.value.fields.slug.value ||
						'Please select a page'
					)
				}

				let label = getLabel()

				if (props.fields.children.elements.length > 0) {
					label += ` (${props.fields.children.elements.length} children)`
				}

				return label
			},
		}),
	},
})
