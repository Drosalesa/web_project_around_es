import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    handleFormSubmit;
    inputList;
    popupForm;
    popupButton;
    constructor(handleFormSubmit, popupSelector) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.popupForm = this.popupElement.querySelector(".popup__form");
        this.inputList = this.popupForm.querySelectorAll(".popup__input");
        this.popupButton = this.popupForm.querySelector(".popup__button");
    }
    getInputValues() {
        const formValues = {};
        this.inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        this.handleFormSubmit(this.getInputValues());
        this.popupForm.removeEventListener("submit", this.handleSubmit);
    };
    setEventListeners() {
        this.popupElement.querySelector(".popup__close").addEventListener("click", this.close);
        this.popupElement.addEventListener("click", (evt) => {
            const click = evt.target;
            if (click.id === this.popupElement.id) {
                this.close();
            }
        });
        this.popupForm.addEventListener("submit", this.handleSubmit);
        document.addEventListener("keydown", this.handleEscClose);
    }
    getForm() {
        return this.popupForm;
    }
    close = () => {
        this.popupElement.classList.remove("popup_is-opened");
        this.popupForm.reset();
        this.popupForm.removeEventListener("submit", this.handleSubmit);
    };
    fillForm(values) {
        this.inputList.forEach((input) => {
            input.value = values[input.name];
        });
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this.popupButton.textContent = "Guardando...";
        }
        else {
            this.popupButton.textContent = "Guardar";
        }
    }
    resetForm() {
        this.popupForm.reset();
    }
}
