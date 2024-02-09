import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
// import { useLocation } from "react-router-dom";


export default function MoviesCardList({ movies, searchQuery }) {
  // const location = useLocation();
  // const urlSavedMovies = location.pathname === "/saved-movies";
  
  // if (searchQuery.length !== 0 && movies.length === 0) {
  //   return (
  //     <span className="input__error_visible">
  //       По вашему запросу ничего не найдено
  //     </span>
  //   )
  // }

  // if (urlSavedMovies && movies.length === 0) {
  //   return (
  //     <span className="input__error_visible">
  //       Нет сохранённых фильмов
  //     </span>
  //   )
  // }


  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__grid">
        {movies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={movie.movieId}
            />
          );
        })}
      </ul>
      <button className="movies-card-list__more-btn btn" type="button" aria-label="Просмотр еще видео">Ещё</button>
    </section>
  )
}