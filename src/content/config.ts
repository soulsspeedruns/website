import { z, defineCollection } from 'astro:content'

const games = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
	}),
})

export const collections = {
	games,
}
