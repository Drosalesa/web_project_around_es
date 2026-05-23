export class Card {
    cardTitle;
    cardImage;
    cardTemplate;
    cardElement;
    cardLikeBtn;
    cardDeleteBtn;
    handleCardClick;
    constructor(card, cardTemplateSelector, handleCardClick) {
        this.cardTemplate = document.querySelector(cardTemplateSelector);
        this.cardElement = this.cardTemplate.content.querySelector(".card").cloneNode(true);
        this.cardTitle = this.cardElement.querySelector(".card__title");
        this.cardTitle.textContent = card.name;
        this.cardImage = this.cardElement.querySelector(".card__image");
        this.cardImage.src = card.link;
        this.cardImage.alt = card.name;
        this.cardLikeBtn = this.cardElement.querySelector(".card__like-button");
        this.cardDeleteBtn = this.cardElement.querySelector(".card__delete-button");
        this.handleCardClick = handleCardClick;
    }
    setEventListeners() {
        this.cardLikeBtn.addEventListener("click", this.toggleLikeBtn);
        this.cardDeleteBtn.addEventListener("click", this.removeCard);
        this.cardImage.addEventListener("click", this.handleCardClick);
    }
    toggleLikeBtn = () => {
        this.cardLikeBtn.classList.toggle("card__like-button_is-active");
    };
    removeCard = () => {
        this.cardElement.remove();
    };
    getCardElement() {
        this.setEventListeners();
        return this.cardElement;
    }
}
//# sourceMappingURL=Card.js.map