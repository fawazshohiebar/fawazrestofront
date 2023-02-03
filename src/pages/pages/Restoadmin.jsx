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
    const [catname, setcatname] = useState(null)
    const [itemname, setitemname] = useState(null)
    const [itemdescription, setitemdescription] = useState(null)
    const [itemprice, setitemprice] = useState(0);
    const [itemtags, setitemtags] = useState([])




    const changerestoname = async () => {
        const data = { _id: resto_id, restaurant_name: Nresto_name };
        await axios.put(`http://localhost:3000/restaurant/name`, data)
            .then(res => {
                console.log("Successful update: ", res.data);
            })
            .catch(err => {
                console.error("Update failed: ", err);
            });
    }






    // this is for editing the image keepit as it is    
    const [file, setFile] = useState(null);
    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("resto_logo", file);
        formData.append("_id", resto_id);
        axios
            .put("http://localhost:3000/restaurant/logo", formData)
            .then((res) => {
                console.log("everything is done ")
            })
            .catch((err) => {
                console.log(err.response.data.error);
            });
    };













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


    const addnewcat = async () => {
        const data = { resto_id: resto_id, category_name: catname };
        await axios.post(`http://localhost:3000/categories/post`, data)
            .then(res => {
                console.log("Successful update: ", res.data);
            })
            .catch(err => {
                console.error("Update failed: ", err);
            });
    }





    const addnewitem = async () => {
        const data = { cat_id: category_id, item_name: itemname, item_description: itemdescription, item_price: itemprice, item_tags: itemtags };
        await axios.post(`http://localhost:3000/item/post`, data)
            .then(res => {
                console.log("Successful update: ", res.data);
            })
            .catch(err => {
                console.error("Update failed: ", err);
            });
    }






    const resto_namechanger = (event) => {
        setNresto_name(event.target.value);
        console.log(event.target.value)
    };


    const handlecatname = (event) => {
        setcatname(event.target.value);
        console.log(event.target.value)
    };


    const handleitemname = (event) => {
        setitemname(event.target.value);
        console.log(event.target.value)
    };
    const handleitemdescription = (event) => {
        setitemdescription(event.target.value);
        console.log(event.target.value)
    };
    const handleitemprice = (event) => {
        setitemprice(event.target.value);
        console.log(event.target.value)
    };


    const handleitemtags = (event) => {
        setitemtags([...itemtags, event.target.value]);
    }






    const openresto_name = () => {
        document.getElementById("resto_name").style.display = "block";
    }
    const closeresto_name = () => {
        document.getElementById("resto_name").style.display = "none";
    }




    const opencatname = () => {
        document.getElementById("categoryform").style.display = "block";
    }
    const closecatname = () => {
        document.getElementById("categoryform").style.display = "none";
    }
    const openadditems = () => {
        document.getElementById("additems").style.display = "block";
    }
    const closeadditems = () => {
        document.getElementById("additems").style.display = "none";
    }







    useEffect(() => {
        getrestoname()
        getRestoLogo()
        getcategories()

    }, [resto_id, resto_name, category_id, Nresto_name])






    return (
        <>



            <div className='container'>
                <img src={`http://localhost:3000/${resto_logo}`} alt='logo for rest'></img>
                <label id='imgbtn' htmlFor="filePicker" >


                    <img id='fileimg' src={edit} alt=''></img>
                </label>
                <br />
                <br />
                <br />
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileUpload} />
                    <button type="submit">Submit</button>

                </form>


            </div>
            <div className='container2'>
                <h1 className='h11'>{resto_name} </h1>
                <button onClick={openresto_name}><img id='editname' src={edit} alt=''></img></button>


                {/* this is the pop up for editing the restaurant name  */}
                <div className="form-popup right" id="resto_name">

                    <h1>edit the name of the restaurant  </h1>
                    <label className="textform" >Restaurant name </label><br />
                    <input type="text" value={Nresto_name} onChange={resto_namechanger} /><br />

                    <button className="btn" onClick={changerestoname} >change</button><br /><br />
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
                    <button onClick={opencatname}>+</button>





                    <div className="form-popup left" id="categoryform">

                        <h1>ADD NEW category </h1>
                        <label className="textform" htmlFor="email">categoryname</label><br />
                        <input type="text" value={catname} onChange={handlecatname} />
                        <br />

                        <button className="btn " onClick={addnewcat}>submit</button><br /><br />
                        <button onClick={closecatname} className="btn cancel">close me </button>

                    </div>

                </div>
            </nav>


            <button onClick={openadditems}>additems</button>


            <div className="form-popup left" id="additems">

                <h1>ADD NEW item </h1>
                <label className="textform" >item_name</label><br />
                <input type="text" value={itemname} onChange={handleitemname} />
                <br />
                <label className="textform" >item_description</label><br />
                <input type="text" value={itemdescription} onChange={handleitemdescription} />
                <br />
                <label className="textform" >item_price</label><br />
                <input type="number" value={itemprice} onChange={handleitemprice} />
                <br />
                <label className="textform" >item_tags</label><br />
                <input type="text" value={itemtags} onChange={handleitemtags} />
                <br />


                <button className="btn " onClick={addnewitem}>submit</button><br /><br />
                <button onClick={closeadditems} className="btn cancel">close me </button>

            </div>







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
