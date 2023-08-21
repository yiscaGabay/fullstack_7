import React from "react"
import { Link } from "react-router-dom"



export default function Home() {
    return (
    < >
        <header className="home-container">
            <nav>
                    <h1 style={{ fontSize: '100px' }}>WELCOME</h1>
                    <li>  <Link id="loginLink" to='/login'>LOG IN</Link></li>
                    <li><Link id="registerLink" to='/register'>REGISTER</Link></li> 
            </nav>
        </header>
    </>
    )
};


// import React from 'react'
// import { BrowserRouter, Routes, Route  } from "react-router-dom";

// import Home from "./Home";



// export default function App() {
//   return (

//       <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<Home/>} />

//         </Routes>

//     </BrowserRouter>

    
//   );
// }