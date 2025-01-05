import BookManagement from "../../components/Books/BookManagement";

const MyBooksPage = () => {
  return (
    <main>
      <BookManagement isMyBooks={true} />
    </main>
  );
};

export default MyBooksPage;
