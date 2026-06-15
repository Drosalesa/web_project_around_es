export class Card {
    cardTitle;
    cardImage;
    cardTemplate;
    cardElement;
    cardLikeBtn;
    cardDeleteBtn;
    cardInfo;
    handleCardClick;
    handleLike;
    handleRemove;
    constructor(card, cardTemplateSelector, handleCardClick, handleLike, handleRemove) {
        this.cardTemplate = document.querySelector(cardTemplateSelector);
        this.cardElement = this.cardTemplate.content.querySelector(".card").cloneNode(true);
        this.cardTitle = this.cardElement.querySelector(".card__title");
        this.cardTitle.textContent = card.name;
        this.cardImage = this.cardElement.querySelector(".card__image");
        this.cardImage.src = card.link;
        this.cardImage.alt = card.name;
        this.cardLikeBtn = this.cardElement.querySelector(".card__like-button");
        this.cardDeleteBtn = this.cardElement.querySelector(".card__delete-button");
        this.cardInfo = card;
        this.handleCardClick = handleCardClick;
        this.handleLike = handleLike;
        this.handleRemove = handleRemove;
    }
    setEventListeners() {
        this.cardLikeBtn.addEventListener("click", (evt) => {
            this.handleLike(evt);
            this.toggleLikeBtn();
        });
        this.cardDeleteBtn.addEventListener("click", this.handleRemove);
        this.cardImage.addEventListener("click", this.handleCardClick);
    }
    toggleLikeBtn = () => {
        this.cardLikeBtn.classList.toggle("card__like-button_is-active");
    };
    removeCard = () => {
        this.cardElement.remove();
    };
    getCardElement() {
        if (this.cardInfo.isLiked)
            this.toggleLikeBtn();
        this.setEventListeners();
        return this.cardElement;
    }
    updateCardInfo(cardInfo) {
        this.cardInfo = cardInfo;
    }
    getCardInfo() {
        return this.cardInfo;
    }
}
