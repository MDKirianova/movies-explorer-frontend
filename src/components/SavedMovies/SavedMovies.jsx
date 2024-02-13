import React from "react";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Footer from "../Footer/Footer.jsx";

export default function SavedMovies({ movies, isAuthorized }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isShortMoviesCheckboxChecked, setIsShortMoviesChecked] = React.useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = React.useState("");


  const onSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(currentSearchQuery);
  };

  const filteredMovies = movies
    .filter((movie) =>
      searchQuery
        ? movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((movie) => (isShortMoviesCheckboxChecked ? movie.duration <= 40 : true));

  return (
    <>
      <header>
        <Header isAuthorized={isAuthorized} />
      </header>
      <main>
        <SearchForm
          searchQuery={currentSearchQuery}
          setSearchQuery={setCurrentSearchQuery}
          setIsShortMoviesChecked={setIsShortMoviesChecked}
          isShortMoviesChecked={isShortMoviesCheckboxChecked}
          onSubmit={onSubmit}
          savedMoviesPage
        />
        
        <MoviesCardList
          savedMoviesPage
          movies={filteredMovies} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}