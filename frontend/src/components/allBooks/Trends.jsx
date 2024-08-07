import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";
import Spinner from "../Spinner";

const Trends = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const PORT = "https://mern-bookstore-6hsv.onrender.com";

  useEffect(() => {
    axios
      .get(`${PORT}/books`)
      .then(async (response) => {
        const allBooks = response.data.data;
        const booksWithRatings = await Promise.all(
          allBooks.map(async (book) => {
            const ratingResponse = await axios.get(
              `${PORT}/books/${book._id}/averageRating`
            );
            return {
              ...book,
              averageRating: ratingResponse.data.averageRating,
            };
          })
        );
        const trendingBooks = booksWithRatings
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 8);

        setBooks(trendingBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-[#1c1a1a] flex flex-grow flex-col items-center justify-center">
      <BackButton />
      <div className="mx-auto mt-5"></div>
      <div className="flex-grow w-full my-8 mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Trending Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <Link key={book._id} to={`/books/details/${book._id}`}>
              <div className="bg-yellow-500 p-4 rounded-lg shadow-md flex flex-col h-[400px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="flex flex-grow overflow-hidden rounded-lg justify-center ">
                  <img
                    src={book.imageA}
                    alt={book.title}
                    className=" items-center  top-0  w-3/4 h-full object-cover rounded-lg border-2 border-gray-700"
                  />
                </div>
                <div className="mt-4 flex flex-col justify-between">
                  <div>
                    <p className="text-blue-600 font-bold text-center md:text-md sm:text-sm mb-1">
                      <span className="text-white font-serif">
                        {truncateText(book.author, 20)}
                      </span>
                    </p>
                    <h3 className="font-semibold text-center md:text-md sm:text-sm h-10 overflow-hidden">
                      {truncateText(book.title, 30)}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center mt-2">
                    <FaStar className="text-blue-500 mr-1 text-sm" />
                    <span className="text-white md:text-md sm:text-xs font-bold">
                      {book.averageRating
                        ? book.averageRating.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trends;
