import "./App.css";
import React from "react";
import Superadmin from "./Superadmin";
import Restoadmin from "./pages/signup/Restoadmin";
import Restoinfo from "./Restoinfo";
import Signup from "./pages/signup/Signup";
import Navbar from "./Navbar";
import { Router, Routes } from "react-router-dom";

import { Route, Switch, BrowserRouter} from "react-router-dom";
function App() {
  return (
<BrowserRouter>
   <Navbar/>
   
   <Routes>

    
       
    <Route path="/" element={<Superadmin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/restoadmin" element={<Restoadmin/>}/>
   </Routes>
   </BrowserRouter>
   
  );
}

export default App;
