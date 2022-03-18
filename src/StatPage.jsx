/* import styled from "styled-components" */
import  {useStatQuery, useGetAll} from "./tools/datoCmsTools"
import { CSVLink as CSVLink_ } from "react-csv"
import {Button as MuiButton} from "@mui/material"
import { styled } from '@mui/system'

const StatPage = () => {
	//const [onsite, online, all] = useStatQuery("onsite")
	const onsite = null
	const online = null
	const all = null
	
		
	const stages = useGetAll("stage")
	const registrations = useGetAll("registration")
	
	const registrationsForExport = registrations?.map(registration => {
		const {id, name, email, phone, workplace, onsite, stage, vipCode, registrationFeedback, translation, createdAt} = registration
		return {id, name, email, phone, workplace, onsite, stage, vipCode, registrationFeedback, translation, createdAt}
	})

	const numberOfRegistrationFeedback = registrationsForExport.filter((registration) => registration.registrationFeedback ).length
	const numberOfTranslation = registrationsForExport.filter((registration) => (registration.translation)  ).length
	const numberOfCancellation = registrationsForExport.filter((registration) => (registration.registrationFeedback) &&  (!registration.onsite)).length

	const headers = [
		{ label: "id", key: "id" },
		{ label: "name", key: "name" },
		{ label: "email", key: "email" },
		{ label: "phone", key: "phone" },
		{ label: "workplace", key: "workplace" },
		{ label: "onsite", key: "onsite" },
		{ label: "stage", key: "stage" },
		{ label: "vipCode", key: "vipCode" },
		{ label: "registrationFeedback", key: "registrationFeedback" },
		{ label: "translation", key: "translation" },
		{ label: "createdAt", key: "createdAt" },
	  ]
	console.log("registrationsForExport", registrationsForExport)
	const breakoutSessions = (stages.map(stage => {
		const regs = registrations?.filter((reg) => reg.stage===`${stage.id}`)
		return {name: stage.name, numberOfRegistration: regs.length}
	}))
	
	const onsiteBreakoutSessions = breakoutSessions.filter(bs => bs.numberOfRegistration>0)

	const csvReport = {
		data: registrationsForExport,
		headers: headers,
		filename: 'iok2022_jelentkezesek.csv'
	  };
	
	return (
		<>
			<div>Összes regisztráció: {all?._allRegistrationsMeta.count || registrations.length}</div>
			<div>Regisztráció online részvételre: {online?._allRegistrationsMeta.count}</div>
			<div>Regisztráció helyszíni részvételre: {onsite?._allRegistrationsMeta.count}</div>
			<div>&nbsp;</div>
			{onsiteBreakoutSessions?.map((breakoutSession) => <div>{breakoutSession.name}: {breakoutSession.numberOfRegistration} </div> )}
			<div>&nbsp;</div>
			<div>Helyszíni résztvevő visszajelzés: {numberOfRegistrationFeedback}</div>
			<div>Ebből ennyi a lemondás: {numberOfCancellation}</div>
			<div>Tolmácsolást kér: {numberOfTranslation}</div>
			<CSVLink {...csvReport} separator=";" style={{textDecoration:"none"}}><Button variant="contained">Exportálás CSV fájlba</Button></CSVLink>
		</>
	)
}

const Button = styled(MuiButton)(
	{
		width: "250px",
		textDecoration: "none"
	}
)
	
const CSVLink = styled(CSVLink_)(
	{
		marginTop: "10px",
		width: "250px",
		textDecoration: "none"
	}
)


export default StatPage