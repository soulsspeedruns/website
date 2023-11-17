import {
	Fragment,
	Suspense,
	useDeferredValue,
	useEffect,
	type ComponentPropsWithRef,
	useRef,
	useState,
} from 'react'
import { usePagefind } from '@/composables/use-pagefind'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { FileIcon } from 'lucide-react'
import type { Result } from '@/lib/pagefind'
import { useStore } from '@nanostores/react'
import { isOpen } from '@/stores/search'

interface Props extends ComponentPropsWithRef<'div'> {}

export function SearchUi(props: Props) {
	/**
	 * Controlled value here kinda sucks, I get some
	 * suspense errors. I supect the hydration is causing
	 * issues because I can type in the input before
	 * it hydrates or something.
	 *
	 * Todo fix
	 */
	const [query, setQuery] = useState('')
	const { data, search } = usePagefind()
	const deferred = useDeferredValue(data)
	const isSearchOpen = useStore(isOpen)

	useEffect(() => {
		search(query)
	}, [query])

	useEffect(() => {
		setQuery('')
	}, [isSearchOpen])

	return (
		<div {...props}>
			<Command
				shouldFilter={false}
				className="border shadow"
			>
				<CommandInput
					placeholder="Type a command or search..."
					value={query}
					onValueChange={setQuery}
				/>
				<Suspense fallback={null}>
					<SearchResults results={deferred} />
				</Suspense>
			</Command>
		</div>
	)
}

function SearchResults({ results }: { results: Result[] }) {
	if (!results.length) {
		return null
	}

	return (
		<CommandList>
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup heading="Suggestions">
				{results.map((result) => (
					<Fragment key={result.id}>
						<CommandItem
							value={result.id}
							className="h-14 cursor-pointer overflow-hidden truncate"
							onSelect={() => {
								window.location.href = result.data.raw_url
							}}
						>
							<div className="flex items-center gap-2">
								<FileIcon className="h-5 w-5" />
								<span
									className="whitespace-nowrap [&_mark]:bg-transparent [&_mark]:text-current [&_mark]:underline [&_mark]:underline-offset-2"
									dangerouslySetInnerHTML={{ __html: result.data.excerpt }}
								/>
							</div>
						</CommandItem>
					</Fragment>
				))}
			</CommandGroup>
		</CommandList>
	)
}
