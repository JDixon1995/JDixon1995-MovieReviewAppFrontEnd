import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import movies from '../services/movies'

const Movie = (props) => {

  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    review: [], 
  })

  const params = useParams()

  const getMovie = (id) => {
    MovieDataService.get(id)
    .then(response => {
      setMovie(response.data)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getMovie(params.id)
  },[params.id])

  return <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster+"/100px250"} fluid />
          <Card>
            <Card.Header as="h5">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>
                {movie.plot}
              </Card.Text>
              {props.user && 
              <Link to={"/movies/" + params.id + "/review"} >
                Add Review
              </Link>}
            </Card.Body>
          </Card>
          <br></br>
          <h2>Reviews</h2>
            {movie.review ? movie.review.map((review, index) => {
              return (
                <Table>
                  <h6 key={index}></h6>
                  <h5>{review.name + " reviewed on " + review.date}</h5>
                  <p>{review.review}</p>
                  {params.user && params.user.id === review.user_id && 
                    <Row>
                      <Col>
                      <Link to={{
                        pathname:"/movies/"+params.id+"/review",
                        state: {currentReview: review}
                      }}>Edit</Link>
                      </Col>
                      <Col><Button variant="link" >Delete</Button></Col>
                    </Row>
                  }
                </Table>
              )
            }) : <p>"No reviews for this film..."</p>}
          </Col>
        </Row>
      </Container>
  </div>;
};

export default Movie;
