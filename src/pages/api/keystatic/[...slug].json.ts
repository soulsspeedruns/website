import { makeHandler } from '@keystatic/astro/api'
import config from '../../../../keystatic.config'

const handler = makeHandler({ config })

export const prerender = false
// export const ALL = handler

export async function GET() {
	return new Response('{ hello: 45 }', {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
