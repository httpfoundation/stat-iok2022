import React from 'react'
import './App.scss'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'
import {
	BrowserRouter as Router,
	Routes,
	Route,

  } from "react-router-dom"

import StatPage from './StatPage'



export const AppContext = React.createContext<undefined | {apiKey: string}>(undefined)

function App() {

	return (
		<AppContext.Provider 
			value={{apiKey: "20bfbb74097b060d8cfbfd74a60413"}}
		>
{/* 			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/stat_" element={<StatPage />} />
				</Routes>
			</Router> */}
			<StatPage />
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



