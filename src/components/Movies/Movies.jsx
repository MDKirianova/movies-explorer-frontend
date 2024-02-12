import React from "react";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Footer from "../Footer/Footer.jsx";
import Preloader from "../Preloader/Preloader.jsx";

export default function Movies({ movies, isLoading, isAuthorized, error }) {
  const initialFilter = JSON.parse(localStorage.getItem('is-checkbox-checked')) || false;
  const [isShortMoviesCheckboxChecked, setIsShortMoviesCheckboxChecked] = React.useState(initialFilter);

  const initialQuery = localStorage.getItem('search-query') || "";
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [currentSearchQuery, setCurrentSearchQuery] = React.useState(initialQuery);

  React.useEffect(() => {
    localStorage.setItem('search-query', searchQuery);
    localStorage.setItem('is-checkbox-checked', isShortMoviesCheckboxChecked);
  }, [searchQuery, isShortMoviesCheckboxChecked]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    setSearchQuery(currentSearchQuery);
  };

  const filteredMovies = movies
    .filter((movie) =>
      searchQuery
        ? movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
        : false
    )
    .filter((movie) => (isShortMoviesCheckboxChecked ? movie.duration <= 40 : true));

  const renderContent = () => {
    if (!searchQuery) {
      return null;
    }

    if (isLoading) {
      console.log(isLoading);
      return <Preloader />;
    }

    if (filteredMovies.length === 0 && !error) {
      return (
        <span className="movies-card-list__error_visible">
          По вашему запросу ничего не найдено
        </span>
      );
    }

    if (filteredMovies.length === 0 && error) {
      return <span className="movies-card-list__error_visible">{error}</span>;
    }

    return <MoviesCardList movies={filteredMovies} savedMoviesPage={false} />;
  }


  return (
    <>
      <header>
        <Header isAuthorized={isAuthorized} />
      </header>
      <main>
        <SearchForm
          searchQuery={currentSearchQuery}
          setSearchQuery={setCurrentSearchQuery}
          onSubmit={onSubmit}
          setIsShortMoviesChecked={setIsShortMoviesCheckboxChecked}
          isShortMoviesChecked={isShortMoviesCheckboxChecked}
        />
        {renderContent()}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}