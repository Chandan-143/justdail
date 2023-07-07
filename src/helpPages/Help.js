import React from 'react'

export default function Help() {
  return (
    <>
    <Row>
    <Col sm={9}>
        <h3>Search filter page</h3>

        {
            business.map((cv,ind,aar)=>{
                return  <Card className='p-3 mb-4' key={ind}>
                            <Row>
                                <Col sm={3}>
                                    <Card.Img variant="top" className="img-fluid" 
                                    src={URL+cv.attributes.photo.attributes.url} />
                                </Col>
                                <Col sm={9}>
                                <Card.Body>
                                    <Card.Title>
                                        {cv.attributes.name}
                                    </Card.Title>
                                    <Badge bg="success" className='fs-5 p-2'>3.2</Badge> 
                                        <span>
                                            <FontAwesomeIcon icon="fa-solid fa-star" />
                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                            <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                            <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                        </span> 
                                    <span>3,345 Rating</span>
                            
                                    <Card.Text>
                                        {cv.attributes.Disc}
                                    </Card.Text>
                                    <button className='btn btn-success'>Show Number</button>
                                </Card.Body>
                                </Col>
                            </Row>

                            <button>sub</button>
                        </Card>
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
