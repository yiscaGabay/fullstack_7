import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"

export default function Logout() {
    useEffect(() => {
        localStorage.removeItem('currentUser');
    });

    return (<div>
        {/* <p>You are logged out. Bye bye</p> */}
        <Navigate to='/login' />
    </div>);
}