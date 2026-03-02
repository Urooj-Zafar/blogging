import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useState } from "react";

import Nav from "./Components/Nav";
import Model from "./Components/Model";
import SignUp from "./Components/SignUp";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Blogs from "./Pages/Blogs";
import BlogDetail from "./Pages/BlogDetail";
import Categories from "./Pages/Categories";
import Contact from "./Pages/Contact";
import CreateBlog from "./Pages/CreateBlog";
import CreateCategories from "./Pages/CreateCategories";
import Footer from "./Components/Footer";

export default function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  const token = localStorage.getItem("token");      // check if user is logged in
  const user = JSON.parse(localStorage.getItem("user")); // get user info
  const isLogin = !!token;                           // true if logged in
  return (
    <BrowserRouter>
      <Nav openSignIn={openSignIn} />

      <Routes>
        {!isLogin && (
          <Route path="*" element={<Model />} />
        )}
        {isLogin && (
          <>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/createblog/:id" element={<CreateBlog />} />
        <Route path="/createCategories" element={<CreateCategories />} />
        <Route path="/createCategories/:id" element={<CreateCategories />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        </>
        )}

      </Routes>

      {isSignInOpen && (
        <Model
          closeModal={closeSignIn}
          openSignUp={() => {
            closeSignIn(); // close SignIn
            openSignUp(); // open SignUp modal
          }}
        />
      )}

      {isSignUpOpen && <SignUp closeModal={closeSignUp} />}

      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}
