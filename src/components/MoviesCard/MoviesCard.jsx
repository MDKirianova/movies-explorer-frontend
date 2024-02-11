import React from "react";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext.js"
import "./MoviesCard.css";

export default function MoviesCard({ movie, savedMoviesPage }) {
  const savedMoviesContext = React.useContext(SavedMoviesContext);

  function convertMinutesToHours(minutes) {
    if (typeof minutes !== 'number' || minutes < 0) {
      return 'Некорректное значение минут';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours.toString().padStart(1, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');

    return `${formattedHours}ч ${formattedMinutes}м`;
  }

  const handleSaveMovie = () => {
    savedMoviesContext.saveMovie(movie);
  };

  const handleDeleteMovie = () => {
    savedMoviesContext.deleteMovie(
      savedMoviesContext.savedMovies.find(
        (savedMovie) => savedMovie.id === movie.id
      ).savedId
    );
  };


  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <p className="movies-card__duration">{convertMinutesToHours(movie.duration)}</p>
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer" className="movies-card__trailer link">
        <img src={movie.image.url.startsWith("http")
          ? movie.image.url
          : `https://api.nomoreparties.co${movie.image.url}`} alt="Обложка фильма" className="movies-card__image" />
      </a>
    {
  savedMoviesPage
    ? (<button className="movies-card__btn movies-card__btn_remove btn" type="button" aria-label="Удаление видео из избранного" onClick={handleDeleteMovie}></button>)
    : savedMoviesContext.savedMovies.map((movie) => movie.id).includes(movie.id)
      ? (<button className=" movies-card__btn movies-card__btn_active btn" aria-label="Удаление видео из избранного на странице со всеми видео"  onClick={handleDeleteMovie} />)
      : (<button className="movies-card__btn btn" type="button" aria-label="Добавление видео в избранное" onClick={handleSaveMovie}></button>)
}
    </li>
  )
}
