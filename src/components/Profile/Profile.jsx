import React from "react";
import Header from "../Header/Header.jsx";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

export default function Profile({ signOut, isAuthorized, onUpdateUser, error }) {
  const { values, handleChange, errors, isValid, resetForm, inputChanged } =
    useFormWithValidation();
  const [isSaveFormBtnVisible, setIsSaveFormBtnVisible] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const disabledButton =
    (values.name === currentUser.name && values.email === currentUser.email) ||
    !isValid || !inputChanged;

  const isError = Object.keys(errors).length > 0;

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const handleEditProfile = () => {
    setIsSaveFormBtnVisible(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <>
      <header>
        <Header isAuthorized={isAuthorized} />
      </header>
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form noValidate className="profile__form" >
          <fieldset className="profile__fieldset">
            <label className="profile__input-label" htmlFor="input-name">Имя</label>
            <input
              name="name"
              aria-label="Имя"
              type="text"
              className="profile__input"
              id="input-name"
              minLength="2"
              maxLength="30"
              value={values.name || ""}
              placeholder="Имя"
              disabled={isSaveFormBtnVisible ? false : true}
              onChange={handleChange}
              required />
            <div className="profile__border-line"></div>
            <label className="profile__input-label" htmlFor="input-email">E-mail</label>
            <input
              name="email"
              aria-label="Почта"
              type="email"
              className="profile__input"
              id="input-email"
              value={values.email || ""}
              placeholder="E-mail"
              disabled={isSaveFormBtnVisible ? false : true}
              onChange={handleChange}
              pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
              required />
          </fieldset>
          <div className="profile__actions">
            {
              isSaveFormBtnVisible ? (<>
                <span className={`error ${isError && "error_visible error_for-btn"} || "" `} id="profile-error">{Object.values(errors)} {error}</span>
                <button className={`profile__save-form-btn btn ${disabledButton && "btn_disabled"}`} disabled={disabledButton ? true : false} type="submit" aria-label="Сохранение профиля" onClick={handleSubmit}>Сохранить</button>
              </>
              ) : (
                <button className="profile__edit-form-btn btn" type="button" onClick={handleEditProfile} aria-label="Редактирование профиля">Редактировать</button>
              )
            }
          </div>
        </form>
        {isSaveFormBtnVisible ? ("") : (<button className="profile__exit-btn btn" type="button" onClick={signOut} aria-label="Выход из профиля">Выйти из аккаунта</button>)}
      </main>
    </>
  )
}

