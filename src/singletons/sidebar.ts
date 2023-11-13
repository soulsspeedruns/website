import { fields, singleton } from '@keystatic/core'

const link = fields.conditional(
	fields.checkbox({
		label: 'External link',
		defaultValue: false,
	}),
	{
		true: fields.object({
			href: fields.text({
				label: 'Href',
			}),
			label: fields.text({
				label: 'Label',
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
		}),
		false: fields.object({
			page: fields.relationship({
				label: 'Page',
				collection: 'docs',
				validation: {
					isRequired: true,
				},
			}),
			label: fields.text({
				label: 'Overwrite label',
			}),
		}),
	},
)

const item = fields.object({
	link,
	children: fields.array(link, {
		label: 'Link',
		itemLabel: (props) =>
			props.discriminant === true
				? props.value.fields.label.value
				: props.value.fields.label.value || props.value.fields.page.value || '',
	}),
})

export const sidebar = singleton({
	label: 'Sidebar',
	path: 'src/content/sidebar/main',
	schema: {
		items: fields.array(item, {
			label: 'Link',
			itemLabel: (props) =>
				props.fields.link.discriminant === true
					? props.fields.link.value.fields.label.value
					: props.fields.link.value.fields.label.value ||
					  props.fields.link.value.fields.page.value ||
					  '',
		}),
	},
})
