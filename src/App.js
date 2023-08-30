import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route  } from "react-router-dom";

import Home from "./Home";
import Login from './Login';
import Register from './Register';
import BooksShop from './BooksShop';
import PresentBooks from './PresentBooks';
import ShoppingCart from './ShoppingCart';
import Logout from './Logout';
import AboutUs from './AboutUs';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booksShop/:username" element={<BooksShop />} >
          <Route path=':typeOfBooks' element={<PresentBooks />} />
          <Route path='shoppingCart' element={<ShoppingCart />} />
          <Route path='aboutUs' element={<AboutUs />} />
          <Route path='logout' element={<Logout />} />
        </Route>
      </Routes>

    </BrowserRouter>


  );
}

export default App;
