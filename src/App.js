import "./App.css";
import React from "react";
import Superadmin from "./pages/pages/Superadmin";
import Restoadmin from "./pages/pages/Restoadmin";

import Signin from "./pages/pages/signin";
import Signup from "./pages/pages/signup";
import Inspectors from "./pages/pages/Inspectors";
import Navbar from "./Navbar";
import { Route, Switch, BrowserRouter,Routes,Router} from "react-router-dom";

function App() {
  return (
<BrowserRouter>
   <Navbar/>
   
   <Routes>

    
   <Route path='/' exact element={<Signin/>} />
    <Route path="/dashboard" element={<Superadmin/>}/>
    <Route path='/users/new' exact element={<Signup/>} />
    <Route path="/restaurant" element={<Restoadmin/>}/>
    <Route path="/Inspectors" element={<Inspectors/>}/>
  
   </Routes>
   </BrowserRouter>
   
  );
}

export default App;
