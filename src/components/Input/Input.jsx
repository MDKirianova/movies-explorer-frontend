import "./Input.css";


export default function Input({ name, nameInput, inputId, inputType, defaultValue, placeholder, min, max, onChange, autoComplete, isError, errText, pattern }) {
  return (
    <div className="input">
      <label
        htmlFor={inputId}
        className="input__label"
        >
        {nameInput}
      </label>
      <input
        name={name}
        type={inputType}
        className={`input__class ${isError && "input__class_error"} || "" `}
        id={inputId}
        defaultValue={defaultValue}
        placeholder={placeholder}
        minLength={min}
        maxLength={max}
        onChange={onChange}
        autoComplete={autoComplete}
        pattern={pattern}
        />
      <span
        className={`error ${isError && "error_visible error_input"} || "" `}
        id={inputId+"-error"}>
        {errText}
      </span>
    </div>

  )
}