


import Login from "./Pages/TransportManager/login/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { productInputs, userInputs } from "./formSource";
//import "./style/dark.scss";
import { useContext } from "react";
import List from "./Pages/TransportManager/list/List.jsx";
import Single from "./Pages/TransportManager/single/Single.jsx";
import New from "./Pages/TransportManager/new/new.jsx";


function App() {
  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/">

                <Route path="/Login" element={<Login/>}/>
                <Route path = "users">
                  <Route index element={<List/>}></Route>
                  <Route path="userId" element={<Single/>}></Route>
                  <Route path="new" element={<New/>}></Route>
                </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
