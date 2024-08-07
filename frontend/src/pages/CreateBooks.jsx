import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../config";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBooks = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    imageA: "",
    imageB: "",
    bookOverview: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    setLoading(true);
    axios
      .post(`${API_URL}/books`, book)
      .then(() => {
        setLoading(false);
        toast.success("Book Created Successfully");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("An error happened. Please check console");
        console.error("Error creating book:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  return (
    <div className="p-4 bg-[#332b12]">
      <BackButton />
      <h1 className="text-3xl my-4 text-white text-center">Create a Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full md:w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Publish Year</label>
          <input
            type="number"
            name="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">
            Enter related image address initial
          </label>
          <input
            type="url"
            name="imageA"
            value={book.imageA}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">
            Enter related image address secondary
          </label>
          <input
            type="url"
            name="imageB"
            value={book.imageB}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-white">Book Overview</label>
          <textarea
            name="bookOverview"
            value={book.bookOverview}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full h-24"
            placeholder="Write a brief overview of the book..."
          />
        </div>
        <button
          className="p-2 bg-yellow-500 hover:bg-red-600 m-8 rounded-md"
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateBooks;
