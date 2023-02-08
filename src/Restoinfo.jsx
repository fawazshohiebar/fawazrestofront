import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
function Restoinfo(props) {


  // const [restoidd, setrestoidd] = useState(null);
  // const hand = () => {
  //   setrestoidd(props.the_id)
  //   console.log(props.the_id)
  // }
  // const sendid = () => {
  //   console.log(props.the_id)
  // }

  // const userData = { name: restoidd };



  useEffect(() => {

  }, [props.is_disabled]);


  const handleClick = async () => {
    const data = { _id: props.the_id, is_disabled: !props.is_disabled };
    await axios.put(`http://localhost:3000/restaurant/isdisabled`, data)
      .then(res => {
        console.log("Successful update: ", res.data);
      })
      .catch(err => {
        console.error("Update failed: ", err);
      });
  };


  return (
    <div>



      <div className="resto-info-comp">



        <button className="lists-buttons" >

          {/*
      onClick={hand}
       <Link to={{
        pathname: "/restoadmin",
        state: { userData }
      }}> */}
          <Link to="/restoadmin"
            state={{ resto_id: props.the_id }}
          >
            {props.restoname}
          </Link>
        </button>
        <button className="lists-buttons" >

          {/*
onClick={hand}
<Link to={{
pathname: "/restoadmin",
state: { userData }
}}> */}
          <Link to="/Inspectors"
            state={{ resto_id: props.the_id, is_disabled: props.is_disabled }}
          >
            {props.restoname}
          </Link>
        </button>






        <button
          className="check"
          name="halafeek"
          style={{ backgroundColor: props.is_disabled ? "green" : "red" }}
          onClick={handleClick}
        >

        </button>
        <h2>{props.is_disabled ? "enabled" : "disabled"}</h2>

      </div >
    </div>)
}
export default Restoinfo;
