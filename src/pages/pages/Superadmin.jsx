
import React from "react"
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import Restoinfo from "../../Restoinfo";
import Restoadmin from "./Restoadmin";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "../../Navbar";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";






function Superadmin() {


    const [restoinfo, setrestoinfo] = useState();
    const navigate = useNavigate();


    const hala = () => {

    };

    const dol = `http://localhost:3000/allrestaurants`
    const restaurantgetter = async () => {
        const { data } = await axios.get(dol);
        setrestoinfo(data)


    }

    const submituseradmin = async () => {
        const data = { username: Email, password: password, role: adminrole };
        await axios.post(`http://localhost:3000/users/post`, data)
            .then(res => {
                console.log("Successful post: ", res.data);

                const lolo = { user_id: res.data, restaurant_name: "default restaurantname", is_disabled: false }
                axios.post(`http://localhost:3000/restaurant/post`, lolo)
                    .then(res => {
                        console.log("Successful post for the restaurant : ");
                    }).catch(err => {
                        console.error("post resto  failed: ", err);
                    })






            })
            .catch(err => {
                console.error("Update failed: ", err);
            });
    };

    const submitsuperadmin = async () => {
        const data = { username: Email, password: password, role: superadminrole };
        await axios.post(`http://localhost:3000/users/post`, data)
            .then(res => {
                console.log("Successful post: ", res.data);
            })
            .catch(err => {
                console.error("Update failed: ", err);
            });
    };




    useEffect(() => {
        restaurantgetter()

    }, [restoinfo])
    useEffect(() => {


    }, [])
    const [adminrole, setadminrole] = useState("admin");
    const [superadminrole, setsuperadminrole] = useState("superadmin")

    const [password, setpassword] = useState("");
    const hadlepassword = (event) => {
        setpassword(event.target.value);
    };
    const [Email, setEmail] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
        console.log(event.target.value)
    };
    const handleChangesuper = (event) => {
        setEmail(event.target.value);
        console.log(event.target.value)
    }
    const handlepasssuper = (event) => {
        setpassword(event.target.value);

    }

    const openform = () => {
        document.getElementById("myForm").style.display = "block";

    }
    const opensuper = () => {
        document.getElementById("superformm").style.display = "block";
    }
    const closesuper = () => {
        document.getElementById("superformm").style.display = "none";
    }
    const closeForm = () => {
        document.getElementById("myForm").style.display = "none";
    }

    return <div className="App">
        <div className="super-border">


            < h1 className="superadmin-title" > SuperAdmin page</h1>
            <div className="super-admin-body">
                <h1>Add:</h1>




                <button className="first" onClick={openform}> New user</button>

                <div className="form-popup left" id="myForm">

                    <h1>ADD NEW USER </h1>
                    <label className="textform" htmlFor="email">Email</label><br />
                    <input type="text" value={Email} onChange={handleChangesuper} />
                    <br />
                    <label className="textform" htmlFor="password">password</label><br />
                    <input type="text" value={password} onChange={handlepasssuper} /><br /><br />
                    <button className="btn " onClick={submituseradmin}>submit</button><br /><br />
                    <button onClick={closeForm} className="btn cancel">close me </button>

                </div>









                <button className="first" onClick={opensuper}> New Super Admin</button>

                <div className="form-popup right" id="superformm">

                    <h1>ADD New SuperAdmin </h1>
                    <label className="textform" htmlFor="email">Email</label><br />
                    <input type="text" value={Email} onChange={handleChange} /><br />
                    <label className="textform" htmlFor="password">password</label><br />
                    <input type="text" value={password} onChange={hadlepassword} /><br />
                    <button className="btn" onClick={submitsuperadmin}>submit</button><br /><br />
                    <button onClick={closesuper} className="btn cancel">close me </button>

                </div>


            </div>

            <div className="super-admin-restaurants">
                <div className="super-borders"><h2>Restaurants</h2></div>
                <div className="the-restaurants-list">
                    <div className="nameofroles">
                        <h1>adminpages</h1>
                        <h1>inspectorspage</h1>
                    </div>
                    {restoinfo?.map((hourframe, index) => (
                        <Restoinfo restoname={restoinfo[index].restaurant_name} the_id={restoinfo[index]._id} is_disabled={restoinfo[index].is_disabled} />
                    ))}
                </div>

            </div>

        </div>















    </div >;
}

export default Superadmin;
