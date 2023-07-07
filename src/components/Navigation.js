import React, { useEffect, useState } from 'react'
import { Button, Container, Navbar, Nav , Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import URL from '../helpPages/Url';






export default function Navigation() {

    const[logo,setLogo]= useState();

    useEffect(()=>{
        fetch(`${URL}/api/website?populate=*`,{})
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            console.log("logo-->", data.data.attributes.Logo.data.attributes.url)
            setLogo(data.data.attributes.Logo.data.attributes.url)
        })
        .catch();
    },[])

    let Datalogout =()=>{
        window.localStorage.removeItem('token');
        window.location.href='/login'
    }

    // location serching use GeoLocation method or function 

        var x = document.getElementById("demo");
        let getLocation = ()=>{
            // alert('geolocation is on')
            //geolocation ---- >  get a current location

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } 
                else {
                x.value = "Geolocation is not supported by this browser.";
            }
        }
        
            function showPosition(position) {
                console.log(position)
                x.value='Delhi Shiv-puri gali number 9'
        
            }

  return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary h-100">
            <Container fluid>
                <Link to="/">
                    <img 
                        src= {`${URL}${logo}`}
                        width="100" 
                        height="30" 
                        className="d-inline-block align-top" 
                        alt="React Bootstrap logo" 
                    />
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Form className="d-flex">
                <button type='button' className='btn btn-primary me-2' onClick={()=>{getLocation()}} >Location</button>
                            <Form.Control id='demo' type="text" placeholder="Search" className="me-2" aria-label="Search" readOnly />
                            <Form.Control id='demo2' type="search" placeholder="Search" className="me-2" aria-label="Search" />

                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Nav className="justify-content-end" activeKey="/home">
                            <Nav>
                                <Link to="/" className='btn btn-link'>Home</Link>
                            </Nav>
                        {
                            window.localStorage.getItem('token') === null &&
                          
                            <>
                                    
                                    <Nav.Link to="/login" className='btn btn-link'>Login</Nav.Link>
                                    <Nav.Link to="/register" className='btn btn-link'>Register</Nav.Link>
                                  
                          
                            </>
                            
                            
                        }

                        {
                            window.localStorage.getItem('token') !== null &&
                            <>
                
                                <Nav.Link to="/business_register"  className='btn btn-link'>Business Register</Nav.Link>
                                <Nav.Link to='/' className='btn btn-link' onClick={Datalogout}>Logout</Nav.Link>
                            </>

                        }
                     
                           
                            
                          
                        </Nav>
            </Container>
        </Navbar>
        
    </>
  )
}
