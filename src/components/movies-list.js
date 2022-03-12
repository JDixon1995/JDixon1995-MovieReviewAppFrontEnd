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
  const [searchRating, setSearchRating] = useState('')
  const [ratings, setRatings] = useState(["All Ratings"])

  useEffect(() => {
    retrieveMovies()
    retrieveRatings()
  }, [])

  const retrieveMovies = () => {
    MovieDataService.getAll()
    .then(response => {
      setMovies(response.data.movies)
    })
    .catch( e => {
      console.log(e)
    })
  }
  
  const retrieveRatings = () => {
    MovieDataService.getRatings()
    .then(response => {
      setRatings(["All Ratings"].concat(response.data))
    })
    .catch(e => {
      console.log(e)
    })
  }

  const onChangeSearchRating = e => {
    const searchRating = e.target.value
    setSearchRating(searchRating)
  }

  const find = (query, by) => {
    MovieDataService.find(query, by)
    .then(response => {
      console.log(response.data)
      setMovies(response.data.movies)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const findByRating = () => {
    if(searchRating === "All Ratings") {
      retrieveMovies()
    }
    else {
      find(searchRating, "rated")
    }
  }

  return (
  <div>
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
    style={{margin: '.5rem'}}
    variant="primary" 
    type="button"  
    onClick={findByRating} >
    Search
  </Button>
</Form>
  </Container>

  <Container>
    <Row>
      {movies.map((movie) => {
        return(
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img src={movie.poster+"/100px180"} />
              <Card.Body >
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  Rating: {movie.rated}
                </Card.Text>
                <Card.Text>
                  {movie.plot}
                </Card.Text>
                <Link to={"/movies/"+movie._id} >View Movie</Link>
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
