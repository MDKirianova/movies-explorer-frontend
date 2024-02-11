import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, savedMoviesPage }) {
  const [visibleCards, setVisibleCards] = React.useState(0);
  const totalCards = movies.length;
  const screenWidth = window.innerWidth;

  const updateVisibleCards = React.useCallback(() => {
    let newVisibleCards;

    if (screenWidth >= 1280) {
      newVisibleCards = 12;
    } else if (screenWidth >= 768 && screenWidth <= 1279) {
      newVisibleCards = 8;
    } else if (screenWidth >= 480 && screenWidth <= 767) {
      newVisibleCards = 5;
    } else if (screenWidth >= 320 && screenWidth <= 479) {
      newVisibleCards = 5;
    } else {
      newVisibleCards = 5;
    }

    setVisibleCards(Math.min(newVisibleCards, totalCards));
  }, [screenWidth, totalCards]);


  React.useEffect(() => {
    const handleResize = () => {
      updateVisibleCards();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateVisibleCards]);

  React.useEffect(() => {
    updateVisibleCards();
  }, [movies, updateVisibleCards]);

  const loadMoreCards = () => {
    if (screenWidth >= 1280) {
      setVisibleCards(Math.min(visibleCards + 3, totalCards));
    } else if (screenWidth >= 768) {
      setVisibleCards(Math.min(visibleCards + 2, totalCards));
    } else {
      setVisibleCards(Math.min(visibleCards + 2, totalCards));
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



// import React from "react";
// import MoviesCard from "../MoviesCard/MoviesCard.jsx";
// import "./MoviesCardList.css";


// export default function MoviesCardList({ movies, searchQuery }) {


//   return (
//     <section className="movies-card-list">
//       <ul className="movies-card-list__grid">
//         {movies.map((movie) => {
//           return (
//             <MoviesCard
//               movie={movie}
//               key={movie.movieId}
//             />
//           );
//         })}
//       </ul>
//       <button className="movies-card-list__more-btn btn" type="button" aria-label="Просмотр еще видео">Ещё</button>
//     </section>
//   )
// }