import Navbar from "./components/Navbar.jsx";
import Login from "./screen/Login";
import Dashboard from "./screen/Dashboard.jsx";
import Register from "./screen/Register.jsx";
import { Routes, Route } from 'react-router-dom'


function App() {
	return (
		<div className="bg-white h-screen overflow-hidden">
			<div className="h-screen">
				<header class="">
					<Navbar />
				</header>
				<body className="w-screen 
					h-5/6 align-middle justify-center">
					{/* <Dashboard /> */}

					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/usuarios" element={<Register />} />
					</Routes>
				</body>
			</div>
		</div >
	)
}
export default App;
