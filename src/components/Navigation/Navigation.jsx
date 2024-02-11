import React from "react";
import { NavLink } from "react-router-dom";
import profile from "../../images/profile.svg";
import burger_logo from "../../images/burger_logo.svg";
import "./Navigation.css";

export default function Navigation({isAutorized}) {

  const [isModalWindowOpen, setModalWindowOpen] = React.useState(false);

  const handleBurgerClick = () => {
    setModalWindowOpen(true);
  }

  const closeModalWindow = () => {
    setModalWindowOpen(false);
  }

  return (
    <div className="navigation">
      {
        isAutorized ? (
          <div className="navigation__user">
            <nav className="navigation__desktop">
              <ul className="navigation__links">
                <li><NavLink to={"/movies"} className={({ isActive }) => (`navigation__link link ${isActive && 'navigation__link_active'} || ""`)}>Фильмы</NavLink></li>
                <li><NavLink to={"/saved-movies"} className={({ isActive }) => (`navigation__link link ${isActive && 'navigation__link_active'} || ""`)}>Сохранённые фильмы</NavLink></li>
              </ul>
              <NavLink to={"/profile"}><img src={profile} alt="Кнопка профиля юзера" className="navigation__profile-btn btn" /></NavLink>
            </nav>
            <nav className="navigation__mobile navigation__fade ">
              <img src={burger_logo} alt="Бургер для мобильной навигации" className="navigation__profile-burger" onClick={handleBurgerClick} />
            </nav>
          </div>) : (
          <ul className="navigation__guest">
            <li><NavLink to={"/signup"} className="navigation__link-register link">Регистрация</NavLink></li>
            <li><NavLink to={"/signin"} className="navigation__login-btn btn">Войти</NavLink></li>
          </ul>)
      }
      {
        isModalWindowOpen ? (<section className="navigation__modal-window" >
          <button type="button" aria-label="Кнопка для скрытия попапа" className="navigation__modal-close-btn btn" onClick={closeModalWindow} />
          <ul className="navigation__links">
            <li><NavLink to={"/"} className={({ isActive }) => (`navigation__link link ${isActive && 'navigation__link_active'} || ""`)} onClick={closeModalWindow}>Главная</NavLink></li>
            <li><NavLink to={"/movies"} className={({ isActive }) => (`navigation__link link ${isActive && 'navigation__link_active'} || ""`)} onClick={closeModalWindow}>Фильмы</NavLink></li>
            <li><NavLink to={"/saved-movies"} className={({ isActive }) => (`navigation__link link ${isActive && 'navigation__link_active'} || ""`)} onClick={closeModalWindow}>Сохранённые фильмы</NavLink></li>
          </ul>
          <NavLink to={"/profile"} className="navigation__profile-btn btn" onClick={closeModalWindow}><img src={profile} alt="Кнопка профиля юзера" /></NavLink>
        </section>) : (null)

      }
    </div>

  )
}