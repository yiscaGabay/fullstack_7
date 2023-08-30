import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

function PresentBooks(props) {
    const [books, setBooks] = useState([]);
    const [start, setStart] = useState(0);
    // check if all the data was brought
    const [finishedData, setFinishedData] = useState(false); 
    const limit = 1; // Set the limit
    const { typeOfBooks } = useParams();

    // const location = useLocation();
    // const typeOfBooks = location.state.typeOfBooks;
    // const t = new URLSearchParams(location.search).get('typeOfBooks');
    // const t = props.typeOfBooks;



    useEffect(() => {
        console.log("in useEffect 1 " + start);
        // setStart(prev=>prev=0);
        setStart(0);
        setBooks([]);
        handleClick(0);

    }, [typeOfBooks]);

    // load the first amount of books
    useEffect(() => {
        console.log("in useEffect 2 " + start);
    }, [start]);



    

    const handleClick = async (s) => {
        // if (books.length === 0) {
        try {
            // const newStart = s + limit;
            // console.log(newStart);
            const response = await fetch(`http://localhost:3001/products/${typeOfBooks}?start=${s}&limit=${limit}`);
            console.log(`Status: ${response.status}`);
            console.log('Response headers:', response.headers);
        
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                const finished = data.pop();
                setBooks(prevBooks => [...prevBooks, ...data]);
                setStart(s + limit);
                setFinishedData(finished);
            } else {
                if(response.status===404){
                    console.log('No books of this type found');
                }else{
                    console.error(`Request failed with status code ${response.status}`);
                    alert('Sorry, there was an error. Try again');
                }
                
            }
            } catch (error) {
            console.error('An error occurred:', error);
            alert('Sorry, there was an error. Try again');
            }
        // }      
    };



    return (<div>

        <section className="gallery">
            {/* all the items of this page */}
            <div className="grid-container">
                {books == []? <h3>No books of this type</h3> 
                : books.map(book =>
                    <div
                        key={book.Product_ID}
                        className="grid-item"> 
                        <img src={book.Description} alt='book'/>  
                        <div className="overlay">
                            <h4>{book.Title}</h4>
                            <h4>{book.Author}</h4>
                            <p>{book.Price} ₪</p>
                        </div>  
                    </div>)}
        
          </div>
        
        </section>
        
        {!finishedData && <div className="showMore"><button className="showMoreButton" onClick={() => handleClick(start)}>SHOW MORE BOOKS</button></div>}


    </div>);
}
export default PresentBooks;