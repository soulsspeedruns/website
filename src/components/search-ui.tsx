import { useEffect, useRef, useState } from 'react'

export function SearchUi() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<any[]>([])
	const controller = useRef<AbortController>()

	useEffect(() => {
		;(async () => {
			if (!query) {
				setResults([])
				return
			}

			controller?.current?.abort()
			controller.current = new AbortController()

			const resp = await fetch(`/api/search.json?q=${query}`, {
				signal: controller.current.signal,
			})

			const json = await resp.json()
			setResults(json)
		})()
	}, [query])

	return (
		<div>
			<input
				type="text"
				className="w-full rounded-lg border p-1"
				onChange={(e) => setQuery(e.currentTarget.value)}
			/>
			<ul>
				{results.map((result) => (
					<li key={result.id}>
						<a href={`/${result.slug}`}>{result.data.title}</a>
					</li>
				))}
			</ul>
		</div>
	)
}
