import { useState } from "react";
import { omit } from "lodash";

const useForm = (callback) => {
  // Form values
  const [values, setValues] = useState({});
  // Errors
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({});

  const validate = (value, regex) => {
    return new RegExp(regex).test(value);
  };

  // A method to handle form inputs
  const handleChange = (event) => {
    // To stop default events
    if (typeof event.persist === "function") {
      event.persist();
    }

    const { name } = event.target;
    const val = event.target.value;
    if (formData[name]) {
      const { regex } = formData[name];
      const { validationMessage } = formData[name];
      const isValid = validate(val, regex);
      if (!isValid) {
        setErrors({
          ...errors,
          [name]: validationMessage,
        });
      } else {
        const newObj = omit(errors, name);
        setErrors(newObj);
      }
    }
    // Let's set these values in state
    setValues({
      ...values,
      [name]: val,
    });
  };

  const initValues = (initData) => {
    const valueObj = {};
    let errorObj = {};
    setFormData(initData);

    for (const key of Object.keys(initData)) {
      const obj = initData[key];
      if (obj.regex) {
        const isValid = validate(obj.value, obj.regex);
        if (!isValid) {
          errorObj[key] = obj.validationMessage;
        } else {
          const newObj = omit(errorObj, key);
          errorObj = newObj;
        }
      }
      // Let's set these values in state
      valueObj[key] = obj.value;
    }
    setErrors(errorObj);
    setValues(valueObj);
  };

  const updateValue = (val) => {
    setValues({
      ...values,
      ...val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      console.error("There is an Error in form!", errors);
    }
  };

  return {
    values,
    errors,
    initValues,
    handleChange,
    updateValue,
    handleSubmit,
    validate,
    setValues,
  };
};

export default useForm;
