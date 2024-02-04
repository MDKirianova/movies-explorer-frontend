import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm() {

  return (
    <form className="search-form" name="searcform" noValidate>
      <div className="search-form__input-wrapper">
        <input className="search-form__input" type="text" placeholder="Фильм" required />
        <button className="search-form__btn btn" type="submit" aria-label="Поиск фильмов по тексту">Поиск</button>
      </div>
      <FilterCheckbox />
    </form>
  )
}