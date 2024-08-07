import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const MessageList = ({ toggleMessages }) => {
  const [messages, setMessages] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const PORT = "https://mern-bookstore-6hsv.onrender.com";

  useEffect(() => {
    fetchMessages();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${PORT}/messages/getmessage`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`${PORT}/messages/deletemessage/${messageId}`);
      setMessages(messages.filter((message) => message._id !== messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 650);
  };

  const truncateID = (id, maxLength) => {
    if (isSmallScreen && id.length > maxLength) {
      return id.substring(0, maxLength) + "...";
    }
    return id;
  };

  if (messages.length === 0) {
    return (
      <div className="container mx-auto p-4 ">
        <p className="text-white font-bold text-center">No messages found.</p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-4"
          onClick={toggleMessages}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 h-full overflow-y-auto ">
      <h2 className="text-white text-2xl mb-4 font-bold text-center bg-slate-500 py-2 rounded">
        Messages
      </h2>
      <ul className="divide-y divide-gray-800 ">
        {messages.map((message) => (
          <li
            key={message._id}
            className="bg-slate-600 rounded-lg shadow-md mb-4 "
          >
            <div
              className={`flex ${
                isSmallScreen ? "flex-col" : "flex-row"
              } items-start p-4 border-4 border-yellow-500 rounded-md`}
            >
              <div
                className={`text-black w-full ${
                  isSmallScreen ? "mb-4" : "mr-4"
                } md:mb-0 md:mr-4 flex-1`}
              >
                <p className="bg-slate-300 p-2 rounded mb-2 border-2 border-black sm:text-xs md:text-sm lg:text-lg">
                  <strong>🛂</strong>{" "}
                  <span className={isSmallScreen ? "truncate-id" : ""}>
                    {truncateID(message.sender, 10)}
                  </span>
                </p>
                <p className="bg-slate-300 p-2 rounded mb-2 border-2 border-black sm:text-xs md:text-sm lg:text-lg">
                  <strong>👤</strong> {message.recipient}
                </p>
                <p className="bg-yellow-500 p-2 rounded mb-2 border-2 border-black font-serif font-bold sm:text-xs md:text-sm lg:text-lg">
                  <strong>💬</strong> {message.content}
                </p>
                <p className="bg-green-300 p-2 rounded border-2 border-black sm:text-xs md:text-sm lg:text-lg">
                  <strong>🕗</strong>{" "}
                  {new Date(message.sentAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div
              className={`flex items-center justify-${
                isSmallScreen ? "center" : "end"
              } mt-2`}
            >
              <button
                onClick={() => deleteMessage(message._id)}
                className="flex items-center bg-red-600 hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                <FaExclamationTriangle className="mr-2" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="bg-red-600 hover:bg-yellow-800 text-white py-2 px-4 rounded mt-4"
        onClick={toggleMessages}
      >
        Close
      </button>
    </div>
  );
};

export default MessageList;
