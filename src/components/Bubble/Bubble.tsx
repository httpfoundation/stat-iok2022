/*
	General Bubble component
*/


import './Bubble.scss'

interface BubbleProps {
	title?: string
	subtitle?: string
	corners?: ('bottom-left' | 'bottom-right' | 'top-left' | 'top-right')[]
	size?: 'large' | 'extra-large',
	color?: 'light' | 'primary',
	shadow?: boolean,
	smallText?: boolean,
	darkText?: boolean,
	icon?: boolean
}

const Bubble = (props: BubbleProps) => {
	return <div className={`bubble ${props.corners || ''} ${props.size || ''} ${props.color || ''} ${props.shadow ? 'shadow' : ''} ${props.smallText ? 'small-text' : ''} ${props.darkText ? 'dark-text' : ''} ${props.icon ? 'icon' : ''}`}>
		<div className="content">
			<div className="title">
				{props.title}
			</div>
			<div className="subtitle">
				{props.subtitle}
			</div>
		</div>
	</div>
}

export default Bubble