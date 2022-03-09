import React from 'react'
import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import AddReview from './components/add-review'
import MoviesList from './components/movies-list'
import Movie from './components/movie'
import Login from './components/login'

function App() {

  const [user, setUser] = useState(null)

  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  return (

    <div className="App">
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Movie Reviews</Navbar.Brand>
    <Nav className="me-auto">
    <Nav.Link>
        <Link to={"/movies"}>Movies</Link>
    </Nav.Link>
    <Nav.Link>
          { user ? (
          <Link onClick={logout()} to={"/"}>Logout</Link>) : 
          (<Link to={'/login'}>Login</Link>)}
      </Nav.Link>
    </Nav>
    </Container>
  </Navbar>

<Routes>
  <Route path="/" element={<MoviesList /> } />
  <Route path="/movies/:id" element={<Movie />} />
  <Route path="/movies/:id/review" element={<AddReview />} />
  <Route path="/login" element={<Login />} />   
</Routes>

  </div>
  );
}

export default App;
