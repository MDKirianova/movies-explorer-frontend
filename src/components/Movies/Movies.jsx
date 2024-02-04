import React from "react";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Movies() {
  return (
    <>
      <main>
        <Header />
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  )
}