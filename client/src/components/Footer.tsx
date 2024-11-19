import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto text-center space-y-6">
        {/* Footer Links and Information */}
        <div className="space-y-4">
          <p className="text-lg font-semibold">&copy; 2024 Book Management App</p>
          <p className="text-sm text-gray-400">Built with ❤️ using React and TailwindCSS</p>
        </div>

        <div className="flex justify-center space-x-6 text-sm text-gray-300">
          <Link to="/about" className="hover:text-pink-500 hover:underline transition-colors duration-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-pink-500 hover:underline transition-colors duration-300">
            Contact
          </Link>
        </div>

        {/* Developer Information */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Developed by</p>
          <a href="https://www.linkedin.com/in/harit-tilavat-8a6888214/" target="_blank" rel="noopener noreferrer" className="text-pink-500 font-medium hover:underline transition-colors duration-300">
            Harit Tilavat
          </a>
        </div>

        {/* Website Link */}
        <div>
          <a href="https://hariitilavat.web.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-pink-500 hover:underline transition-colors duration-300">
            Visit My Website
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
