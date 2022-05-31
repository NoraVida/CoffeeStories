function FormInput({
  labelText,
  labelClass,
  type,
  name,
  id,
  value = '',
  inputClass,
  handleOnChange,
  errorMessages = [],
  wasValidated = false,
}) {
  function getValidationClass() {
    let className = "";
    if (wasValidated) {
      if (errorMessages.length === 0) {
        className = "is-valid";
      } else {
        className = "is-invalid";
      }
    }
    return className;
  }

  return (
    <div className="mb-2">
       <label htmlFor={id} className={labelClass}>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={inputClass + " " + getValidationClass()}
        onChange={handleOnChange}
        value={value}
      ></input>
      <div className={"invalid-feedback"}>
        {errorMessages.length === 1 ? (
          <>{errorMessages[0]}</>
        ) : (
          <ul>
            {errorMessages.map((errorMessage) => (
              <li key={errorMessage}>{errorMessage}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FormInput;