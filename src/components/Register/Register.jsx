import WindowWithForm from "../WindowWithForm/WindowWithForm.jsx";
import Input from "../Input/Input.jsx";
import "./Register.css";

export default function Register() {
  return (
    <WindowWithForm
      heading={"Добро пожаловать!"}
      btnText={"Зарегистрироваться"}
      question={"Уже зарегистрированы?"}
      link={"/signin"}
      linkText={"Войти"}
      ariaLabel={"Регистрация аккаунта"}
      isError={false}
    >
      <Input
        name={"Имя"}
        inputId={"inputName"}
        inputType={"text"}
        placeholder={"Укажите ваше имя"}
        defaultValue={"Виталий"}
        min={2}
        max={30}
        errText={"Что-то пошло не так..."}
        isError={false}
      />
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
        defaultValue={"••••••••••••••"}
        min={6}
        isError={true}
        errText={"Что-то пошло не так..."}
      />
    </WindowWithForm>
  )
}