/**
 * This whole thing is a work around to fix the following issue:
 * https://github.com/Thinkmill/keystatic/issues/835
 *
 * TODO remove when fixed by keystatic
 */
import type { APIRoute } from 'astro'
import { createRegExp, word, char, oneOrMore } from 'magic-regexp'
import { all } from '@/pages/api/keystatic/[...params]'
import keystaticConfig from 'keystatic.config'

const regex = createRegExp(
	'branch/',
	word.as('branch'),
	'/collection/',
	word.as('collection'),
	'/item/',
	oneOrMore(char).as('slug'),
)

export const prerender = false

export const GET: APIRoute = (params) => {
	if (keystaticConfig.storage.kind !== 'github') {
		return all(params)
	}

	const url = new URL(params.request.url)
	const from = url.searchParams.get('from')

	if (!from) {
		return all(params)
	}

	const matches = regex.exec(from)

	if (!matches || !matches.groups) {
		return all(params)
	}

	const { branch, collection, slug } = matches.groups
	const fixed = `branch/${branch}/collection/${collection}/item/${encodeURIComponent(
		slug,
	)}`

	url.searchParams.set('from', fixed)

	return all({
		...params,
		request: new Request(url, params.request),
	})
}
