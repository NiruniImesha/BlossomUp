//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";
import Identification from "./Pages/Image_Identification/home/Identification"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Identification />} />
        {/* <Route path="/Identification-Result" element={<Identification />}></Route> */}
        
      </Routes>

    </BrowserRouter>
  )

}

export default App;