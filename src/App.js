import './App.css';
import Dashboard from './screen/Dashboard.jsx';
import { Routes, Route, Link } from 'react-router-dom';



const Home = () => {
	return (
		<div className='flex justify-center h-screen align-middle bg-emerald-500'>
			<h1>
				HOMEE
			</h1>
		</div>
	)
}

export default function App() {
	return (
		<div>
			{/* <nav>
				<ul className='flex flex-row justify-evenly w-1/3'>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/dashboard'>Dashboard</Link></li>
				</ul>
			</nav> */}

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />

				{/* <Dashboard /> */}

			</Routes>

		</div>



	);
}
