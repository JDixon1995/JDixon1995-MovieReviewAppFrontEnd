import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
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
          </Col>
        </Row>
      </Container>
  </div>;
};

export default Movie;
