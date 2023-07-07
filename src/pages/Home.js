import React, { useEffect, useState } from 'react'
import URL from '../helpPages/Url';
import { Link } from 'react-router-dom';



// import { Link } from 'react-router-dom';



export default function Home() {
    // Hooks area

    const[businessCategory, setBusinessCategory] = useState([])
    //http://localhost:1337/api/business-categories?populate=*
    useEffect(()=>{
        fetch(`${URL}/api/business-categories?populate=*`)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log("home data ----->", data.data)
            setBusinessCategory(data.data)
        })
        .catch();
    },[])
  return (
    <>
        <h2>Home Page</h2>
        <ul className="nav">
        {
            businessCategory.map((cv,idx,arr)=>{
                return  <li key={idx} className='me-3'>
                            <Link to={"/search?cat_name="+cv.attributes.name}>
                                    <img src={URL+cv.attributes.Image.data.attributes.url}/> <br />
                                            {cv.attributes.name}     
                            </Link>
                        </li>
            })
        }
        </ul>
    </>
  )
}
