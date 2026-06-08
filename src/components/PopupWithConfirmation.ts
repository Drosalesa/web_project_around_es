import { Popup } from "./Popup.js"

export class PopupWithConfirmation extends Popup {
    private handleConfirmartion: () => void;
    private confirmationButton: HTMLButtonElement;

    constructor(handleConfirmation: () => void, popupSelector: string){
        super(popupSelector);
        this.handleConfirmartion = handleConfirmation;
        this.confirmationButton = this.popupElement.querySelector(".popup__button") as HTMLButtonElement;
    }

    private handleButtonClick = () => {
        this.handleConfirmartion();
        this.close();
        this.popupElement.removeEventListener("click", this.handleButtonClick);
    }

    setEventListeners() {
        this.confirmationButton.addEventListener("click", this.handleButtonClick);
        this.popupElement.querySelector(".popup__close")!.addEventListener("click", this.close);
        this.popupElement.addEventListener("click", (evt: Event) => {
        
        const click = evt.target as HTMLElement;

        if (click.id === this.popupElement.id) {
            this.close();
        }
        });
        document.addEventListener("keydown", this.handleEscClose);
    }
}