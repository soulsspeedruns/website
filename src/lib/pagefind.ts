interface Pagefind {
	search: (query: string) => Promise<PagefindResponse>
	options: (options: PagefindOptions) => Promise<void>
	init: () => void
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
	sub_results: PagefindSubresult[]
}

interface PagefindSubresult {
	anchor?: {
		id: string
	}
	title: string
	url: string
	excerpt: string
}

interface PagefindOptions {
	baseUrl?: string
	bundlePath?: string
	excerptLength?: number
	highlightParam?: string
}

const PATH = import.meta.env.DEV
	? '../../.vercel/output/static/pagefind/pagefind.js'
	: '/pagefind/pagefind.js'

let pagefind: Pagefind | null = null

export type Result = {
	id: string
	data: PagefindDocument
}

export async function search(value: string) {
	if (value.length === 0) {
		return [] as Result[]
	}

	if (pagefind === null) {
		pagefind = (await import(/* @vite-ignore */ PATH)) as Pagefind

		await pagefind.options({
			excerptLength: 20,
		})

		pagefind.init()
		console.log(pagefind)
	}

	const { results } = await pagefind.search(value)

	return await Promise.all(
		results.slice(0, 10).map(async (result) => ({
			id: result.id,
			data: await result.data(),
		})),
	)
}
