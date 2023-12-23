import { search, type Result } from '@/lib/pagefind'
import { useState } from 'react'

export function usePagefind() {
	const [data, setData] = useState<Result[]>([])

	async function _search(input: string) {
		const data = await search(input)
		setData(data)
	}

	return {
		data,
		search: _search,
	}
}
