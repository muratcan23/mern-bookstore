import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4 bg-[#F5F5DC] min-h-screen flex flex-col justify-center items-center">
      <BackButton />
      <h1 className="text-3xl my-4 text-center font-bold">Delete This Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-full max-w-md p-8 mx-auto">
        <h3 className="text-2xl text-center">
          Are You Sure You want to delete this book?
        </h3>
        <button
          className="p-4 bg-red-600 text-white mt-8 w-full hover:bg-red-900"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
