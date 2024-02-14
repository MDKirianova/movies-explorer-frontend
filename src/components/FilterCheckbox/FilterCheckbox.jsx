import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ handleCheckbox, isShortMoviesChecked }) {

  const toggleShortMoviesCheckbox = ({ type, target }) => {
    let checked;
    if (type === "change") {
      checked = target.checked;
    }
    if (checked !== undefined) {
      handleCheckbox(checked);
    };
  }

  return (
    <label className="filter-checkbox" htmlFor="filter-movies">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        id="filter-movies"
        onChange={toggleShortMoviesCheckbox}
        defaultChecked={isShortMoviesChecked}
      />
      <span className="filter-checkbox__title">Короткометражки</span>
    </label>
  )
}