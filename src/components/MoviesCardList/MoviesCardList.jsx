import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import useWindowSize from "../../hooks/useWindowSize.js";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, savedMoviesPage }) {
  const [visibleCards, setVisibleCards] = React.useState(0);
  const totalCards = movies.length;
  const screenWidth = useWindowSize().width;

  const updateVisibleCards = React.useCallback(() => {
    let newVisibleCards;

    if (screenWidth >= 1280) {
      newVisibleCards = 12;
    } else if (screenWidth >= 768 && screenWidth <= 1279) {
      newVisibleCards = 8;
    } else if (screenWidth >= 481 && screenWidth <= 767) {
      newVisibleCards = 5;
    } else if (screenWidth >= 320 && screenWidth <= 480) {
      newVisibleCards = 5;
    }

    setVisibleCards(Math.min(newVisibleCards, totalCards));
  }, [screenWidth, totalCards]);

  
  const debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  React.useEffect(() => {
    const debouncedResize = debounce(() => {
      updateVisibleCards();
    }, 500);

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [updateVisibleCards]);
  
  React.useEffect(() => {
    updateVisibleCards();
  }, [updateVisibleCards]);
  
  const loadMoreCards = () => {
    if (screenWidth >= 1280) {
      setVisibleCards(visibleCards + 3);
    } else if (screenWidth >= 768) {
      setVisibleCards(visibleCards + 2);
    } else {
      setVisibleCards(visibleCards + 2);
    }
  };


  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__grid">
        {savedMoviesPage ?
          (movies.map((movie) => {
            return (
              <MoviesCard savedMoviesPage movie={movie} key={movie.id || movie.movieId} />
            )
          })
          ) : ((movies.slice(0, visibleCards).map((movie) => (
            <MoviesCard movie={movie} key={movie.id || movie.movieId} />
          ))))}
      </ul>
      {savedMoviesPage ? "" : (visibleCards < totalCards && (
        <button
          className="movies-card-list__more-btn btn"
          type="button"
          aria-label="Просмотр еще видео"
          onClick={loadMoreCards}
        >
          Ещё
        </button>
      ))}
    </section>
  );
}
