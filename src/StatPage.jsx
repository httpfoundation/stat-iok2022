import styled from "styled-components"
import  {useStatQuery, useGetAll} from "./tools/datoCmsTools"
import {useState} from 'react'

const StatPage = () => {
	const [onsite, online, all] = useStatQuery("onsite")
		
	const stages = useGetAll("stage")
	const registrations = useGetAll("registration")
	const breakoutSessions = (stages.map(stage => {
		const regs = registrations?.filter((reg) => reg.stage===`${stage.id}`)
		return {name: stage.name, numberOfRegistration: regs.length}
	}))
	const onsiteBreakoutSessions = breakoutSessions.filter(bs => bs.numberOfRegistration>0)
	
/* 	console.log("data", registrations)
	const stage1 = registrations?.filter((reg) => reg.stage==="107304832") 
	console.log("stage1", stage1.length)
 */
	
	return (
		<Container>
			<h1>IOK 2022 jelentkezési statisztika</h1>
			<div>Összes regisztráció: {all?._allRegistrationsMeta.count}</div>
			<div>Regisztráció online részvételre: {online?._allRegistrationsMeta.count}</div>
			<div>Regisztráció helyszíni részvételre: {onsite?._allRegistrationsMeta.count}</div>
			<div>&nbsp;</div>
			{onsiteBreakoutSessions?.map((breakoutSession) => <div>{breakoutSession.name}: {breakoutSession.numberOfRegistration} </div> )}
		</Container>
	)
}

const Container = styled.div`
    display: grid;
	grid-template-columns: auto;
    justify-content:center;
    align-items: center;
    color: white;
    background-color: #47CCD4;
	padding: 50px;
    margin-top: -90px
`

export default StatPage