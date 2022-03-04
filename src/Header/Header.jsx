import './Header.scss'
import BrandImg from '../assets/img/http-logo.png' 
import Button from '../components/Button/Button'
import Ticket from '../icons/Ticket'
import useScrollPosition from '@react-hook/window-scroll'
import { useState } from 'react'
import Fade from 'react-reveal/Fade'


const HamburgerMenu = (props) => {


	const items = [
		{ name: 'Információk', href: '/#' },
		{ name: 'Előadóink', href: '/#eloadok' },
		{ name: 'Program', href: '/#program' },
		{ name: 'Helyszín', href: '/#helyszin' },
		{ name: 'Támogatók', href: '/#tamogatok' },
	]

	return (
		<>
		<div className={`backdrop ${props.open ? 'open' : ''}`} onClick={props.onClose}></div>
		<div className={`hamburger-menu ${props.open ? 'open' : ''}`}>
			<div className="hamburger-toggle close" onClick={props.onClose}>
				<div className="bar"></div>
				<div className="bar"></div>
				<div className="bar"></div>
			</div>
			<div className='hamburger-menu-items'>
				{ items.map((item, key) => <a key={key} href={item.href} onClick={props.onClose}>{item.name}</a>)}
			</div>
			<Button href="#regisztracio" onClick={props.onClose}><Ticket />Regisztráció</Button>
		</div>
		</>
	)
}

const Header = () => {

	const scrollY = useScrollPosition(30 /*fps*/)
	const limit = 100


	const [menuOpen, setMenuOpen] = useState(false)

	return <header className={`${scrollY < limit ? 'transparent' : ''}`}>
		<div className="container">
			<Fade top delay={900}>
				<img src={BrandImg} alt="HTTP Alapítvány" className="brand-image" />
				<h1>IOK 2022</h1>
				<Button href="#regisztracio"><Ticket />Regisztráció</Button>
				<div className="hamburger-toggle" onClick={() => setMenuOpen(true)}>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
				</div>
			</Fade>
		</div>
		<HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
	</header>
}

export default Header