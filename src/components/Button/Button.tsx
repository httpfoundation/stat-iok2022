/*
	General Button component
*/

import { MouseEventHandler } from 'react'
import './Button.scss'

interface ButtonProps {
	children?: React.ReactNode,
	glow?: boolean,
	href?: string,
	onClick?: MouseEventHandler<HTMLAnchorElement|HTMLButtonElement>,
	secondary?: boolean,
	bold?: boolean,
	submit?: boolean,
}


const Button = (props: ButtonProps) => {
	const className = `button ${props.glow ? 'glow' : ''} ${props.secondary ? 'secondary' : ''} ${props.bold ? 'bold' : ''}`
	if (!props.href) return <button type={props.submit ? 'submit' : 'button'} className={className} onClick={props.onClick ? props.onClick : () => {}} >{props.children}</button>
	return <a href={props.href || "#"} className={className} onClick={props.onClick ? props.onClick : () => {}} >{props.children}</a>
}

export default Button