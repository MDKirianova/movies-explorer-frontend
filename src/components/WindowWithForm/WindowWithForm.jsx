import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./WindowWithForm.css";

export default function WindowWithForm({ heading, btnText, question, link, linkText, ariaLabel, isValid, children, onSubmit, values, error }) {
  let isError = Object.keys(error).length > 0;

  return (
    <main className="window-form">
      <NavLink to={"/"}><img src={logo} alt="Логотип сайта про диплом" className="window-form__logo link" /></NavLink>
      <h1 className="window-form__title">{heading}</h1>
      <form noValidate className="window-form__form" onSubmit={onSubmit}>
        <div className="window-form__fieldset">
          {children}
        </div>
        <div>
        <span className={`error ${isError && "error_visible error_for-btn"} || "" `}>{error}</span>
        <button className={`window-form__form-btn btn ${(!isValid || !values.email || !values.password) && "btn_disabled"}`} aria-label={ariaLabel} disabled={!isValid || !values.email || !values.password}>{btnText}</button></div>
      </form>
      <div className="window-form__link-element">
        <p className="window-form__question">{question}</p>
        <NavLink to={link} className="window-form__link link">{linkText}</NavLink>
      </div>
    </main>
  )
}