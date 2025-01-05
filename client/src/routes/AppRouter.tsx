import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Home from "../pages/HomePage";
import Layout from "../pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import AddBook from "../pages/Books/AddBookPage";
import BookDetails from "../pages/Books/BookDetailsPage";
import EditBookDetails from "../pages/Books/EditBookPage";
import MyReviewsPage from "../pages/Reviews/MyReviewsPage";
import MyBooksPage from "../pages/Books/MyBooksPage";
import MyDraftsPages from "../pages/Drafts/MyDraftsPages";
import AddDraftPage from "../pages/Drafts/AddDraftPage";
import EditDraftPage from "../pages/Drafts/EditDraftPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book-detail/:id" element={<BookDetails />}></Route>

        {/* Protected routes */}
        <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-book/:id"
          element={
            <ProtectedRoute>
              <EditBookDetails />
            </ProtectedRoute>
          }></Route>

        <Route
          path="/my-reviews"
          element={
            <ProtectedRoute>
              <MyReviewsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-books"
          element={
            <ProtectedRoute>
              <MyBooksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-drafts"
          element={
            <ProtectedRoute>
              <MyDraftsPages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-draft"
          element={
            <ProtectedRoute>
              <AddDraftPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-draft/:id"
          element={
            <ProtectedRoute>
              <EditDraftPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
