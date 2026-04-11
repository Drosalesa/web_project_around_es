const initialCards = [
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

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-popup");
const closeEditModalBtn = profileEditModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = profileEditModal.querySelector(
  ".popup__input_type_name",
);
const profileDescInput = profileEditModal.querySelector(
  ".popup__input_type_description",
);
const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");
const cardContainer = document.querySelector(".cards__list");

const profileAddBtn = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector("#new-card-popup");
const closeAddModalBtn = profileAddModal.querySelector(".popup__close");
const newCardTitleInput = profileAddModal.querySelector(
  ".popup__input_type_card-name",
);
const newCardImageInput = profileAddModal.querySelector(
  ".popup__input_type_url",
);
const imageModal = document.querySelector("#image-popup");
const closeImageModal = imageModal.querySelector(".popup__close");
const popUpImage = imageModal.querySelector(".popup__image");
const popUpCaption = imageModal.querySelector(".popup__caption");

const editProfileForm = document.forms.editProfileForm;
const editProfileInputs = editProfileForm.querySelectorAll(".popup__input");
const saveProfileBtn = profileEditModal.querySelector(".popup__button");
const newCardForm = document.forms.newCardForm;
const newCardInputs = newCardForm.querySelectorAll(".popup__input");
const saveCardBtn = profileAddModal.querySelector(".popup__button");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  cleanInputs(modal.querySelectorAll(".popup__input"));
}

function fillProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescInput.value = profileDescription.textContent;
}

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescInput.value;
  closeModal(profileEditModal);
}

function setEventListners() {
  profileEditBtn.addEventListener("click", () => {
    handleOpenEditModal(profileEditModal);
    toggleFormButton(editProfileForm, saveProfileBtn);
  });
  profileEditModal.addEventListener("submit", handleProfileFormSubmit);
  closeEditModalBtn.addEventListener("click", () => {
    closeModal(profileEditModal);
  });
  profileAddBtn.addEventListener("click", () => {
    newCardForm.reset();
    openModal(profileAddModal);
    toggleFormButton(newCardForm, saveCardBtn);
  });
  closeAddModalBtn.addEventListener("click", () => {
    closeModal(profileAddModal);
  });
  closeImageModal.addEventListener("click", () => closeModal(imageModal));
  profileAddModal.addEventListener("submit", handleCardFormSubmit);
  editProfileInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
        toggleFormButton(editProfileForm, saveProfileBtn);
      } else {
        hideInputError(input);
        toggleFormButton(editProfileForm, saveProfileBtn);
      }
    });
  });
  newCardInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
        toggleFormButton(newCardForm, saveCardBtn);
      } else {
        hideInputError(input);
        toggleFormButton(newCardForm, saveCardBtn);
      }
    });
  });
  profileEditModal.addEventListener("click", (evt) => {
    if (evt.target.id === "edit-popup") {
      closeModal(profileEditModal);
    }
  });
  profileAddModal.addEventListener("click", (evt) => {
    if (evt.target.id === "new-card-popup") {
      closeModal(profileAddModal);
    }
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(profileAddModal);
      closeModal(profileEditModal);
    }
  });
}

function getCardElement(
  name = "Sin título",
  link = "../images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardLikeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  });
  cardDeleteBtn.addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });
  cardImage.addEventListener("click", () => {
    popUpImage.setAttribute("src", link);
    popUpImage.setAttribute("alt", name);
    popUpCaption.textContent = name;
    openModal(imageModal);
  });
  return cardElement;
}

function renderCard(name, link, container) {
  const cardEl = getCardElement(name, link);
  container.prepend(cardEl);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardContainer);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(newCardTitleInput.value, newCardImageInput.value, cardContainer);
  closeModal(profileAddModal);
  newCardTitleInput.value = "";
  newCardImageInput.value = "";
}

setEventListners();

import {
  toggleFormButton,
  showInputError,
  hideInputError,
  cleanInputs,
} from "./validate.js";
