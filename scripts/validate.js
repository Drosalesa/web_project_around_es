const showInputError = (input, errorMessage) => {
  const errorEl = input.parentElement.querySelector(
    `.popup__input_type_${input.name}_error`,
  );
  input.classList.add("popup__input_error_format");
  errorEl.textContent = errorMessage;
  errorEl.classList.add("popup__input_error_active");
};

const hideInputError = (input) => {
  const errorEl = input.parentElement.querySelector(
    `.popup__input_type_${input.name}_error`,
  );
  input.classList.remove("popup__input_error_format");
  errorEl.textContent = "Correcto";
  errorEl.classList.remove("popup__input_error_active");
};

function toggleFormButton(form, button) {
  if (form.checkValidity()) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function resetValidation(inputs) {
  inputs.forEach((input) => {
    hideInputError(input);
  });
}

function setEventListners(modal) {
  modal.addEventListener("click", (evt) => {
    if (evt.target.id === modal.id) {
      modal.classList.remove("popup_is-opened");
    }
  });
}

export {
  toggleFormButton,
  showInputError,
  hideInputError,
  resetValidation,
  setEventListners,
};
