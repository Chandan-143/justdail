// import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert';


export default function Register() {
// Hook variable 

// const[registrationData, setRegistrationData] = useState({

//                                                           "username": "riya",
//                                                           "email": "riya.bar@strapi.io",
//                                                           "password": "Test1234"

//                                                         });

  let sendRegistrtionData= ()=>{
    // alert("helooo")

    let u= document.querySelector('input[name=username]').value;
    let e = document.querySelector('input[name=email]').value; 
    let p= document.querySelector('input[name=password]').value;

    console.log(p)
    console.log(u)
    console.log(e)
    
    // setRegistrationData({
      
                        
    //                   })
                      // console.log(registrationData)

                    fetch(`http://localhost:1337/api/auth/local/register`,{
                        method:"POST",
                        headers:{
                          'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                                              "username": u,
                                              "email": e,
                                              "password": p
                                            }),
                    })
                      .then((res)=>{
                        return res.json();
                      })
                      .then((data)=>{
                        if(data.data===null){
                          console.log(data.data);

                        swal("Bad Job!", `${data.error.message}`, "error");
                      }
                      else{
                        
                        swal("Good job!", "user create successfully", "success");
                      }
                    })
                .catch(err=>err);
  }
  return (
    <>
      <h2>Register</h2>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>UserName</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter username" />
                <Form.Text className="text-muted">
             
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
             
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="button" onClick={sendRegistrtionData}>Submit</Button>
        </Form>
    </>
  )
}
