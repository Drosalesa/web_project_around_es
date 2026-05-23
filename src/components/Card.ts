import type { CardData } from "../types/types";

type EventFunction = (evt: Event) => void;

export class Card {
    private cardTitle: HTMLElement;
    private cardImage: HTMLImageElement;
    private cardTemplate: HTMLTemplateElement;
    private cardElement!: HTMLElement;
    private cardLikeBtn: HTMLButtonElement;
    private cardDeleteBtn: HTMLButtonElement;
    private handleCardClick: EventFunction;

    constructor(
        card: CardData,
        cardTemplateSelector: string,
        handleCardClick: EventFunction) {
        this.cardTemplate = document.querySelector(cardTemplateSelector) as HTMLTemplateElement;
        this.cardElement = this.cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;
        this.cardTitle = this.cardElement.querySelector(".card__title") as HTMLElement;
        this.cardTitle.textContent = card.name;
        this.cardImage = this.cardElement.querySelector(".card__image") as HTMLImageElement;
        this.cardImage.src = card.link;
        this.cardImage.alt = card.name;
        this.cardLikeBtn = this.cardElement.querySelector(".card__like-button") as HTMLButtonElement;
        this.cardDeleteBtn = this.cardElement.querySelector(".card__delete-button") as HTMLButtonElement;
        this.handleCardClick = handleCardClick;
    }

    private setEventListeners(): void {
        this.cardLikeBtn.addEventListener("click", this.toggleLikeBtn)
        this.cardDeleteBtn.addEventListener("click", this.removeCard)
        this.cardImage.addEventListener("click", this.handleCardClick)
    }

    private toggleLikeBtn = () => {
        this.cardLikeBtn.classList.toggle("card__like-button_is-active");
    }

    private removeCard = () => {
        this.cardElement.remove();
    }

    getCardElement(): HTMLElement{
        this.setEventListeners();
        return this.cardElement;
    }
}