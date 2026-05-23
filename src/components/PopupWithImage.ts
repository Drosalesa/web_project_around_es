import { Popup } from "./Popup.js";
import type { CardData } from "../types/types";

export class PopupWithImage extends Popup {
    
    constructor({link, name}: CardData, popupSelector: string) {
        super(popupSelector);
        this.popupElement.querySelector(".popup__image")?.setAttribute("src", link);
        this.popupElement.querySelector(".popup__image")?.setAttribute("alt", link);
        this.popupElement.querySelector(".popup__caption")!.textContent = name;
    }
}