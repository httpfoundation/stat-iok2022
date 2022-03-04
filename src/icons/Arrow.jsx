const Arrow = (props) => {
	return (<svg style={{
		transition: 'transform 0.3s ease-in-out',
		transform: 'translateY(-2px) rotate(' + (props.rotation  || 0) + 'deg)'
	}} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M7.00023 5.172L11.9502 0.222L13.3642 1.636L7.00023 8L0.63623 1.636L2.05023 0.222L7.00023 5.172Z"/>
	</svg>)
}

export default Arrow