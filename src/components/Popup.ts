export class Popup {
    protected popupElement: HTMLElement;

    constructor (popupSelector: string) {
        this.popupElement = document.querySelector(popupSelector) as HTMLElement;
    } 

    open(): void {
        this.popupElement.classList.add("popup_is-opened");
    }

    close = (): void => {
        this.popupElement.classList.remove("popup_is-opened");
    }

    protected handleEscClose = (evt: KeyboardEvent): void => {
        if (evt.key === "Escape") {
        this.close();
        document.removeEventListener("keydown", this.handleEscClose);
        }
    }

    setEventListeners(): void {
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