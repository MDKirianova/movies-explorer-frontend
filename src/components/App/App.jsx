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
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState(localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")) : []);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState("");
  const navigate = useNavigate();

  const handleRegister = ({ email, password, name }) => {
    MainApi
      .register(email, password, name)
      .then(() => {
        handleLogin({ email, password })
        setIsSuccessful(true);
        navigate("/movies", { replace: true })
        setErrorMessages("");
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`);
        setIsSuccessful(false);
        setErrorMessages(err);
      })
      .finally(handleInfoTooltip);
  }

  React.useEffect(() => {
    if (loggedIn) {
      MainApi
        .getSavedMovies().then((res) => {
          setSavedMovies(res.map(movieMapper));
        });
    }
  }, [loggedIn]);

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
      setLoggedIn(true);
      MainApi
        .getUserInfo(token)
        .then((user) => {
          if (user) {
            let userData = ({
              email: user.email,
              name: user.name,
            });
            setCurrentUser(userData);
          }
        })
        .catch((err) => {
          console.log(`Ошибка получения токена: ${err}`);
          signOut();
        })
        .finally(() => {
          setIsAuthChecking(false)
        })
    } else {
      setIsAuthChecking(false);
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
        setErrorMessages("");
      })
      .catch((err) => {
        console.log(`Ошибка авторизации: ${err}`);
        setIsSuccessful(false);
        setErrorMessages(err);
        handleInfoTooltip();
      })
  }, [navigate])


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
    if (loggedIn && movies.length === 0) {
      setIsLoading(true);
      MoviesApi
        .getMovies()
        .then((res) => {
          setMovies(res);
          localStorage.setItem("movies", JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
          setErrorMessages('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [movies, loggedIn]);

  const handleUpdateUser = (data) => {
    MainApi
      .setUserInfo(data.name, data.email)
      .then((user) => {
        setCurrentUser(user);
        setErrorMessages("");
        setIsSuccessful(true);
      })
      .catch((err) => {
        setErrorMessages(err);
        console.log(`Ошибка при редактировании профиля пользователя: ${err}`);
      })
      .finally(handleInfoTooltip);
  }

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
          <Route path="/" element={<Main
            isAuthorized={loggedIn}
          />} />
          <Route path="/movies" element={<ProtectedRoute
            isAuthorized={loggedIn}
            isAuthChecking={isAuthChecking}
            isLoading={isLoading}
            element={Movies}
            movies={movies}
            error={errorMessages}
          />
          } />
          <Route path="/saved-movies" element={<ProtectedRoute
            isAuthorized={loggedIn}
            isAuthChecking={isAuthChecking}
            element={SavedMovies}
            movies={savedMovies}
          />
          } />
          <Route path="/profile" element={<ProtectedRoute
            isAuthorized={loggedIn}
            isAuthChecking={isAuthChecking}
            element={Profile}
            signOut={signOut}
            onUpdateUser={handleUpdateUser}
            error={errorMessages} />} />
          <Route path="/signin" element={<Login
            onLogin={handleLogin}
            error={errorMessages} />} />
          <Route path="/signup" element={<Register
            onRegister={handleRegister}
            error={errorMessages} />} />
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

