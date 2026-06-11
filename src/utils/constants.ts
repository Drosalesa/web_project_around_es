export const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

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