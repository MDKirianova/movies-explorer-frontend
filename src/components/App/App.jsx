import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import PageNotFound from "../PageNotFound/PageNotFound.jsx";

export default function App() {
  const navigate = useNavigate();

  const signOut = () => {
    navigate("/", { replace: true });
  };

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/saved-movies" element={<SavedMovies />} />
      <Route path="/profile" element={<Profile
        signOut={signOut} />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

