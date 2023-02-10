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
    const [itemid, setitemid] = useState(null)
    const [itemTagsArray, setitemTagsArray] = useState(null)
    const [catdel, setcatdel] = useState(null)



    const changerestoname = async () => {
        const data = { _id: resto_id, restaurant_name: Nresto_name };
        await axios.put(`https://restaurant-6fdf.onrender.com/restaurants/name`, data)
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
            .put("https://restaurant-6fdf.onrender.com/restaurants/logo/put", formData)
            .then((res) => {
                console.log("everything is done ")
            })
            .catch((err) => {
                console.log(err.response.data.error);
            });
    };













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


    const addnewcat = async () => {
        const data = { resto_id: resto_id, category_name: catname };
        await axios.post(`https://restaurant-6fdf.onrender.com/categories/post`, data)
            .then(res => {
                console.log("Successful update: ", res.data);
            })
            .catch(err => {
                console.error("Update failed: ", err);
            });
    }





    const addnewitem = async () => {
        const data = { cat_id: category_id, item_name: itemname, item_description: itemdescription, item_price: itemprice, item_tags: itemtags };
        await axios.post(`https://restaurant-6fdf.onrender.com/categories/item/post`, data)
            .then(res => {
                console.log("Successful update: ", res.data);
            })
            .catch(err => {
                console.error("Update failed: ", err);
            });
    }






    const editTheitem = async () => {
        const data = { id: itemid, item_name: itemname, item_description: itemdescription, item_price: itemprice, item_tags: itemTagsArray };
        await axios.put(`https://restaurant-6fdf.onrender.com/categories/item/put`, data)
            .then(res => {
                console.log("Successful update of itemss: ", res.data);
            })
            .catch(err => {
                console.error("Update failed of items : ", err);
            });
    }


    const godeletecat = async () => {
        const data = { _id: catdel }
        await axios.delete(`https://restaurant-6fdf.onrender.com/categories/category/delete?_id=${catdel}`)
            .then(res => {
                console.log("Successful delete of category: ");
            }).catch(err => {
                console.error("delete failed of items : ", err);
            })
    }

    const deleteitem = async () => {
        const data = { _id: itemid }
        await axios.delete(`https://restaurant-6fdf.onrender.com/categories/items/delete?_id=${itemid}`)
            .then(res => {
                console.log("Successful delete of itemss: ");
            }).catch(err => {
                console.error("delete failed of items : ", err);
            })
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
        setitemtags(event.target.value.split(","));
        setitemTagsArray([...itemTagsArray, ...itemtags]);
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

    const openedititems = () => {
        document.getElementById("edititems").style.display = "block";
    }
    const closeedititems = () => {
        document.getElementById("edititems").style.display = "none";
    }

    const openfileform = () => {
        document.getElementById("fileedit").style.display = "block";
    }
    const closefileform = () => {
        document.getElementById("fileedit").style.display = "none";
    }





    useEffect(() => {
        getrestoname()
        getRestoLogo()
        getcategories()



    }, [resto_id, catdel, resto_name, category_id, itemid, Nresto_name])





    return (
        <>



            <div className='container'>
                <img src={`https://restaurant-6fdf.onrender.com/${resto_logo}`} alt='logo for rest' className="logo"></img>
                <button onClick={openfileform} className="change">change the image</button>



                <br />




                <div className="fileform" id="fileedit">
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileUpload} />
                        <button type="submit">Submit</button>
                        <button onClick={closefileform}> close form</button>

                    </form>
                </div>

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
            <br />
            <br />
            <nav className="catN">
                <div className='wrapper'>

                    {/* <div className='navbtn'></div> */}
                    {
                        categories?.map((hourframe, index) =>
                        (
                            <>
                                <button className="catB" onClick={() => { setcategory_id(hourframe._id); gofetchitems() }} >{hourframe.category_name}




                                </button>
                                <span class="thex-button" onClick={() => { setcatdel(hourframe._id); godeletecat() }}   >&times;</span>
                            </>
                        ))


                    }
                    <button className="catB" onClick={opencatname}>+</button>







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



            <button className="addItem" onClick={openadditems}>additems</button>


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





            <div className="itemBack">

                {itemgetter?.map((hourframe, index) => (


                    <div className='item'>



                        <div className='dish1'>
                            <div className='editbtn1'>
                                <div className="itemEd">
                                    <h3 className="itemName">{hourframe.item_name} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   </h3>
                                    <button className="editN" id='edit1' type='button' onClick={() => { openedititems(); setitemid(hourframe._id) }}><img id='editname' src={edit} alt=''></img></button>
                                    <button className="editN" onClick={() => { setitemid(hourframe._id); deleteitem() }}>del</button>
                                </div>


                                <div className="form-popup left" id="edititems">

                                    <h1>Edit the item item </h1>
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


                                    <button className="btn " onClick={editTheitem}>submit</button><br /><br />
                                    <button onClick={closeedititems} className="btn cancel">close me </button>

                                </div>






                            </div>

                            <b className="price">{hourframe.item_price}</b>
                            <p className="desc">{hourframe.item_description}</p>
                            <p className="tag">{hourframe.item_tags}</p>
                        </div>
                    </div>


                ))}

            </div>




        </>

    );

    ;
}

export default Restoadmin;
