import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { Products } from './components/Products';


function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <ProductCard/> */}
      <Products/>
    </div>
  );
}

export default App;
