import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import PageNotFound from "../PageNotFound/PageNotFound.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as MoviesApi from "../../utils/MoviesApi.js"

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState([]);
  const [movies, setMovies] = React.useState(localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")) : []);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const navigate = useNavigate();

  const signOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('movies');
    localStorage.removeItem('search-query');
    localStorage.removeItem('is-checkbox-checked');
    navigate("/", { replace: true });
  };

  React.useEffect(() => {
        if (movies.length === 0) {
          setIsLoading(true);
          MoviesApi
            .getMovies()
            .then((res) => {
              setMovies(res);
              localStorage.setItem("movies", JSON.stringify(res));
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsLoading(false);
            })
        }
  }, [searchQuery, movies])
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={
        <ProtectedRoute
          loggedIn={loggedIn}
          isLoading={isLoading}
          element={Movies}
          movies={movies}
        />
      } />
      <Route path="/saved-movies" element={
        <ProtectedRoute
          loggedIn={loggedIn}
          element={SavedMovies}
          movies={savedMovies}
        />
      } />
      <Route path="/profile" element={<Profile
        signOut={signOut} />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

