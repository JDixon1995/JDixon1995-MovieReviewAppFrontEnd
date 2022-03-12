import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import MoviesList from './components/movies-list'
import Movie from './components/movie'

function App() {

  return (

    <div className="App">
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>Movie Database App</Navbar.Brand>
    <Nav className="me-auto">
    <Nav.Link>
        <Link to={"/"}>Movies</Link>
    </Nav.Link>
    </Nav>
    </Container>
  </Navbar>

<Routes>
  <Route path="/" element={<MoviesList /> } />
  <Route path="/movies/:id" element={<Movie />} />
</Routes>

  </div>
  );
}

export default App;
