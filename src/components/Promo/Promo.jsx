import React from "react";
import { Link } from "react-router-dom";
import landingLogo from "../../images/landing_logo_main.png";
import ScrollToAnchor from "../ScrollToAnchor/ScrollToAnchor.jsx";
import "./Promo.css";

export default function Promo() {
  
  return (
    <section className="promo">
      <div>
        <h1 className="promo__title-main">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__subtitle-main">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <ScrollToAnchor />
        <Link to="/#diploma" className="promo__main-btn btn" >Узнать больше</Link>
      </div>
      <img src={landingLogo} alt="Заглавная картинка web" className="promo__img-main"/>
    </section >
  )
}