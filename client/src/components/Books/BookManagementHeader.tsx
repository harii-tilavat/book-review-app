import React, { FormEvent } from "react";
import { sortByOptions } from "../../models/BookModel";
import Button from "../comman/Button";
import { useNavigate } from "react-router-dom";
import useBookStore from "../../store/useBookStore";

interface BookManagementHeaderProps {
  onFilterChange: (event: FormEvent, identifier: string) => void;
}
const BookManagementHeader: React.FC<BookManagementHeaderProps> = ({ onFilterChange }) => {
  const { genres } = useBookStore();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 space-y-4 md:space-y-0 gap-3">
      <h2 className="text-2xl font-bold">Book Management</h2>
      <div className="flex flex-col lg:flex-row  items-start lg:items-center  gap-3">
        {/* Filter by Genre */}
        <div>
          <label htmlFor="filter-genre" className="sr-only">
            Filter by Genre
          </label>
          <select id="filter-genre" className="block rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2 resize-none w-64" onChange={(event) => onFilterChange(event, "genreId")}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
            {/* Add more genres as needed */}
          </select>
        </div>

        {/* Sort by Options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div>
            <label htmlFor="sort-books" className="sr-only">
              Select Sort By
            </label>
            <select id="sort-books" className="block rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2 resize-none w-64" onChange={(event) => onFilterChange(event, "sortField")}>
              <option value="">Select Sort By</option>
              {sortByOptions.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort-order" className="sr-only">
              Select Order
            </label>
            <select id="sort-order" className="block rounded-md border border-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm px-2 py-2 resize-none w-48" onChange={(event) => onFilterChange(event, "sortOrder")}>
              {/* <option value="">Select Order</option> */}
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Add New Book Button */}
        <Button onClick={() => navigate("/add-book")}>Add New Book</Button>
      </div>
    </div>
  );
};

export default BookManagementHeader;
