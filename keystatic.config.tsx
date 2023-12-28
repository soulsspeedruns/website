import { config } from '@keystatic/core'
import { games } from '@/collections/games'
import { pages } from '@/collections/pages'
import { navigation } from '@/singletons/navigation'

export default config({
	storage:
		process.env.NODE_ENV !== 'development'
			? {
					kind: 'local',
				}
			: {
					kind: 'github',
					repo: 'soulsspeedruns/website',
					branchPrefix: 'wiki/',
				},
	ui: {
		brand: {
			name: 'SoulsSpeedruns',
			mark: () => {
				return (
					<img
						src="/logo.png"
						height={24}
					/>
				)
			},
		},
	},
	collections: {
		pages,
		games,
	},
	singletons: {
		navigation,
	},
})
