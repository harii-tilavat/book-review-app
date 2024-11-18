import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary state to simulate login

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">BookReview</Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        {isLoggedIn && (
          <Link to="/add-book" className="hover:text-blue-500">
            Add Book
          </Link>
        )}
      </div>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative">
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-8 h-8 rounded-full" />
              <span>John Doe</span>
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link>
              <button onClick={() => setIsLoggedIn(false)} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
