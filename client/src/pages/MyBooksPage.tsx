import React from "react";
import BookManagement from "../components/BookManagement";

const MyBooksPage = () => {
  return (
    <main>
      <BookManagement isMyBooks={true} />
    </main>
  );
};

export default MyBooksPage;
