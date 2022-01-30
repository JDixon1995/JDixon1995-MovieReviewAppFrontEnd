import React, { useEffect, useState } from 'react';
import MovieDataService from '../services/movies'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const MoviesList = () => {
  
  const [movies, setMovies] = useState([])
  const [searchTitle, setSearchTitle] = useState('')
  const [searchRating, setSearchRating] = useState('')
  const [ratings, setRatings] = useState(["All Ratings"])

  useEffect(() => {
    retrieveMovies()
    retrieveRatings()
  }, [])

  const retrieveMovies = () => {
    MovieDataService.getAll()
    .then(response => {
      console.log(response.data)
      setMovies(response.data.movies)
    })
    .catch( e => {
      console.log(e)
    })
  }
  
  const retrieveRatings = () => {
    MovieDataService.getRatings()
    .then(response => {
      console.log(response.data)
      setRatings(["All Ratings"].concat(response.data))
    })
    .catch(e => {
      console.log(e)
    })
  }

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle)
  }

  const onChangeSearchRating = e => {
    const searchRating = e.target.value
    setSearchRating(searchRating)
  }


  const findByTitle = () => {
    
  }

  const findByRating = () => {

  }

  return (
  <div>
    <Container>
    <Form>
      <Form.Group className="mb-3" >
      <Form.Label>Title Search</Form.Label>
      <Form.Control 
      type="text" 
      placeholder="Search by Title" 
      value={searchTitle} 
      onChange={onChangeSearchTitle} 
      />
    </Form.Group>
    <Button 
    variant="primary" 
    type="button"  
    onClick={findByTitle} >
    Submit
  </Button>
  </Form>
  </Container>
    
  <Container>
  <Form>
  <Form.Group className="mb-3">
    <Form.Label>Rating Search</Form.Label>
    <Form.Control 
    as="select" 
    onChange={onChangeSearchRating} >
      {ratings.map(rating => {
        return(
          <option value={rating}>{rating}</option>
        )
      })}
    </Form.Control>
  </Form.Group>
  <Button 
    variant="primary" 
    type="button"  
    onClick={findByRating} >
    Submit
  </Button>
</Form>
  </Container>

  <Container>
    <Row>
      {movies.map((movies) => {
        return(
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img src={movies.poster+"/100px180"} />
              <Card.Body>
                <Card.Title>{movies.title}</Card.Title>
                <Card.Text>
                  Rating: {movies.rated}
                </Card.Text>
                <Card.Text>
                  {movies.plot}
                </Card.Text>
                <Link to={"/movies/+movie._id"} >View Reviews</Link>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  </Container>
  </div>
  )};

export default MoviesList;
