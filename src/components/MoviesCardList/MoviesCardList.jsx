import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";
import {cards} from "../../utils/cards.js"


export default function MoviesCardList() {

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__grid">
        {cards.map((card) => {
          return (
            <MoviesCard 
              key={card.movieId}
              card={card}
            />
          );
        })}
      </ul>
      <button className="movies-card-list__more-btn btn" type="button" aria-label="Просмотр еще видео">Ещё</button>
    </section>
  )
}