import { z, reference, defineCollection } from 'astro:content'

const games = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			name: z.string().default('lmao'),
			homepage: reference('docs'),
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

const docs = defineCollection({
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

const externalLink = z.object({
	discriminant: z.literal(true),
	value: z.object({
		href: z.string(),
		label: z.string(),
		newTab: z.boolean(),
	}),
})

export type SidebarExternalLink = z.infer<typeof externalLink>

const internalLink = z.object({
	discriminant: z.literal(false),
	value: z.object({
		page: reference('docs'),
		label: z.string().optional(),
	}),
})

export type SidebarInternalLink = z.infer<typeof internalLink>

const sidebarLink = z.discriminatedUnion('discriminant', [
	externalLink,
	internalLink,
])

export type SidebarLink = z.infer<typeof sidebarLink>

const sidebar = defineCollection({
	type: 'data',
	schema: z.object({
		items: z.array(
			z.object({
				link: sidebarLink,
				children: z.array(sidebarLink),
			}),
		),
	}),
})

export const collections = {
	games,
	docs,
	sidebar,
	socials,
}
