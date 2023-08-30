import { useState } from "react"
import { Link } from "react-router-dom"

const text = `Welcome to our Book Bazaar!
    At Book Bazaar, we are passionate about connecting book lovers with their next great read. Our online platform provides a seamless experience for buying and selling books, making it easier than ever to find that hidden gem or pass on a beloved book to a new owner.
    What sets Book Bazaar apart?
    1. Vast Selection: Our platform hosts a diverse collection of books across various genres, including fiction, non-fiction, mystery, romance, sci-fi, and more. Whether you're a fan of classic literature or the latest bestsellers, you'll find something that piques your interest.
    2. Easy Listing Process: If you have books to sell, we've made it incredibly simple to list them on our platform. Just create an account, provide details about the book, upload a captivating cover image, set a competitive price, and voila! Your book is ready to be discovered by eager readers.
    3. User-Friendly Interface: We understand the importance of a smooth browsing experience. Our website is designed with a clean and intuitive interface, allowing you to effortlessly search for books, explore different categories, and read detailed descriptions. Finding your next favorite book has never been easier.
    4. Secure Transactions: We prioritize the security and trust of our users. When you make a purchase on Book Bazaar, rest assured that our payment system is secure, protecting your personal and financial information. Additionally, we have a robust rating and review system, ensuring transparency and authenticity in every transaction.
    5. Community Engagement: Book Bazaar is not just a marketplace; it's a thriving community of book enthusiasts. Connect with fellow readers, join discussions about your favorite books, and discover recommendations from like-minded individuals. Let's foster a love for reading together!
    So whether you're an avid reader looking to expand your collection, a student in search of affordable textbooks, or a bookworm wanting to declutter your shelves, Book Bazaar is here for you. Join our ever-growing community and embark on a literary journey like no other.
    Happy reading!
    The Book Bazaar Team `;
const maxLength = 450;

export default function AboutUs() {
    const [showFullText, setShowFullText] = useState(false);
    
    const toggleTextDisplay = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div className="aboutUs-container">
            {showFullText ?
                text
                :  `${text.slice(0, maxLength)}...` }
            {showFullText ?
        <button className="linkButton" onClick={toggleTextDisplay}>Show less</button>
        :<button className="linkButton" onClick={toggleTextDisplay}>Show More</button>}
        </div>
    )
};

