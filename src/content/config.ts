import { z, reference, defineCollection } from 'astro:content'

const games = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			homepage: reference('pages'),
			assets: z.object({
				background: image(),
			}),
		}),
})

const socials = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		link: z.string(),
	}),
})

const pages = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		pagefind: z
			.object({
				ignore: z.boolean(),
			})
			.optional(),
	}),
})

// const externalLink = z.object({
// 	discriminant: z.literal('url'),
// 	value: z.object({
// 		href: z.string(),
// 		label: z.string(),
// 		newTab: z.boolean(),
// 	}),
// })

const item = z.discriminatedUnion('discriminant', [
	z.object({
		discriminant: z.literal('page'),
		value: z.object({
			slug: reference('pages'),
			label: z.string().optional(),
		}),
	}),
])

const navigation = defineCollection({
	type: 'data',
	schema: z.object({
		items: z.array(
			z.object({
				item,
				children: z.array(item),
			}),
		),
	}),
})

export const collections = {
	games,
	pages,
	navigation,
	socials,
}
