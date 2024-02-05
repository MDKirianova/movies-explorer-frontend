import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./WindowWithForm.css";

export default function WindowWithForm({ heading, btnText, question, link, linkText, ariaLabel, isError, children }) {
  return (
    <main className="window-form">
      <NavLink to={"/"}><img src={logo} alt="Логотип сайта про диплом" className="window-form__logo link" /></NavLink>
      <h1 className="window-form__title">{heading}</h1>
      <form className="window-form__form" >
        <div className="window-form__fieldset">
          {children}
        </div>
        <button className={`window-form__form-btn btn ${isError && "btn_disabled"} || "" `} aria-label={ariaLabel}>{btnText}</button>
      </form>
      <div className="window-form__link-element">
        <p className="window-form__question">{question}</p>
        <NavLink to={link} className="window-form__link link">{linkText}</NavLink>
      </div>
    </main>
  )
}