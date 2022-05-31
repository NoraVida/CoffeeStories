import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Main from './pages/Main';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Footer from './components/Footer';
import Coffees from './pages/Coffees';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coffees" element={<Coffees />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
