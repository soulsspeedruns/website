import { Fragment, Suspense, useDeferredValue, useEffect } from 'react'
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

export function SearchUi() {
	const { data, search } = usePagefind()
	const deferred = useDeferredValue(data)

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<div className="fixed top-10 w-full max-w-xl -translate-x-[50%]">
			<Command
				shouldFilter={false}
				className="border shadow"
			>
				<CommandInput
					placeholder="Type a command or search..."
					onValueChange={search}
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
									className="whitespace-nowrap [&_mark]:bg-transparent [&_mark]:underline [&_mark]:underline-offset-2"
									dangerouslySetInnerHTML={{ __html: result.data.excerpt }}
								/>
							</div>
						</CommandItem>
						{/* {result.data.sub_results.map((subResult, i) => {
							let url = result.data.raw_url
							if (subResult.anchor) url = `${url}#${subResult.anchor.id}`
							const key = `${result.id}_${i}`

							return (
								<CommandItem
									key={key}
									value={key}
									className="h-14 cursor-pointer overflow-hidden truncate"
									onSelect={() => {
										window.location.href = url
									}}
								>
									<div className="flex items-center gap-2 ml-2">
										<CornerDownRightIcon className="h-5 w-5" />
										<HashIcon className="h-5 w-5" />
										<div className="flex flex-col">
											<span className="font-medium">{subResult.title}</span>
											<span
												className="whitespace-nowrap text-black/50 [&_mark]:bg-transparent [&_mark]:text-black/50 [&_mark]:underline [&_mark]:underline-offset-2"
												dangerouslySetInnerHTML={{ __html: subResult.excerpt }}
											/>
										</div>
									</div>
								</CommandItem>
							)
						})} */}
					</Fragment>
				))}
			</CommandGroup>
		</CommandList>
	)
}
