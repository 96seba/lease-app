import Navbar from "./components/Navbar.jsx";
import Login from "./screen/Login.jsx";
import Dashboard from "./screen/Dashboard.jsx";
import Register from "./screen/Register.jsx";




function App() {
    return (
        <div className="bg-white h-screen items-center">
            <div className="">
                <header class="">
                    <Navbar />
                </header>
            </div>
            <div className=" bg-white h-5/6">
                    <Register />
                </div>
        </div>
        )
}
            export default App;
