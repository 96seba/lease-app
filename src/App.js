import Navbar from "./components/Navbar.jsx";
import Login from "./screen/Login";
import Dashboard from "./screen/Dashboard.jsx";
import Propiedades from "./screen/Propiedades.jsx";
import Propiedad from "./screen/Propiedad.jsx"
import AgregarPropiedad from "./screen/AgregarPropiedad.jsx";
import Register from "./screen/Register.jsx";
import Boletas from "./screen/Boletas.jsx";
import { Routes, Route } from 'react-router-dom'


function App() {
	return (
		<div className="bg-white overflow-y-hidden">
			<div className="">
				<header className="w-screen">
					<Navbar />
				</header>


				<div className="flex w-screen
				 justify-center items-center">


					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/propiedades" element={<Propiedades />} />
						<Route path="/propiedades/propiedad" element={<Propiedad />} />
						<Route path="/propiedades/agregarPropiedad" element={<AgregarPropiedad />} />
                        <Route path="/usuarios" element={<Register />} />
						<Route path="/boletas" element={<Boletas />} />

					</Routes>
				</div>
			</div>
		</div >
	)
}
export default App;
