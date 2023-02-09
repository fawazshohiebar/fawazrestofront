import React from "react";
import "./signin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function loginUser(event) {
    event.preventDefault();
    const x = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const response = await x.json();
    console.log(response);
    localStorage.setItem("id", response._id);
    localStorage.setItem("role", response.role);
    if (response.role === "superadmin") {
      navigate("/dashboard", { replace: true });
    } else if (response.role === "admin") {
      navigate("/restaurant", { replace: true });
    } else {
      navigate("/users/login", { replace: true });
    }
  }
  return (
    <>
      <div className="container-all">
        <h1 className="title">Log In</h1>
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
            placeholder="$$code1234"
            id="password"
          />
          <input className="submit-btn" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default Signin;
