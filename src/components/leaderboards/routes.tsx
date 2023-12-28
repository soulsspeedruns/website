import { queryClient } from '@/components/leaderboards/app'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { $fetch } from '@/lib/speedrundotcom'
import { type CollectionEntry } from 'astro:content'
import {
	Link,
	Outlet,
	useRouteError,
	redirect,
	type RouteObject,
	ScrollRestoration,
} from 'react-router-dom'
import { makeLoader, useLoaderData } from 'react-router-typesafe'
import { string, safeParse } from 'valibot'

type RouterContext = {
	game: CollectionEntry<'games'>
}

export const createRoutes = ({ game }: RouterContext): RouteObject[] => {
	const homeLoader = makeLoader(async () => {
		const { categories } = await queryClient.fetchQuery({
			queryKey: ['categories', game.id],
			queryFn: async () => {
				const { data: categories } = await $fetch(
					`/games/${game.id}/categories`,
					['game'],
				)

				return {
					categories,
				}
			},
			staleTime: Number.MAX_SAFE_INTEGER,
		})

		return {
			categories,
		}
	})

	const noCategoryLoader = makeLoader(async () => {
		const { data: categories } = await $fetch(`/games/${game.id}/categories`)
		const firstCategory = categories[0]

		if (firstCategory) {
			throw redirect(`/${firstCategory.id}`, {
				status: 301,
			})
		}

		return null
	})

	const categoryLoader = makeLoader(async ({ params }) => {
		const result = safeParse(string(), params.category)

		if (!result.success) {
			throw new Response(null, {
				status: 400,
				statusText: result.issues[0].message,
			})
		}

		const { leaderboard } = await queryClient.fetchQuery({
			queryKey: ['leaderboards', game.id, result.output],
			queryFn: async () => {
				const { data: leaderboard } = await $fetch(
					`/leaderboards/${game.id}/category/${result.output}`,
					['game'],
				)

				return {
					leaderboard,
				}
			},
			staleTime: Number.MAX_SAFE_INTEGER,
		})

		return {
			leaderboard,
		}
	})

	const ErrorBoundary = () => {
		const error = useRouteError()
		return <pre>{JSON.stringify(error, null, 2)}</pre>
	}

	return [
		{
			path: '/',
			loader: homeLoader,
			Component: () => {
				const { categories } = useLoaderData<typeof homeLoader>()

				return (
					<div>
						<div className="grid grid-cols-10">
							<aside className="col-span-2">
								<ul className="sticky top-20">
									{categories.map((category) => (
										<li key={category.id}>
											<Link to={`/${category.id}`}>{category.name}</Link>
										</li>
									))}
								</ul>
							</aside>
							<div className="col-span-8">
								<Outlet />
							</div>
						</div>
						<ScrollRestoration />
					</div>
				)
			},
			ErrorBoundary,
			children: [
				{
					path: '',
					loader: noCategoryLoader,
					ErrorBoundary,
					Component: () => {
						return <div>This game has no categories</div>
					},
				},
				{
					path: ':category',
					loader: categoryLoader,
					ErrorBoundary,
					Component: () => {
						const { leaderboard } = useLoaderData<typeof categoryLoader>()

						return (
							<Table className="w-full">
								<TableBody>
									{leaderboard.runs.map((run) => (
										<TableRow key={run.run.id}>
											<TableCell>{run.run.weblink}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)
					},
				},
			],
		},
	]
}
