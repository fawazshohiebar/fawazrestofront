import React from "react";
import "./signin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  









  const role = "admin";
  async function createUser(event) {
    event.preventDefault();
    const x = await fetch("http://localhost:3000/users/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    });

    const response = await x.json();
    console.log(response)
    const createResto = await fetch("http://localhost:3000/restaurants/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id:response._id,
        restaurant_name:"default name",
        is_disabled: false
      }),
     
    });
    const created = await createResto.json();
    console.log(created)
    localStorage.setItem("id", response._id);
    localStorage.setItem("role", response.role);
    if(!created){
      navigate("/users/new", { replace: true });
    }else if (created){

    

        axios.get(`http://localhost:3000/restaurants/restaurantid?user_id=${response._id}`)
      
            .then(res => {
      
               console.log(res.data)
             localStorage.setItem("restoid",res.data._id)
             navigate("/Admin", { replace: true });
            })
            .catch(err => {
      
                console.error(err);
      
            })
    


    
    }
  }
  return (
    <>
      <div className="container-all">
        <h1 className="title">Sign Up</h1>
        <form className="form-container1" onSubmit={createUser}>
          <label className="user-label">Username</label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="user-input"
            type="text"
            placeholder="John Doe"
            id="username"
          />
          <label className="pwd-label">Password</label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pwd-input"
            type="password"
            placeholder="wbvw6xty"
            id="password"
          />

          <input className="submit-btn" type="submit" value="Register" />
        </form>
      </div>
    </>
  );
}

export default Signup;
