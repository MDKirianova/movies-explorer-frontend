import React from "react";

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [inputChanged, setInputChanged] = React.useState(false);


  const handleChange = ({target}) => {
    const { name, value } = target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
    setInputChanged(true);
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setInputChanged(false);
    },
    [setValues, setErrors, setIsValid, setInputChanged]
  );

  return { values, handleChange, errors, isValid, resetForm, inputChanged };
}