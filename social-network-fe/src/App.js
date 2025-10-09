import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LayoutDefault from './layouts/layoutDefault';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutDefault />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
