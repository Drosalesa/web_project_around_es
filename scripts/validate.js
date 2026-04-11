const showInputError = (input, errorMessage) => {
  const errorEl = input.parentElement.querySelector(
    `.${input.name}__input-error`,
  );
  input.classList.add("popup__input-error");
  errorEl.textContent = errorMessage;
  errorEl.classList.add("form__input-error-active");
};

const hideInputError = (input) => {
  const errorEl = input.parentElement.querySelector(
    `.${input.name}__input-error`,
  );
  input.classList.remove("popup__input-error");
  errorEl.textContent = "Correcto";
  errorEl.classList.remove("form__input-error-active");
};

function toggleFormButton(form, button) {
  if (form.checkValidity()) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function cleanInputs(inputs) {
  inputs.forEach((input) => {
    hideInputError(input);
  });
}

export { toggleFormButton, showInputError, hideInputError, cleanInputs };
