import './Text.scss'

const Text = (props) => {
	const center = (props?.center) ? " center" : ""
	const subtitle = (props?.subtitle) ? " subtitle" : ""
	const description = (props?.description) ? " description" : ""
	return <div className={`text${center}${subtitle}${description}`}>{props.children}</div>
}

export default Text