import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    handleConfirmartion;
    confirmationButton;
    constructor(handleConfirmation, popupSelector) {
        super(popupSelector);
        this.handleConfirmartion = handleConfirmation;
        this.confirmationButton = this.popupElement.querySelector(".popup__button");
    }
    handleButtonClick = () => {
        this.handleConfirmartion();
        this.close();
        this.popupElement.removeEventListener("click", this.handleButtonClick);
    };
    setEventListeners() {
        this.confirmationButton.addEventListener("click", this.handleButtonClick);
        this.popupElement.querySelector(".popup__close").addEventListener("click", this.close);
        this.popupElement.addEventListener("click", (evt) => {
            const click = evt.target;
            if (click.id === this.popupElement.id) {
                this.close();
            }
        });
        document.addEventListener("keydown", this.handleEscClose);
    }
}
