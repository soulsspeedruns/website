import { z, reference, defineCollection } from 'astro:content'

const games = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			homepage: reference('docs'),
			assets: z.object({
				background: image(),
			}),
		}),
})

const docs = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
	}),
})

const link = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('internal'),
		label: z.string().optional(),
		doc: reference('docs'),
	}),
	z.object({
		type: z.literal('external'),
		label: z.string(),
		href: z.string(),
	}),
])

const group = z.object({
	name: z.string(),
	children: z.array(link),
})

const sidebar = defineCollection({
	type: 'data',
	schema: z.array(z.union([group, link])),
})

export const collections = {
	games,
	docs,
	sidebar,
}
