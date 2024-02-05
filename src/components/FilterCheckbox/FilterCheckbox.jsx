import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox() {
  return (
    <label className="filter-checkbox" htmlFor="filter-movies">
      <input className="filter-checkbox__input" type="checkbox" id="filter-movies" />
      <span className="filter-checkbox__title">Короткометражки</span>
    </label>
  )
}