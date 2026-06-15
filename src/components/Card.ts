import type { ApiCard } from "../types/types.ts";

type EventFunction = (evt: Event) => void;

export class Card {
    private cardTitle: HTMLElement;
    private cardImage: HTMLImageElement;
    private cardTemplate: HTMLTemplateElement;
    private cardElement!: HTMLElement;
    private cardLikeBtn: HTMLButtonElement;
    private cardDeleteBtn: HTMLButtonElement;
    private cardInfo: ApiCard;
    private handleCardClick: EventFunction;
    private handleLike: EventFunction;
    private handleRemove: EventFunction;

    constructor(
        card: ApiCard,
        cardTemplateSelector: string,
        handleCardClick: EventFunction,
        handleLike: EventFunction,
        handleRemove: EventFunction) {
        this.cardTemplate = document.querySelector(cardTemplateSelector) as HTMLTemplateElement;
        this.cardElement = this.cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;
        this.cardTitle = this.cardElement.querySelector(".card__title") as HTMLElement;
        this.cardTitle.textContent = card.name;
        this.cardImage = this.cardElement.querySelector(".card__image") as HTMLImageElement;
        this.cardImage.src = card.link;
        this.cardImage.alt = card.name;
        this.cardLikeBtn = this.cardElement.querySelector(".card__like-button") as HTMLButtonElement;
        this.cardDeleteBtn = this.cardElement.querySelector(".card__delete-button") as HTMLButtonElement;
        this.cardInfo = card;
        this.handleCardClick = handleCardClick;
        this.handleLike = handleLike;
        this.handleRemove = handleRemove;
    }

    private setEventListeners(): void {
        this.cardLikeBtn.addEventListener("click", (evt) => {
            this.handleLike(evt);
            this.toggleLikeBtn();
        });
        this.cardDeleteBtn.addEventListener("click", this.handleRemove);
        this.cardImage.addEventListener("click", this.handleCardClick)
    }

    private toggleLikeBtn = () => {
        this.cardLikeBtn.classList.toggle("card__like-button_is-active");
    }

    removeCard = () => {
        this.cardElement.remove();
    }

    getCardElement(): HTMLElement{
        if(this.cardInfo.isLiked) this.toggleLikeBtn();
        this.setEventListeners();
        return this.cardElement;
    }

    updateCardInfo(cardInfo: ApiCard) {
        this.cardInfo = cardInfo;
    }

    getCardInfo(): ApiCard {
        return this.cardInfo;
    }
}