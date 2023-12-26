import { useEffect, useState } from 'react'
import { Check, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const key = 'keystatic-color-scheme'
const transitionClass = '[&_*]:!transition-none'

function noTransition(fn: () => any) {
	document.documentElement.classList.add(transitionClass)
	fn()
	setTimeout(() => {
		document.documentElement.classList.remove(transitionClass)
	})
}

const themes = ['light', 'dark', 'auto'] as const
type Theme = (typeof themes)[number]

const themeNames: Record<Theme, string> = {
	light: 'Light',
	dark: 'Dark',
	auto: 'System',
}

function isTheme(theme: unknown): theme is Theme {
	return typeof theme === 'string' && themes.includes(theme)
}

function getItem() {
	const theme = localStorage.getItem(key)
	return isTheme(theme) ? theme : null
}

function setItem(theme: Theme) {
	localStorage.setItem(key, theme)
}

export function ModeToggle() {
	const [theme, setThemeState] = useState<Theme>('light')

	function setTheme(theme: Theme) {
		setItem(theme)

		const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
		const isDark = theme === 'dark' || (theme === 'auto' && matchMedia.matches)

		noTransition(() => {
			document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
		})

		setThemeState(theme)
	}

	useEffect(() => {
		const onMediaChange = ({ matches }: MediaQueryListEvent) => {
			if (localStorage.getItem(key) === 'auto') {
				noTransition(() => {
					document.documentElement.classList[matches ? 'add' : 'remove']('dark')
				})
			}
		}

		const onFocus = () => {
			const theme = getItem()
			if (theme) setTheme(theme)
		}

		onFocus()

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', onMediaChange)

		window.addEventListener('focus', onFocus)

		return () => {
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', onMediaChange)

			window.removeEventListener('focus', onFocus)
		}
	}, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="text-black dark:text-orange-300 dark:hover:bg-accent dark:hover:text-orange-400"
				>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{themes.map((_theme) => (
					<DropdownMenuItem
						key={_theme}
						onClick={() => setTheme(_theme)}
						className="cursor-pointer"
					>
						<span className="mr-2 size-4">
							{_theme === theme && <Check className="size-4" />}
						</span>
						<span>{themeNames[_theme]}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
