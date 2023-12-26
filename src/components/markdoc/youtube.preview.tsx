import getYouTubeId from 'get-youtube-id'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export type Props = {
	src: string
}

export function YouTube({ src }: Props) {
	const id = getYouTubeId(src) ?? src

	return (
		<LiteYouTubeEmbed
			id={id}
			title="Youtube Video"
		/>
	)
}
