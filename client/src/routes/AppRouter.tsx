import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/HomePage";
import Layout from "../pages/Layout";
import ProtectedRoute from "./ProtectedRoute";
import AddBook from "../pages/AddBookPage";
import BookDetails from "../pages/BookDetailsPage";
import MyReviews from "../pages/MyReviewsPage";
import EditBookDetails from "../pages/EditBookPage";
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
          }
        ></Route>

        <Route
          path="/my-reviews"
          element={
            <ProtectedRoute>
              <MyReviews />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
