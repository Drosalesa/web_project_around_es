export class FormValidator {
    inputList;
    submitFormButton;
    formElement;
    inputErrorClass;
    inputErrorMessageClass;
    constructor({ inputSelector, buttonSelector, inputErrorClass, inputErrorMessageClass }, formElement) {
        this.formElement = formElement;
        this.submitFormButton = this.formElement.querySelector(buttonSelector);
        this.inputErrorClass = inputErrorClass;
        this.inputErrorMessageClass = inputErrorMessageClass;
        this.inputList = this.formElement.querySelectorAll(inputSelector);
    }
    showInputError = (input, errorMessage) => {
        const errorEl = input.parentElement?.querySelector(`.popup__error_${input.name}`);
        if (!errorEl)
            return;
        input.classList.add(this.inputErrorClass);
        errorEl.textContent = errorMessage;
        errorEl.classList.add(this.inputErrorMessageClass);
    };
    hideInputError = (input) => {
        const errorEl = input.parentElement?.querySelector(`.popup__error_${input.name}`);
        if (!errorEl)
            return;
        input.classList.remove(this.inputErrorClass);
        errorEl.textContent = "";
        errorEl.classList.remove(this.inputErrorMessageClass);
    };
    toggleFormButton() {
        if (this.formElement.checkValidity()) {
            this.submitFormButton.disabled = false;
        }
        else {
            this.submitFormButton.disabled = true;
        }
    }
    ;
    validateForm = ({ target }) => {
        const input = target;
        input.validity.valid
            ? this.hideInputError(input)
            : this.showInputError(input, input.validationMessage);
        this.toggleFormButton();
    };
    setEventListeners() {
        this.inputList.forEach((input) => {
            input.addEventListener("input", this.validateForm);
        });
    }
    resetValidation() {
        this.inputList.forEach((input) => {
            this.hideInputError(input);
        });
        this.toggleFormButton();
    }
    ;
    enableValidation() {
        this.setEventListeners();
    }
}
//# sourceMappingURL=FormValidator.js.map