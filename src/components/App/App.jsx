import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Main from "../Main/Main.jsx";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import PageNotFound from "../PageNotFound/PageNotFound.jsx";
import InfoTooltipPopup from "../InfoTooltipPopup/InfoTooltipPopup.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as MoviesApi from "../../utils/MoviesApi.js";
import * as MainApi from "../../utils/MainApi.js";
import { movieMapper } from "../../utils/movieMapper.js";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState(localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")) : []);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = ({ name, email, password }) => {
    MainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password })
        setIsSuccessful(true);
        navigate("/movies", { replace: true })
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`);
        setIsSuccessful(false);
      })
      .finally(handleInfoTooltip);
  }

  const signOut = React.useCallback(() => {
    setLoggedIn(false);
    setCurrentUser(null);
    setSavedMovies([]);
    navigate("/", { replace: true });
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("search-query");
    localStorage.removeItem("is-checkbox-checked");
  }, [navigate]);

  const handleTokenCheck = React.useCallback(() => {
    let token = localStorage.getItem("token");
    if (token) {
      MainApi
        .getUserInfo(token)
        .then((user) => {
          if (user) {
            let userData = ({
              email: user.email,
              name: user.name,
            });
            setLoggedIn(true);
            setCurrentUser(userData);
          }
        })
        .catch((err) => {
          console.log(`Ошибка получения токена: ${err}`);
          signOut();
        })
    }
  }, [signOut]);

  const handleLogin = React.useCallback(({ email, password }) => {
    MainApi
      .login(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setIsSuccessful(true);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        handleTokenCheck();
      })
      .catch((err) => {
        console.log(`Ошибка авторизации: ${err}`);
        setIsSuccessful(false);
        handleInfoTooltip();
      })
  }, [navigate, handleTokenCheck])


  React.useEffect(() => {
    handleTokenCheck()
  }, [handleTokenCheck]);

  const handleInfoTooltip = () => {
    setIsInfoTooltipPopupOpen(true)
  }

  const closePopup = () => {
    setIsInfoTooltipPopupOpen(false);
  }

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
    // }
  }, [movies]);

  const handleSaveMovie = (movie) => {
    MainApi
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies(savedMovies.concat(movieMapper(res)));
      })
      .catch((err) => {
        console.log(`Ошибка при сохранении видео: ${err}`);
      });
  };

  const handleDeleteMovie = (id) => {
    MainApi
      .deleteMovie(id)
      .then(() => {
        const indexToRemove = savedMovies.findIndex(
          (movie) => movie.savedId === id
        );
        if (indexToRemove >= 0) {
          const result = [
            ...savedMovies.slice(0, indexToRemove),
            ...savedMovies.slice(indexToRemove + 1),
          ];
          setSavedMovies(result);
        }
      })
      .catch((err) => {
        console.log(`Ошибка при удалении видео из сохраненных: ${err}`);
      });
  };

  return (
    <SavedMoviesContext.Provider
      value={{
        savedMovies: savedMovies,
        saveMovie: handleSaveMovie,
        deleteMovie: handleDeleteMovie,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<ProtectedRoute
            isAutorized={loggedIn}
            element={Main}
          />} />
          <Route path="/movies" element={<ProtectedRoute
            isAutorized={loggedIn}
            isLoading={isLoading}
            element={Movies}
            movies={movies}
          />
          } />
          <Route path="/saved-movies" element={<ProtectedRoute
            isAutorized={loggedIn}
            element={SavedMovies}
            movies={savedMovies}
          />
          } />
          <Route path="/profile" element={<ProtectedRoute
            isAutorized={loggedIn}
            element={Profile}
            signOut={signOut} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltipPopup
          isSuccessful={isSuccessful}
          onClose={closePopup}
          isOpen={isInfoTooltipPopupOpen}
          name='tooltip'
        />
      </CurrentUserContext.Provider>
    </SavedMoviesContext.Provider>
  )
}

