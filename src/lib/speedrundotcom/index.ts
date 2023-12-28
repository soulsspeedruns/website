const BASE = 'https://www.speedrun.com/api/v1'

type Game = {
	id: string
	names: {
		international: string
	}
}

type Category = {
	id: string
	name: string
	game: string
}

type Leaderboard = {
	id: string
	game: string
	category: string
	runs: {
		place: number
		run: {
			weblink: string
			id: string
		}
	}[]
}

type Endpoints = {
	[x: `/games/${string}/categories`]: {
		returnType: Category[]
		embed: {
			game: Game
		}
	}
	[x: `/leaderboards/${string}/category/${string}`]: {
		returnType: Leaderboard
		embed: {
			game: Game
			category: Category
		}
	}
}

type ReturnTypeWithEmbed<
	Key extends keyof Endpoints,
	Embed extends keyof Endpoints[Key]['embed'] | undefined = undefined,
> = Embed extends keyof Endpoints[Key]['embed']
	? Endpoints[Key]['returnType'] extends any[]
		? (Omit<Endpoints[Key]['returnType'][number], Embed> & {
				[key in Embed]: Endpoints[Key]['embed'][Embed]
			})[]
		: Omit<Endpoints[Key]['returnType'], Embed> & {
				[key in Embed]: Endpoints[Key]['embed'][Embed]
			}
	: Endpoints[Key]['returnType']

export async function $fetch<
	Key extends keyof Endpoints,
	Embed extends keyof Endpoints[Key]['embed'],
	TArray extends Embed[] | undefined = undefined,
>(path: Key, embed?: TArray) {
	const url = new URL(`${BASE}${path}`)

	if (embed?.length) {
		url.searchParams.set('embed', embed.join(','))
	}

	const resp = await fetch(url)

	if (!resp.ok) {
		throw new Response(null, {
			status: resp.status,
			statusText: resp.statusText,
		})
	}

	const data = await resp.json()

	return data as {
		data: ReturnTypeWithEmbed<
			Key,
			TArray extends Embed[] ? TArray[number] : undefined
		>
	}
}
