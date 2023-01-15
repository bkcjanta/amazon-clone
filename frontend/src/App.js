import { AllRoutes } from './AllRoutes/AllRoutes';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Details } from './components/products/Details';
import { Login } from './components/login/Login';



function App() {
  return (
    <div className="App">
      {/* <Navbar/>
      <AllRoutes /> */}
      {/* <Details/> */}
      <Login></Login>
    </div>
  );
}

export default App;
