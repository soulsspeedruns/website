interface Pagefind {
	search: (query: string) => Promise<PagefindResponse>
}

interface PagefindResponse {
	results: PagefindResult[]
}

interface PagefindResult {
	id: string
	data: () => Promise<PagefindDocument>
}

interface PagefindDocument {
	url: string
	raw_url: string
	excerpt: string
	filters: {
		author: string
	}
	meta: {
		title: string
		image: string
	}
	content: string
	word_count: number
}

const PATH = import.meta.env.DEV
	? '../../dist/pagefind/pagefind.js'
	: '/pagefind/pagefind.js'

let pagefind: Pagefind | null

export async function search(value: string) {
	if (value.length === 0) {
		return []
	}

	if (pagefind === null) {
		pagefind = (await import(/* @vite-ignore */ PATH)) as Pagefind
	}

	const { results } = await pagefind.search(value)

	return await Promise.all(
		results.map(async (result) => ({
			id: result.id,
			data: await result.data(),
		})),
	)
}
