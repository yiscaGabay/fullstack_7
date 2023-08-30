import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import Layout from "./Layout";
import videoFile from "./videos/cakes_video.mp4";

function BooksShop() {

    const location = useLocation();

  // Extract current URL
    const currentUrl = location.pathname;
    const userName=JSON.parse(localStorage["currentUser"]).Username;

    return (<div>
        <Layout />

        {/* add About */}
        {currentUrl.split('/').pop()==userName&&<video width="auto" height="auto" autoPlay muted>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
        </video>}

    </div>);
}
export default BooksShop;