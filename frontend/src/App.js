import { AllRoutes } from './AllRoutes/AllRoutes';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Details } from './components/products/Details';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <AllRoutes />
      {/* <Details/> */}
    </div>
  );
}

export default App;
