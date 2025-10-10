import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LayoutDefault from './layouts/layoutDefault';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutDefault />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
