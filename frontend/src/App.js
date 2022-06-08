import { Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import Main from './pages/Main';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Footer from './components/Footer';
import Coffees from './pages/Coffees';
import OneCoffeeRating from './pages/OneCoffeeRating';
import CreateNewProduct from './pages/CreateNewProduct';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coffees" element={<Coffees />} />
        <Route path="/coffees/:productId" element={<OneCoffeeRating />} />
        <Route path="/createnewproduct" element={<CreateNewProduct />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
