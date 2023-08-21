import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route  } from "react-router-dom";

import Home from "./Home";
import Login from './Login';
import Register from './Register';
import BooksShop from './BooksShop';
// import BooksShop from './BooksShop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route path="/booksShop/:username" element={<BooksShop />} />
          {/* </Route> */}
      
      </Routes>

    </BrowserRouter>


  );
}

export default App;
