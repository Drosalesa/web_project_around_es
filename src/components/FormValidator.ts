export class FormValidator {
    private inputList: NodeListOf<HTMLInputElement>;
    private submitFormButton: HTMLButtonElement;
    private formElement: HTMLFormElement;
    private inputErrorClass: string;
    private inputErrorMessageClass: string;
    
    constructor ({
      inputSelector,
      buttonSelector,
      inputErrorClass,
      inputErrorMessageClass}: {
        inputSelector: string,
        buttonSelector: string,
        inputErrorClass: string,
        inputErrorMessageClass: string},
      formElement: HTMLFormElement ) {
        
        this.formElement = formElement;
        this.submitFormButton = this.formElement.querySelector(buttonSelector)!;
        this.inputErrorClass = inputErrorClass;
        this.inputErrorMessageClass = inputErrorMessageClass;
        this.inputList = this.formElement.querySelectorAll(inputSelector);
      }

    private showInputError = ( 
      input: HTMLInputElement,
      errorMessage: string): void => {
      const errorEl = input.parentElement?.querySelector(
        `.popup__error_${input.name}`,
      );

      if(!errorEl) return;

      input.classList.add(this.inputErrorClass);
      errorEl.textContent = errorMessage;
      errorEl.classList.add(this.inputErrorMessageClass);
    };

    private hideInputError = (input: HTMLInputElement): void => {
      const errorEl = input.parentElement?.querySelector(
        `.popup__error_${input.name}`,
      );

      if(!errorEl) return;

      input.classList.remove(this.inputErrorClass);
      errorEl.textContent = "";
      errorEl.classList.remove(this.inputErrorMessageClass);
    };

    private toggleFormButton(): void {
      if (this.formElement.checkValidity()) {
        this.submitFormButton.disabled = false;
      } else {
        this.submitFormButton.disabled = true;
      }
    };

    private validateForm = ({target}: InputEvent): void => {
      const input = target as HTMLInputElement;

      input.validity.valid
        ? this.hideInputError(input)
        : this.showInputError(input, input.validationMessage);
  
      this.toggleFormButton();
    };

    private setEventListeners(): void {
      this.inputList.forEach((input) => {
        input.addEventListener("input", this.validateForm);
      });
    }

    resetValidation(): void {
      this.inputList.forEach((input) => {
        this.hideInputError(input);
      });
      this.toggleFormButton();
    };

    enableValidation(): void {
      this.setEventListeners();
    }
}