import React from "react";
import Header from "../Header/Header.jsx";
import "./Profile.css";

export default function Profile({signOut}) {

  const [isSaveFormBtnVisible, setIsSaveFormBtnVisible] = React.useState(false);
  const [name, setName] = React.useState("Виталий");
  const [email, setEmail] = React.useState("pochta@yandex.ru");

  let isError = false;

  const handleEditProfile = () => {
    setIsSaveFormBtnVisible(true);
  }

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__title">Привет, {name}!</h1>
        <form className="profile__form" noValidate>
          <fieldset className="profile__fieldset">
            <label className="profile__input-label" htmlFor="input-name">Имя</label>
            <input
              type="text"
              className="profile__input"
              id="input-name"
              minLength="2"
              maxLength="30"
              defaultValue={name}
              placeholder="Имя"
              disabled={isSaveFormBtnVisible ? false : true}
              onChange={handleChangeName}
              required />
            <div className="profile__border-line"></div>
            <label className="profile__input-label" htmlFor="input-email">E-mail</label>
            <input
              type="email"
              className="profile__input"
              id="input-email"
              defaultValue={email}
              placeholder="E-mail"
              disabled={isSaveFormBtnVisible ? false : true}
              onChange={handleChangeEmail}
              required />
          </fieldset>
          <div className="profile__actions">
            {
              isSaveFormBtnVisible ? (<>
                <span className={`profile__error ${isError && "profile__error_visible"} || "" `} id="profile-error">При обновлении профиля произошла ошибка.</span>
                <button className={`profile__save-form-btn ${isError && "btn_disabled"} || "" `} type="submit" aria-label="Сохранение профиля">Сохранить</button>
              </>
              ) : (
                <button className="profile__edit-form-btn btn" type="button" onClick={handleEditProfile} aria-label="Редактирование профиля">Редактировать</button>
              )
            }
          </div>
        </form>
        {isSaveFormBtnVisible ? ("") : (<button className="profile__exit-btn btn" type="button" onClick={signOut} aria-label="Выход из профиля">Выйти из аккаунта</button>)}
      </section>
    </>
  )
}