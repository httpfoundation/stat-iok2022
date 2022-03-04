import './Section.scss'

const Section = (props) => {
	return <section id={props.id} className={`section ${props.placeholder && 'section-placeholder'}`}>
		<div className={`${props.container && 'container'}`}>
			{props.name && <h2>{props.name}</h2>}
			{props.children}
		</div>
	</section>
}

export default Section