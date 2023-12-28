import type { CollectionEntry } from 'astro:content'
import { createRoutes } from '@/components/leaderboards/routes'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
	type createStaticHandler,
	type StaticHandlerContext,
	createStaticRouter,
	StaticRouterProvider,
} from 'react-router-dom/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()

type Props = {
	dataRoutes: ReturnType<typeof createStaticHandler>['dataRoutes']
	context: StaticHandlerContext
	basename?: string
	game: CollectionEntry<'games'>
}

export let InnerApp = ({ game, basename }: Props) => {
	const routes = createRoutes({ game })

	const router = createBrowserRouter(routes, {
		basename,
	})

	return (
		<RouterProvider
			fallbackElement={null}
			router={router}
		/>
	)
}

if (import.meta.env.SSR) {
	InnerApp = ({ dataRoutes, context, basename }: Props) => {
		let router = createStaticRouter(dataRoutes, {
			...context,
			basename,
		})

		return (
			<StaticRouterProvider
				router={router}
				context={context}
				nonce="the-nonce"
			/>
		)
	}
}

export function App(props: Props) {
	return (
		<QueryClientProvider client={queryClient}>
			<InnerApp {...props} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
