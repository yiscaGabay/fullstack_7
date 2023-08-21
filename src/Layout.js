import React from "react"
import { Link } from "react-router-dom"

import { Outlet } from "react-router-dom"
import './App.css';

export default function Layout() {
    // const Name = JSON.parse(localStorage["currentUser"]).name;
    //const Username=JSON.parse(localStorage["currentUser"]).username;
    const username = 'yisca';
    return (
        <>
        <header className="home-container">
            <nav>
                <ul>
                    <h1>Welcome {username}</h1>
                    <li>
                        <Link to={`/booksShop/${username}/shoppingCart`}>Shopping cart</Link>
                    </li>
                    <li>
                        <Link to={`/booksShop/${username}`}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/login"}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <Outlet />
        </>
    )
}