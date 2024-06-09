import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2 hover:cursor-pointer   ">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md bg-slate-200">
            No
          </th>
          <th className="border border-slate-600 rounded-md bg-slate-200">
            Title
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden bg-slate-200">
            Author
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden bg-slate-200">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md  bg-slate-200">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8 bg-gray-300">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {book.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.author}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {book.publishYear}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800 hover:scale-125" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600 hover:scale-125" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600 hover:scale-125" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
