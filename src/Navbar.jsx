import React from "react";
import { Link, useHref, Router } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Superadmin from "./Superadmin";
import { Route, Routes } from "react-router-dom";
function Navbar() {

    return (

        <nav>
            <Link to="/">Superadmin</Link>
            <br />
            <Link to="/signup">signup</Link>
            <br />

        </nav>
    );
}

export default Navbar;
