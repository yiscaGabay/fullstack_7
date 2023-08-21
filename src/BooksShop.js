import Layout from "./Layout";
import { useState } from "react";

function BooksShop() {
    const [adultsBooks, setAdultsBooks] = useState([]);
    const [childrenBooks, setChildrenBooks] = useState([]);
    const [comicsBooks, setComicsBooks] = useState([]);
    const [cookBooks, setCookBooks] = useState([]);
    const [currentBooks, setCurrentBooks] = useState([{ Product_ID: 123, Title: 'aaa', Author: 'Moshe', Description: 'https://i.pinimg.com/236x/12/37/6b/12376b5d486cd4c8edb28c3dbfb4766b.jpg', Price: 120 },
    {Product_ID: 123, Title:'aaa', Author: 'Moshe', Description: '/images/img1.jpg',  Price: 120}]);

    const handleTypeClick = async (event) => {
        const type = event.target.value;
        if ((type == 'Adults' && adultsBooks == []) ||
            (type == 'Children' && childrenBooks == []) ||
            (type == 'Comics' && comicsBooks == []) ||
            (type == 'Cooking and Baking' && cookBooks == [])) {
                try {
                    const response = await fetch(`http://localhost:3001/products/${type}`);
                    console.log(`Status: ${response.status}`);
                    console.log('Response headers:', response.headers);
              
                    if (response.status === 200) {
                        const data = await response.json();
                        console.log(data);
                        switch (type) {
                            case 'Adults':
                                setAdultsBooks(data);
                                break;
                            case 'Children':
                                setChildrenBooks(data);
                                break;
                            case 'Comics':
                                setComicsBooks(data);
                                break;
                            case 'Cooking and Baking':
                                setCookBooks(data);
                                break;
                        }
                        setCurrentBooks(data);
                    } else {
                        if(response.status===404){
                            console.log('No books of this type found');
                            setCurrentBooks([]);
                        }else{
                          console.error(`Request failed with status code ${response.status}`);
                          alert('Sorry, there was an error. Try again');
                        }
                     
                    }
                  } catch (error) {
                    console.error('An error occurred:', error);
                    alert('Sorry, there was an error. Try again');
                  }
        }
        else {
            switch (type) {
                case 'Adults':
                    setCurrentBooks(adultsBooks);
                    break;
                case 'Children':
                    setCurrentBooks(childrenBooks);
                    break;
                case 'Comics':
                    setCurrentBooks(comicsBooks);
                    break;
                case 'Cooking and Baking':
                    setCurrentBooks(cookBooks);
                    break;    
            }
        }       
    };



    return (<div>
        <Layout />
        <div className="topnav">
            <button className="buttonNavbar" onClick={handleTypeClick}>Adults</button>
            <button className="buttonNavbar" onClick={handleTypeClick}>Children</button>
            <button className="buttonNavbar" onClick={handleTypeClick}>Comics</button>
            <button className="buttonNavbar" onClick={handleTypeClick}>Cooking and Baking</button>
        </div>

        <section className="gallery">
            {/* all the items of this page */}
            <div className="grid-container">
                {childrenBooks == []? <h3>No books of this type</h3> 
                : currentBooks.map(book =>
                    <div
                        key={book.Product_ID}
                        className="grid-item"> 
                        <img src={book.Description} style={{ width: '100 %'}} alt='book'/>  
                        <div className="overlay">
                            <h4>{book.Title}</h4>
                            <h4>{book.Author}</h4>
                            <p>{book.Price}₪</p>
                        </div>  
                    </div>)}
        
          </div>
        
        </section>

    </div>);
}
 //Adults, children, comics, cooking and baking
export default BooksShop;