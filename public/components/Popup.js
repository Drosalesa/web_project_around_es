export class Popup {
    popupElement;
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
    }
    close = () => {
        this.popupElement.classList.remove("popup_is-opened");
    };
    handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
            document.removeEventListener("keydown", this.handleEscClose);
        }
    };
    setEventListeners() {
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
