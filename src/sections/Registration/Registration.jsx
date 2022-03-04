import Button from "../../components/Button/Button"
import Section from "../../components/Section/Section"
import Text from "../../components/Text/Text"
import Title from "../../components/Title/Title"
import './Registration.scss'

import { useState } from "react"
import { StructuredText } from "react-datocms"
import { SiteClient } from "datocms-client"
import { AppContext } from "../../App"
import { useContext } from "react"
import Modal from 'react-bootstrap/Modal'
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import { useStaticElement, useAllElements } from '../../tools/datoCmsTools'


const Registration = (props) => {

	const context = useContext(AppContext)
	const [allStages] = useAllElements("stages")
	const [registrationText] = useStaticElement("registration") 
	const [registrationFormatText] = useStaticElement("registrationFormat") 
	const [registrationSuccessText] = useStaticElement("registrationSuccess") 
	const [registrationFormatCheckboxText] = useStaticElement("registrationFormatCheckbox", false) 	


	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [workplace, setWorkplace] = useState('')
	const [phone, setPhone] = useState('')
	const [city, setCity] = useState('')
	const [newsletter, setNewsletter] = useState(false)
	const [onsite, setOnsite] = useState(false)
	const [stage, setStage] = useState("")

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	const vipCode = (new URLSearchParams(window.location.search)).get('q') || null

	const onSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError(false)
		setSuccess(false)
		const client = new SiteClient(context.apiKey)
		try {
			await client.items.create({
				itemType: '1843571',
				name,
				email,
				workplace,
				phone,
				city,
				newsletter,
				onsite,
				stage: stage || null,
				vipCode: vipCode || null
			})
			setSuccess(true)
			setError(false)
			setEmail('')
			setName('')
			setWorkplace('')
			setPhone('')
			setCity('')
			setNewsletter(false)
			setOnsite(false)
			setStage(null)
			if (vipCode) window.history.replaceState({}, document.title, window.location.pathname + window.location.hash)
		} catch (error) {
			console.log(error)
			if (error.statusCode === 422) {
				if (error.message.includes('VALIDATION_UNIQUE')) {
					if (error.message.includes("email")) setError("email")
					else if (error.message.includes("vip_code")) setError("vip")
					else setError("other")
				} else if (error.message.includes("INVALID_FIELD")) {
					if (error.message.includes("vip_code")) setError("vip")
					else setError("other")
				} else {
					setError("other")
				}
			} else {
				setError("other")
			}
		} finally {
			setLoading(false)
		}

	}

	return <Section id="regisztracio" container placeholder>
		<Title>Biztosítsd már most a <span className="highlight text-uppercase">helyed</span>!</Title>
		<Text subtitle>
			<StructuredText data={registrationText} />	
		</Text>
		<form className="reg-form" onSubmit={onSubmit}>
			<Title subtitle>Add meg az adataidat!</Title>

			<Alert variant="success" show={vipCode && error !== "vip"}>
				VIP regisztrációs kód aktiválva
			</Alert>

			
			<label className="form-label" htmlFor="name-field">Név*</label>
			<input id="name-field" className="form-control" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required/>

			<label className="form-label" htmlFor="email-field">E-mail cím*</label>
			<input id="email-field" className={`form-control ${error === "email" ? 'is-invalid' : ''}`} value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required/>
			<Alert variant="danger" show={error === "email"}>
				Ezzel az e-mail címmel már történt regisztráció.
			</Alert>

			<label className="form-label" htmlFor="phone-field">Telefonszám*</label>
			<input id="phone-field" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" required/>

			<label className="form-label" htmlFor="workplace-field">Munkahely*</label>
			<input id="workplace-field" className="form-control" value={workplace} onChange={e => setWorkplace(e.target.value)} autoComplete="organization" required/>

			<label className="form-label" htmlFor="city-field">Település*</label>
			<input id="city-field" className="form-control" value={city} onChange={e => setCity(e.target.value)} autoComplete="address-level2" required/>

			<label className="form-label">Jelentkezés személyes részvételre</label>
			<div className="" style={{padding: '0.8rem', border: '1px solid #ced4da', borderRadius: '0.25rem'}}>
				<StructuredText data={registrationFormatText} />
				<div className="form-check">
					<input className="form-check-input" type="checkbox" name="online" id="onsite-field" checked={onsite} onChange={e => setOnsite(e.target.checked)}/>
					<label className="form-check-label" htmlFor="onsite-field">
						{registrationFormatCheckboxText}
					</label>
				</div>
				{ onsite && 
					<>
						<label className="form-label  mt-4">Melyik délutáni szekción szeretnél részt venni?*</label>
						<select className="form-select" required={onsite} value={stage} onChange={e => setStage(e.target.value)}>
							<option value={""} hidden></option>
							{ allStages?.slice(1).slice(0,-1).map((stage, index) => <option key={index} value={stage.id}>{stage.name}</option>) }
						</select>
					</>
				}
			</div>
			<div className="form-check mb-4 mt-4">
				<input className="form-check-input" type="checkbox" name="newsletter" id="newsletter-field" checked={newsletter} onChange={e => setNewsletter(e.target.checked)}/>
				<label className="form-check-label" htmlFor="newsletter-field">
					Szeretnék emailben értesülni az InfoTanár Mentor programmal kapcsolatos információkról
				</label>
			</div>
			<div className="form-check mb-4 mt-4">
				<input className="form-check-input" type="checkbox" id="toc-field" required />
				<label className="form-check-label" htmlFor="toc-field">
					Elolvastam és elfogadom az <a href="/adatkezelesi_tajekoztato_IOK2022.pdf" target="_blank" className="link">Adatkezelési Tájékoztató</a>ban foglaltakat.*
				</label>
			</div>			
			<div className="my-4"/>

			<Alert variant="danger" show={error === "other"}>
				Ismeretlen hiba történt a jelentkezés során. Kérlek, próbáld újra később.
			</Alert>
			
			<Alert variant="danger" show={error === "vip"}>
				Érvénytelen VIP regisztrációs kód.
			</Alert>

			<Alert variant="danger" show={error === "email"}>
				A megadott e-mail címmel már történt regisztráció.
			</Alert>

			<Button submit>
				{ loading &&
				<div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)' }}>
					<Spinner
						as="span"
						animation="border"
						role="status"
						aria-hidden="true"
					/>
				</div>
				}
				<span style={{opacity: loading ? 0 : 1}}>Regisztráció</span>
			</Button>
		</form>


		<Modal show={success} onHide={() => {setSuccess(false)}} centered>
			<Modal.Header>
				<Modal.Title>Sikeres jelentkezés!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<StructuredText data={registrationSuccessText} />
			</Modal.Body>
			<Modal.Footer>
			<Button variant="primary" onClick={() => setSuccess(false)}>
				Bezárás
			</Button>
			</Modal.Footer>
		</Modal>
	</Section>
}

export default Registration