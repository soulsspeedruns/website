import { config, type Config } from '@keystatic/core'
import { docs } from '@/collections/docs'
import { games } from '@/collections/games'
import { socials } from '@/collections/socials'
import { sidebar } from '@/singletons/sidebar'

const storage: Config['storage'] = import.meta.env
	? {
			kind: 'local',
	  }
	: {
			kind: 'github',
			repo: {
				owner: 'soulsspeedruns',
				name: 'website',
			},
	  }

export default config({
	storage,
	ui: {
		brand: {
			name: 'Souls Speedruns',
		},
	},
	collections: {
		docs,
		games,
		socials,
	},
	singletons: {
		sidebar,
	},
})
