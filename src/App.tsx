import React from 'react'
import './App.scss'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,

  } from "react-router-dom"
import {Button, Container} from "@mui/material"

import StatPage from './StatPage'
import { Box, styled } from '@mui/system'
import VisitorCount from './VisitorCount'

/*
const Container = styled('div')`
    display: grid;
	grid-template-columns: auto;
    justify-content:center;
    align-items: center;
    color: white;
    background-color: #47CCD4;
	padding: 50px;
	a {text-decoration: "none"}	
`
*/

export const AppContext = React.createContext<undefined | {apiKey: string}>(undefined)

function App() {

	return (
		<AppContext.Provider 
			value={{apiKey: "3331fc3477e7df4b7cb85836c2a684"}}
		>
			<Box sx={{backgroundColor: '#47CCD4', py: 6, color: '#fff'}}>
				<Router>
					<Container sx={{}}>
						<h1>IOK 2022</h1>
						<Box sx={{mb: 4}}>
							<Link to="/"><Button variant="contained" color="primary">Jelentkezések</Button></Link>
							<Link to="/jelenlet"><Button variant="contained" color="primary" sx={{ml: 2}}>Jelenlét</Button></Link>
						</Box>
						<Routes>
							<Route path="/" element={<StatPage />} />
							<Route path="/jelenlet" element={<VisitorCount />} />
						</Routes>
					</Container>
				</Router>
			</Box>
		</AppContext.Provider>
	)
}

export default App

const LandingPage = () => (
	<>
			<Header />
			<Main />
			<Footer />
	</>
)



