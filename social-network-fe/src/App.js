import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LayoutDefault from './layouts/layoutDefault';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import OtpPassword from './pages/OtpPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutDefault />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/forget-password/otp/:email' element={<OtpPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
