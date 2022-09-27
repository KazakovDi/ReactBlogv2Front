import "./main.scss"
import React from "react";
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header/Header";
import FullPost from "./pages/FullPost";
import AddPost from "./pages/AddPost";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/createPost" element={<AddPost />} />
        <Route path="/createPost/:id" element={<AddPost />} />
      </Routes>
    </>
  );
}

export default App;
