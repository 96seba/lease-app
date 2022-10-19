import Navbar from "./components/Navbar.jsx";
import Login from "./screen/Login";
import Dashboard from "./screen/Dashboard.jsx";
import Propiedades from "./screen/Propiedades.jsx";
import { Routes, Route } from 'react-router-dom'


function App() {
	return (
		<div className="bg-white h-screen overflow-x-hidden">
			<div className="h-screen">
				<header class="w-screen">
					<Navbar />
				</header>


				<div className="flex w-screen
					h-[91.5vh] justify-center items-center">



					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/propiedades" element={<Propiedades />} />
					</Routes>
				</div>
			</div>
		</div >
	)
}
export default App;
