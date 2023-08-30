import React from "react"
import { Link } from "react-router-dom"

import { Outlet } from "react-router-dom"
import './App.css';

// const type = { Adults: 'Adults', Children: 'Children', Comics: 'Comics', CookBooks: 'Cooking and Baking' };
const types=['Adults', 'Children', 'Comics', 'Cooking and Baking']

export default function Layout() {
    const userName=JSON.parse(localStorage["currentUser"]).Username;
    return (
        <>
            <header className="home-container">
            <h1 className="webTitle">Welcome {userName} to our Bookshop</h1>

                <nav className="menus-container">
                    <div className="topnav">
                        <div className="iconsMenu">
                            <Link to={`/booksShop/${userName}/shoppingCart`}>
                                <span className="icon">&#128722;</span> 
                            </Link>
                                {/* home */}
                            <Link to={`/booksShop/${userName}`}>
                                <span className="icon">&#127968;</span> 
                                </Link>
                            <Link to={`/booksShop/${userName}/aboutUs`}>
                                <span className="icon" style={{color: "red"}}>About Us</span> 
                            </Link>
                            <Link to={`/booksShop/${userName}/logout`}>
                                    <span className="icon" style={{color: "red"}}>Logout</span> 
                            </Link>
                        
                        </div>
                        
                        <div className="booksMenu">
                                {types.map(type => <Link key={type} to={`/booksShop/${userName}/${type}`} className="custom-link">{type}</Link>)}
                        </div>
           
                    </div>
                </nav>

            </header>
            <Outlet />

        </>
    )
}