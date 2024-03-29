import React from "react";
import Header from "../Header/Header.jsx"
import Promo from "../Promo/Promo.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import Techs from "../Techs/Techs.jsx";
import AboutMe from "../AboutMe/AboutMe.jsx";
import Portfolio from "../Portfolio/Portfolio.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Main({isAuthorized}) {
  return (
    <>
      <header>
        <Header blueColor isAuthorized={isAuthorized} />
      </header>
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}