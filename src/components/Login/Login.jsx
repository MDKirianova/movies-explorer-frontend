import WindowWithForm from "../WindowWithForm/WindowWithForm.jsx";
import Input from "../Input/Input.jsx";
import "./Login.css";

export default function Login() {
  return (
    <WindowWithForm
      heading={"Рады видеть!"}
      btnText={"Войти"}
      question={"Ещё не зарегистрированы?"}
      link={"/signup"}
      linkText={"Регистрация"}
      ariaLabel={"Авторизация в аккаунте"}
      isError={false}
    >
      <Input
        name={"E-mail"}
        inputId={"inputEmail"}
        inputType={"email"}
        placeholder={"Укажите свою почту"}
        defaultValue={"pochta@yandex.ru"}
        isError={false}
        errText={"Что-то пошло не так..."}
      />
      <Input
        name={"Пароль"}
        inputId={"inputPassword"}
        inputType={"password"}
        placeholder={"Укажите свой пароль"}
        defaultValue={""}
        min={6}
        isError={false}
        errText={"Что-то пошло не так..."}
      />
    </WindowWithForm>)
}