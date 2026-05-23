import { Popup } from "./Popup.js";
import type { FormValues } from "../types/types.js";
import type { UserValues } from "../types/types.js";

export class PopupWithForm extends Popup {
    private handleFormSubmit: (data: FormValues) => void;
    private inputList: NodeListOf<HTMLInputElement>;
    private popupForm: HTMLFormElement;

    constructor(handleFormSubmit: (data: FormValues) => void, popupSelector: string) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.popupForm = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
        this.inputList = this.popupForm.querySelectorAll(".popup__input");
    }

    private getInputValues(): FormValues {
        const formValues: FormValues = {};
        this.inputList.forEach((input) => {
            formValues[input.name] = input.value; 
        });
        return formValues;
    }

    private handleSubmit = (evt: SubmitEvent) => {
        evt.preventDefault();
        this.handleFormSubmit(this.getInputValues());
        this.popupForm.reset();
        this.close();
        this.popupForm.removeEventListener("submit", this.handleSubmit);
    }

    setEventListeners(): void {
        this.popupElement.querySelector(".popup__close")!.addEventListener("click", this.close);
        this.popupElement.addEventListener("click", (evt: Event) => {
        
        const click = evt.target as HTMLElement;

        if (click.id === this.popupElement.id) {
            this.close();
        }
        });
        this.popupForm.addEventListener("submit", this.handleSubmit);
        document.addEventListener("keydown", this.handleEscClose);
    }

    getForm(): HTMLFormElement {
        return this.popupForm;
    }

    close = (): void => {
        this.popupElement.classList.remove("popup_is-opened");
        this.popupForm.reset();
        this.popupForm.removeEventListener("submit", this.handleSubmit);
    }

    fillForm(values: UserValues) {
        this.inputList.forEach((input) => {
            input.value = values[input.name]!;
        });
    }
}