import React, { createContext, useContext, useState } from "react";
import GenreModel from "../_models/GenreModel";
import BaseProps from "../utils/types/BaseProps";
interface BookContextProps {
  genres: Array<GenreModel>;
  setGenres: (genres: Array<GenreModel>) => void;
}

const BookContext = createContext<BookContextProps>({ genres: [], setGenres: () => {} });

const BookContextProvider: React.FC<BaseProps> = ({ children }) => {
  const [genreList, setGenreList] = useState<Array<GenreModel>>([]);
  const setGenres = (genres: Array<GenreModel>) => {
    setGenreList(genres);
  };
  return <BookContext.Provider value={{ genres: genreList, setGenres }}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
export const useBook = () => useContext(BookContext);
