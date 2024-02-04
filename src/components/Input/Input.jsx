import "./Input.css";

export default function Input({ name, inputId, inputType, defaultValue, placeholder, min, max, onChange,isError, errText }) {
  return (
    <div className="input">
      <label
        htmlFor={inputId}
        className="input__label"
        required>
        {name}
      </label>
      <input
        type={inputType}
        className={`input__class ${isError && "input__class_error"} || "" `}
        id={inputId}
        defaultValue={defaultValue}
        placeholder={placeholder}
        minLength={min}
        maxLength={max}
        onChange={onChange}
        required />
      <span
        className={`input__error ${isError && "input__error_visible"} || "" `}
        id={inputId+"-error"}>
        {errText}
      </span>
    </div>

  )
}