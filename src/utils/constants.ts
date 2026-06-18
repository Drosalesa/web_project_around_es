export const defaultFormConfig = {
    inputSelector: ".popup__input",
    buttonSelector: ".popup__button",
    inputErrorClass: "popup__input_error",
    inputErrorMessageClass: "popup__error_active"
};

export const cardsContainer = ".cards__list"
export const cardTemplate = "#card__template"
export const popupImageSelector = "#image-popup"
export const editProfileBtn = document.querySelector(".profile__edit-button")
export const addCardBtn = document.querySelector(".profile__add-button")
export const newCardSelector = "#new-card-popup";
export const editProfileSelector = "#edit-popup";
export const delConfSelector = "#confirmation-popup";
export const editAvatarSelector = "#avatar-popup";

export const userSelector = {
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image"
};

export const avatar = document.querySelector(userSelector.avatarSelector);