import React from "react";
import { NavLink } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound({navBack}) {
  return (
    <main className="page-not-found">
      <div className="page-not-found__wrapper">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      </div>
      <NavLink to={"/"} className="page-not-found__link link">Назад</NavLink>
    </main>
  )
}