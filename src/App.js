import "./App.css";
import React from "react";
import Superadmin from "./pages/pages/Superadmin";
import Restoadmin from "./pages/pages/Restoadmin";
import Restoinfo from "./Restoinfo";
import Inspectors from "./pages/pages/Inspectors";
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
    <Route path="/Inspectors" element={<Inspectors/>}/>
  
   </Routes>
   </BrowserRouter>
   
  );
}

export default App;
