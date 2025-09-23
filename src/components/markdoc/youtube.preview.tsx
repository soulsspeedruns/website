export type Props = {
	src: string
}

export function YouTube({ src }: Props) {
	return (
		<iframe
			width="560"
			height="315"
			src={src}
			title="YouTube video player"
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerPolicy="strict-origin-when-cross-origin"
			allowFullScreen
		></iframe>
	)
}
