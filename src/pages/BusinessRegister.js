import React, { useEffect, useState } from 'react'
import {Button , Form } from 'react-bootstrap'
import URL from '../helpPages/Url';


export default function BusinessRegister() {

    const[countries, setCountries] = useState([]);
    const[states, setStates] = useState([]);


    const[cities, setCities] = useState([]);
    const[businessCotegory, setBusinessCotegory] = useState([]);

    // const[paylod2, setPaylod2] = useState([]);


    
    
  
    
    
    useEffect(()=>{

        // fetch(`${URL}/api/cities`,{})
        // .then((res)=>{
        //     return res.json();
        //             })
        //             .then((cityData)=>{
        //                 console.log("cities data---->", cityData.data)
        //                 setCities(cityData.data)
        //             })
        //             .catch((err)=>{
        //                 return err;
        //             });


                    fetch(`${URL}/api/business-categories`)
                  
                        .then((res)=>{
                            return res.json();
                        })
                        .then((businessCateg)=>{
                            console.log("business cotegory---->",  businessCateg.data)
                            setBusinessCotegory(businessCateg.data);
                        })
                        .catch((err)=>{
                            return err;
                        });

                        // Get Countries Name

                        fetch(`${URL}/api/countries`,{})
                        .then((res)=>{
                            return res.json();
                        })
                        .then((countries_data)=>{
                            console.log("Countries data Name----> ", countries_data.data)
                            setCountries(countries_data.data)
                        })
                        .catch((err)=>{
                            return err;
                        });

                        //Get State Name 

                        // fetch(`${URL}/api/states`,{})
                        // .then((res)=>{
                        //     return res.json();
                        // })
                        // .then((state_data)=>{
                        //     console.log("State data Name---->", state_data.data)
                        //     setStates(state_data.data)
                        // })
                        // .catch((err)=>{
                        //     return err;
                        // });
                        
                },[]);
          // business register ---> event are use       
     let busReg =()=>{   
                    // alert("hello")

        let paylod= {
                    "data": {
                    "name": document.querySelector('input[name="business_name"]').value,
                    "business_category": document.querySelector('select[name="bus_id"]').value,
                    "cities": [
                        document.querySelector('select[name="city_id"]').value,
                    ]
                }
            };
        

            // get token from localstorage
            let jwt_token = window.localStorage.getItem('token')
            //hard coded
                // {
                //     "data": {
                //     "name": "Chandan2",
                //     "business_category": 2,
                //     "cities": [
                //         2
                //     ]
                //     }
                // }
                console.log("------>  ", paylod.data);
                // call the API 
                fetch(`${URL}/api/businesses`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+jwt_token
                    },
                    body:JSON.stringify(paylod)
                })
                .then((res)=>{
                    return res.json();
                })
                .then((data)=>{
                    console.log(data.data)
                    if(data["data"]===null){
                    alert(data.error.message);

                    }
                    else{

                        alert("Business Register Sucessfully");
                    }
                    // sweetAlert()
                    // setPaylod2(data);
                })
                .catch(errr=>errr);

            }

     let selectCountry=(e)=>{
        // alert(e.target);
        console.log(e.target.value);
        let country_ide=e.target.value

        fetch(`${URL}/api/states?&filters[countries][id][$eq]=${country_ide}&populate=*`,{})
        .then((res)=>{
            return res.json();
        })
        .then((state_data)=>{
            console.log(state_data.data)
            setStates(state_data.data)

        })
        .catch(err=>err);


     }

     let selectCites=(e)=>{
        // alert('heloo')
                // alert(e.target);

        console.log("sleact cites---->",e.target.value);
        let cities_ide=e.target.value

        fetch(`${URL}/api/cities?&filters[state][id][$eq]=${cities_ide}&populate=*`,{})
        .then((res)=>{
            return res.json();
        })
        .then((cities_data)=>{
            console.log(cities_data.data)
            setCities(cities_data.data)

        })
        .catch(err=>err);


     }


  return (
    <>
        <h2 className='text-center'>Business Register</h2>
        {
            // console.log('set city--->',cities)
        }
        <Form>
            <Form.Label>Countries Name</Form.Label>
            <Form.Select name='Countries_id' aria-label="Default select example" onChange={(e)=>{selectCountry(e)}}>
                {
                    countries.map((cv,idx,arr)=>{
                    return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                    })
                }
            </Form.Select>

            {
                states.length !==0 && 
                <Form.Select name='state_id' aria-label="Default select example" onChange={(e)=>{selectCites(e)}}>
                    <>
                        {
                            states.map((cv,idx,arr)=>{
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                            })
                        }
                    </>
                </Form.Select>
            }

            {
                cities.length !== 0 &&
                <Form.Select name='city_id' aria-label="Default select example">
                    <>
                        {
                            cities.map((cv,idx,arr)=>{
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                            })
                        }
                    </>
                </Form.Select>
            }
           
           
            <Form.Label>Business Cotageory</Form.Label>
            <Form.Select name='bus_id' aria-label="Default select example">
            {
                businessCotegory.map((cv,idx,arr)=>{
                    return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                })
            }
                {
                    // console.log("---paylod---", paylod2)
                }
            </Form.Select>
            <Form.Group className="mb-3">
                <Form.Label>Business Name</Form.Label>
                <Form.Control name='business_name' type="text" placeholder="Enter Business Name" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
           
                <Button variant="primary" type="button" onClick={busReg}>Register Business</Button>
        </Form>
    </>
  )
}
