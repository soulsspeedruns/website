import { makeHandler } from '@keystatic/astro/api'
import config from 'keystatic.config'

export const all = makeHandler({ config })
export const ALL = all

export const prerender = false
