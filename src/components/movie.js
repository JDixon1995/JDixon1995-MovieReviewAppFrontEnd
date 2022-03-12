import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieDataService from '../services/movies'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
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
          <Card style={{width: '20.3rem'}}>
            <Card.Header as="h5">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>
                {movie.plot}
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
  </div>;
};

export default Movie;
