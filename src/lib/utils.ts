import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function disableTransitionsTemporarily() {
	document.documentElement.classList.add('[&_*]:!transition-none')
	window.setTimeout(() => {
		document.documentElement.classList.remove('[&_*]:!transition-none')
	}, 0)
}
