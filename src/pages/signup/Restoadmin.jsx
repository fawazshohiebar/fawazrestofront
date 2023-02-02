import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Bin from "./images/Bin.svg"
import edit from "./images/edit.svg"
import axios from "axios";
import { useEffect } from "react";
import base64 from 'base64-js';

function Restoadmin() {

    const { state } = useLocation();
    // const data = location.state;
    const [categories, setcategories] = useState(null);
    const [resto_id, setresto_id] = useState(state.resto_id)
    const [resto_name, setresto_name] = useState(null);
    const [resto_logo, setresto_logo] = useState(null)
    const [category_id, setcategory_id] = useState(null)
    const [itemgetter, setitemgetter] = useState(null);
    const [Nresto_name, setNresto_name] = useState(null);


    const getrestoname = () => {
        const data = resto_id;
        axios.get(`http://localhost:3000/restaurants/restaurant_name?_id=${data}`)
            .then(res => {
                console.log("the precss is working")
                console.log("Successful: ", res.data);
                setresto_name(res.data)
            })
            .catch(err => {
                console.error("Update : ", err);
            });
    }




    const getRestoLogo = async () => {

        await axios.get(`http://localhost:3000/restaurants/logos?_id=${resto_id}`)

            .then(res => {

                console.log(res.data)
                setresto_logo(res.data);
            })
            .catch(err => {

                console.error(err);

            })
    };



    const getcategories = async () => {
        await axios.get(`http://localhost:3000/categories/?resto_id=${resto_id}`)

            .then(res => {

                console.log(res.data)
                setcategories(res.data);
            })
            .catch(err => {

                console.error(err);

            })
    }


    const gofetchitems = async () => {
        if (category_id) {

            await axios.get(`http://localhost:3000/categories/items/?cat_id=${category_id}`)
                .then(res => {

                    console.log(res.data)
                    setitemgetter(res.data);
                })
                .catch(err => {

                    console.error(err);

                })

        }
        else {
            console.log("fawaz nothing is here ")
        }
    }



    const resto_namechanger = (event) => {
        setNresto_name(event.target.value);
        console.log(event.target.value)
    };


    const openresto_name = () => {
        document.getElementById("resto_name").style.display = "block";
    }
    const closeresto_name = () => {
        document.getElementById("resto_name").style.display = "none";
    }




    useEffect(() => {
        getrestoname()
        getRestoLogo()
        getcategories()

    }, [resto_id, category_id])









    return (
        <>



            <div className='container'>
                <img src={`http://localhost:3000/${resto_logo}`} alt='logo for rest'></img>
                <label id='imgbtn' htmlFor="filePicker" >
                    <img id='fileimg' src={edit} alt=''></img>
                </label>
                <input id="filePicker" type={"file"}></input>

            </div>
            <div className='container2'>
                <h1 className='h11'>{resto_name} </h1>
                <button onClick={openresto_name}><img id='editname' src={edit} alt=''></img></button>


                {/* this is the pop up for editing the restaurant name  */}
                <div className="form-popup right" id="resto_name">

                    <h1>edit the name of the restaurant  </h1>
                    <label className="textform" htmlFor="email">Restaurant name </label><br />
                    <input type="text" value={Nresto_name} onChange={resto_namechanger} /><br />

                    <button className="btn" >submit</button><br /><br />
                    <button onClick={closeresto_name} className="btn cancel">close me </button>

                </div>








            </div>
            <nav>
                <div className='wrapper'>
                    <div className='navbtn'></div>
                    {
                        categories?.map((hourframe, index) =>
                        (
                            <button onClick={() => { setcategory_id(hourframe._id); gofetchitems() }} >{hourframe.category_name}</button>
                        ))

                    }
                    <button>+</button>

                </div>
            </nav>




            {itemgetter?.map((hourframe, index) => (


                <div className='item'>



                    <div className='dish1'>
                        <div className='editbtn1'>
                            <h3>{hourframe.item_name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   </h3>
                            <button id='edit1' type='button'><img id='editname' src={edit} alt=''></img></button>
                        </div>
                        <b>{hourframe.item_price}</b>
                        <p>{hourframe.item_description}</p>
                        <p>{hourframe.item_tags}</p>
                    </div>
                </div>


            ))}






        </>

    );

    ;
}

export default Restoadmin;
