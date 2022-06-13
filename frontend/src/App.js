import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Main from './pages/Main';
import Register from './pages/Register';
import Login from './pages/Login';
import Coffees from './pages/Coffees';
import OneCoffeeRating from './pages/OneCoffeeRating';
import NewProduct from './pages/NewProduct';
import UserProfile from './pages/UserProfile';
import About from './pages/About';

import './scss/App.scss';

export default function App() {
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
        <Route path="/createnewproduct" element={<NewProduct />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
