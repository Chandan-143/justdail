import { Button } from 'react-bootstrap'
import React from 'react'
import { Form } from 'react-bootstrap'
// import swal from 'sweetalert';

export default function Login() {
 
  let sendDataLogin =()=>{
    // alert("hello chandan kumar ")
    let paylod={

      "identifier": document.querySelector('input[type=email]').value,
      "password": document.querySelector('input[type=password]').value
    }
    console.log(paylod)

          fetch(`http://localhost:1337/api/auth/local`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(paylod)
          })
          .then((res)=>{
            return res.json();
          })
          .then((data)=>{
            console.log(data)
            if(data["jwt"] !== undefined){
              // swal("Bad job!", "user not create successfully", "error");
              alert('Welcome Success')
              window.localStorage.setItem('token', data["jwt"])

              // render onther page

              window.location.href='/business_register'
            }
            else{
              // swal("Good job!", "user create successfully", "success");
              alert('Please Try')
              
            }
          })
          .catch(err=>err)
  }
  return (
    <>
      <h2>Login</h2>

        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
               
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="button" onClick={sendDataLogin}>Submit</Button>
        </Form>
    </>
  )
}
