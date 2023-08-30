import React from "react"
import { Link } from "react-router-dom"



export default function Home() {
    return (
        <div className="login-container">
                    <h1 style={{ fontSize: '100px' }}>WELCOME</h1>
                    <Link className="button-link" to='/login'>LOG IN</Link>
                    <Link className="button-link" to='/register'>REGISTER</Link>
        </div>
    )
};
