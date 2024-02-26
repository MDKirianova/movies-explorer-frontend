import React from "react";
import WindowWithForm from "../WindowWithForm/WindowWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import Input from "../Input/Input.jsx";
import "./Login.css";

export default function Login({ onLogin, error }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    } );
  }

  return (
    <WindowWithForm
      onSubmit={handleSubmit}
      heading={"Рады видеть!"}
      btnText={"Войти"}
      question={"Ещё не зарегистрированы?"}
      link={"/signup"}
      linkText={"Регистрация"}
      ariaLabel={"Авторизация в аккаунте"}
      isValid={isValid}
      values={values}
      error={error}
    >
      <Input
        name={"email"}
        nameInput={"E-mail"}
        inputId={"inputEmail"}
        inputType={"email"}
        placeholder={"Укажите свою почту"}
        isError={!!errors["email"]}
        errText={errors["email"]}
        onChange={handleChange}
        value={values.email || ""}
        autoComplete={"on"}
        pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
      />
      <Input
        name={"password"}
        nameInput={"Пароль"}
        inputId={"inputPassword"}
        inputType={"password"}
        placeholder={"Укажите свой пароль"}
        min={5}
        isError={!!errors["password"]}
        errText={errors["password"]}
        onChange={handleChange}
        value={values.password || ""}
        autoComplete={"current-password"}
      />
    </WindowWithForm>)
}