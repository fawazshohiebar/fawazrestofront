import React from "react";

import { useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { useEffect } from "react";


function Inspectors() {


    const { state } = useLocation();

    // const data = location.state;
    const [categories, setcategories] = useState(null);
    const [resto_id, setresto_id] = useState(state.resto_id)

    const [resto_name, setresto_name] = useState(null);
    const [resto_logo, setresto_logo] = useState(null)
    const [category_id, setcategory_id] = useState(null)
    const [itemgetter, setitemgetter] = useState(null);
    const [disabled, setdisabled] = useState(state.is_disabled)















    const getrestoname = () => {
        const data = resto_id;

        axios.get(`https://restaurant-6fdf.onrender.com/restaurants/restaurant_name?_id=${data}`)
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

        await axios.get(`https://restaurant-6fdf.onrender.com/restaurants/logos?_id=${resto_id}`)

            .then(res => {

                console.log(res.data)
                setresto_logo(res.data);
            })
            .catch(err => {

                console.error(err);

            })
    };



    const getcategories = async () => {
        await axios.get(`https://restaurant-6fdf.onrender.com/categories/get/?resto_id=${resto_id}`)

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

            await axios.get(`https://restaurant-6fdf.onrender.com/categories/get/items/?cat_id=${category_id}`)
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
























    useEffect(() => {
        getrestoname()
        getRestoLogo()
        getcategories()

    }, [resto_name, category_id])






    return (
        <div style={{ display: disabled ? "block" : "none" }}>



            <div className='conn'>
                <img className="images" src={`https://restaurant-6fdf.onrender.com/${resto_logo}`} alt='logo for rest'></img>

            </div>


            <div className='container2'>
                <h1 className='h11'>{resto_name} </h1>


            </div>





            <nav className="navigation-menu">
                <div className='wrapper'>
                    <div className='navbtn'></div>
                    {
                        categories?.map((hourframe, index) =>
                        (
                            <button className="buttonnn" onClick={() => { setcategory_id(hourframe._id); gofetchitems() }} >{hourframe.category_name}</button>
                        ))

                    }








                </div>
            </nav>













            {itemgetter?.map((hourframe, index) => (


                <div className='item'>



                    <div className='dish'>
                        <div className='editbtn1'>
                            <h3 className="h3-new">{hourframe.item_name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   </h3>











                        </div>

                        <b>{hourframe.item_price}</b>
                        <p>{hourframe.item_description}</p>
                        <div className="tagsss">
                            {hourframe.item_tags?.map((hourff, index) => (

                                <p>???{hourff}</p>))}</div>
                    </div>
                </div>


            ))}






        </div>

    );

    ;
}

export default Inspectors;
