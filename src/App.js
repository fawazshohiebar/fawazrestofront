import "./App.css";
import React from "react";
import Superadmin from "./pages/pages/Superadmin";
import Restoadmin from "./pages/pages/Restoadmin";
import Restoinfo from "./Restoinfo";

import Navbar from "./Navbar";
import { Router, Routes } from "react-router-dom";

import { Route, Switch, BrowserRouter} from "react-router-dom";
function App() {
  return (
<BrowserRouter>
   <Navbar/>
   
   <Routes>

    
       
    <Route path="/" element={<Superadmin/>}/>
    
    <Route path="/restoadmin" element={<Restoadmin/>}/>
   </Routes>
   </BrowserRouter>
   
  );
}

export default App;
