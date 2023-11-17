import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
	const query = url.searchParams.get('q')

	const pages = await getCollection('docs', (data) =>
		data.slug.startsWith(query ?? ''),
	)

	return new Response(JSON.stringify(pages))
}
