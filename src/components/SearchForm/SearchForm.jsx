import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm({ searchQuery, setSearchQuery, onSubmit, isShortMoviesChecked, setIsShortMoviesChecked, savedMoviesPage }) {
  const [isSearchFormValid, setIsSearchFormValid] = React.useState(true);


  const handleCheckbox = () => {
    setIsShortMoviesChecked(!isShortMoviesChecked);
  }

  const handleChangeInput = (evt) => {
    setSearchQuery(evt.target.value);
  }

  const handleSubmit = (evt) => {
    if (!savedMoviesPage) {
      if (searchQuery === "") {
        evt.preventDefault();
        setIsSearchFormValid(false);
      } else {
        setIsSearchFormValid(true);
      }
    }
    
  }

  // const handleSubmit = (evt) => {
  //   if (!savedMoviesPage && searchQuery !== "") {
  //     localStorage.setItem('search-query', searchQuery);
  //     setIsSearchFormValid(true);
  //   } else if (!savedMoviesPage && searchQuery === "") {
  //     localStorage.removeItem('search-query');
  //     setIsSearchFormValid(false);
  //   } else if (searchQuery !== "") {
  //     setIsSearchFormValid(true);
  //   } else {
  //     setIsSearchFormValid(false);
  //   }
  // }

  return (
    <form noValidate className="search-form" name="searcform" onSubmit={onSubmit} >
      <div className="search-form__input-wrapper">
        <input className="search-form__input" type="text" value={searchQuery} placeholder="Фильм" onChange={handleChangeInput} required />
        <button className="search-form__btn btn" type="submit" aria-label="Поиск фильмов по тексту" onClick={handleSubmit}>Поиск</button>
      </div>
      <span className={`error ${!isSearchFormValid && "error_visible error_input"} || "" `}>
        Нужно ввести ключевое слово
      </span>
      <FilterCheckbox handleCheckbox={handleCheckbox} isShortMoviesChecked={isShortMoviesChecked} />
    </form>
  )
}