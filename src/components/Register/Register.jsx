import WindowWithForm from "../WindowWithForm/WindowWithForm.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import Input from "../Input/Input.jsx";
import "./Register.css";

export default function Register({ onRegister, error }) {
  
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  }
  return (
    <WindowWithForm
      onSubmit={handleSubmit}
      heading={"Добро пожаловать!"}
      btnText={"Зарегистрироваться"}
      question={"Уже зарегистрированы?"}
      link={"/signin"}
      linkText={"Войти"}
      ariaLabel={"Регистрация аккаунта"}
      isValid={isValid}
      values={values}
      error={error}
    >
      <Input
        name={"name"}
        nameInput={"Имя"}
        inputId={"inputName"}
        inputType={"text"}
        placeholder={"Укажите ваше имя"}
        defaultValue={"Виталий"}
        min={2}
        max={30}
        isError={!!errors["name"]}
        errText={errors["name"]}
        onChange={handleChange}
        value={values.name || ""}
        autoComplete={"on"}
      />
      <Input
        name={"email"}
        nameInput={"E-mail"}
        inputId={"inputEmail"}
        inputType={"email"}
        placeholder={"Укажите свою почту"}
        defaultValue={"pochta@yandex.ru"}
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
        defaultValue={"••••••••••••••"}
        min={5}
        isError={!!errors["password"]}
        errText={errors["password"]}
        onChange={handleChange}
        value={values.password || ""}
        autoComplete={"current-password"}
      />
    </WindowWithForm>
  )
}