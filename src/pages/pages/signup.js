import React from "react";
import "./signin.css";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
const role ="admin"
  async function loginUser(event) {
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
    console.log(response);
  }
  return (
    <>
      <div className="container-all">
        <h1 className="title">Sign Up</h1>
        <form className="form-container1" onSubmit={loginUser}>
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
