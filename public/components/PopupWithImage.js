import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor({ link, name }, popupSelector) {
        super(popupSelector);
        this.popupElement.querySelector(".popup__image")?.setAttribute("src", link);
        this.popupElement.querySelector(".popup__image")?.setAttribute("alt", name);
        this.popupElement.querySelector(".popup__caption").textContent = name;
    }
}
