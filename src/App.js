import React from 'react'
import { Container } from 'react-bootstrap'
import MainPage from './pages/MainPage'
import NewKeyboard from './components/keyboard/keyboard'

function App() {

	return (
		<>
			<Container className="text-center main">
				<NewKeyboard />
			</Container>
		</>
	)
}

export default App
