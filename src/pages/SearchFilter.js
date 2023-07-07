import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useSearchParams } from 'react-router-dom'
import URL from '../helpPages/Url';
import img from '../aseat/img/1.jpg'


export default function SearchFilter() {

    //hook area

    const[businesses, setBusinesses] = useState([]);

const [searchParams, setSearchParams]= useSearchParams();

    useEffect(()=>{
        // http://localhost:1337/api/businesses?populate=*&filters[business_categories][name][$containsi]=Restaurants
        
       console.log('serachhhh--->',searchParams.get('cat_name'))
    // http://localhost:1337/api/businesses?populate=*&filters[business_categories][name][$containsi]=ABC
       fetch(`http://localhost:1337/api/businesses?populate=*&filters[business_categories][name][$containsi]=${searchParams.get('cat_name')}`)
       .then(res=>res.json())
       .then((data)=>{
        console.log('search c ====----- business>',data.data)
        setBusinesses(data.data)

        // setSearchParams(data,data)
       })
       .catch(err=>err);
    },[])
  return (
    <>
        <h2>Search Page</h2>

            <Row>
                <Col sm={9}>

                {
                    businesses.map((cv,inx,arr)=>{
                        
                        return <Link to={"/detail?hotel_id="+cv.id} key={inx} className='c_text'>
                        <Card className='p-3 mb-4'>
                        <Row>
                            <Col sm={3}>
                            {
                                console.log('cv--->id', cv.id)
                            }
                                <Card.Img variant="top" className="img-fluid" 
                                src={cv.attributes.Photo.data[0] !== null ? URL+cv.attributes.Photo.data[0].attributes.url : img} />
                                
                            </Col>
                            <Col sm={9}>
                            <Card.Body>
                                <Card.Title>
                                {cv.attributes.name}

                                </Card.Title>
                                <Badge bg="success" className='fs-5 p-2'>3.2</Badge> 
                                <span>

                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                    <FontAwesomeIcon icon={faStar} className="text-warning" />
                                    <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                    <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                </span> 
                                <span>3,345 Rating</span>
                        
                                <Card.Text>
                                {cv.attributes.Desc}
                                
                                </Card.Text>
                                <a href={"tel:"+cv.attributes.phone} className='btn btn-success' onClick={(e)=>{e.stopPropagation()}}>{'+91'+cv.attributes.phone}</a>
                            </Card.Body>
                            </Col>
                        </Row>
                            
                    </Card>
                </Link>

                    })
                }

                    
                </Col>

                <Col sm={3}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Featured</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>    
    </>
  )
}
