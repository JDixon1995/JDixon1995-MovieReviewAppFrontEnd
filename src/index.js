import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
  <Route exact path="*" element={ <App /> } >
  </Route>
  </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
