import React from "react";
import "./MoviesCard.css";

export default function MoviesCard({ movie: { nameRU, duration, image, key, trailerLink } }) {

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

  let isSavedMovie = false;
  let isRemoveMovies = false;

  return (
    <li className="movies-card" id={key}>
      <a href={trailerLink} target="_blank" rel="noreferrer" className="movies-card__trailer link">
      <div className="movies-card__info">
        <h2 className="movies-card__title">{nameRU}</h2>
        <p className="movies-card__duration">{convertMinutesToHours(duration)}</p>
      </div>
      <img src={image.url.startsWith("http")
        ? image.url
        : `https://api.nomoreparties.co${image.url}`} alt="Обложка фильма" className="movies-card__image" />
      <button className={`movies-card__btn btn ${isSavedMovie ? 'movies-card__btn_active' : isRemoveMovies ? 'movies-card__btn_remove' : ''}`} type="button" aria-label="Добавление или удаление в избранное"></button>
    </a>
  </li >
  )
}