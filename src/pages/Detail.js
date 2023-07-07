import React, { useEffect, useState } from 'react'
import { Button, Carousel, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import URL from '../helpPages/Url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Detail() {


  const [searchParams, setSearchParams]= useSearchParams();

  const[busDetail, setBusDetail] = useState([])
  const[busPhoto , setBusPhoto ] = useState([]);
  const[storeData, setStoreData] = useState('');

  const[reatPaylod ,  setReatPaylod] = useState({

                                                "data": {
                                                "rate_scale": 5,
                                                "description": "veryGood",
                                                "businesses": [
                                                19
                                                ]
                                              }
                                          })


  useEffect(()=>{


    console.log('serachhhh---hotel id>',searchParams.get('hotel_id'))
    // let hotalid=detailParams.get('cat_id');

    fetch(`${URL}/api/businesses?populate=*&filters[id][$eq]=${searchParams.get('hotel_id')}`,{})
    .then(res=>res.json())
    .then((data)=>{
      console.log(data)
      console.log("detail of hotal id", data)
      if(data.data.length>0){
        setStoreData(data.data[0].attributes.name)
        setBusDetail(data.data)
        setBusPhoto(data.data[0].attributes.Photo.data)
      }
      else{
        // alert("jjjjj");
      }
    })
    .catch(err=>err);

  },[])


let evenHand = (e) => {
  console.log(e.target.classList)
  let elm = e.target
  console.log("elm--->", elm)
  // let c_remove =document.querySelectorAll('.c_remove');

    // elm.getAttribute("data-rateno");
    console.log(elm.getAttribute("data-rateno"))

    // let dec = document.querySelector('.dec').value;
    // console.log('----<',dec)

    setReatPaylod({
      ...reatPaylod,
      data:{
        ...reatPaylod.data,
        rate_scale:parseInt(elm.getAttribute("data-rateno")),
        description: document.querySelector('.dec').value
      }
    })
    console.log(reatPaylod)

  elm.classList.remove('text-secondary')
  elm.classList.add('text-warning');
  


}

let saveReview = (e) =>{
  console.log(reatPaylod)

  setReatPaylod({
    ...reatPaylod,
    data:{
      ...reatPaylod.data,
      description: document.querySelector('.dec').value
  }
})
}

  
  return (
    <>
      

      <h2>{storeData}</h2>
              <Carousel indicators={false} className='w-75'>

              {
                // console.log("jshgfugyfuyf---->",busPhoto)

                busPhoto.map((cv,idx,arr)=>{
                  return <Carousel.Item key={idx}>
                          <img
                            className="h-50"
                            src={URL+cv.attributes.url}
                            alt="First slide"
                          />
                        </Carousel.Item>
                })
                
              }
            </Carousel>


            <Form>
            <Form.Group className="mb-3 mt-3">
                <FontAwesomeIcon icon={faStar} className="text-secondary c_chandan" data-rateno = "1" onMouseEnter={(e)=>{evenHand(e)}}/>
                <FontAwesomeIcon icon={faStar} className="text-secondary c_chandan" data-rateno = "2" onMouseEnter={(e)=>{evenHand(e)}}/>
                <FontAwesomeIcon icon={faStar} className="text-secondary c_chandan" data-rateno = "3" onMouseEnter={(e)=>{evenHand(e)}}/>
                <FontAwesomeIcon icon={faStar} className="text-secondary c_chandan" data-rateno = "4" onMouseEnter={(e)=>{evenHand(e)}}/>
                <FontAwesomeIcon icon={faStar} className="text-secondary c_chandan" data-rateno = "5" onMouseEnter={(e)=>{evenHand(e)}}/>
                
                <Form.Control as="textarea" rows={3} className='mt-2 dec'/>
                
                </Form.Group>
                <Button type='button' className='btn btn-primary mt-2 p-2' onClick={(e)=>{saveReview(e)}}>Submit</Button> 
                
               
            </Form>


    </>
  )
}
