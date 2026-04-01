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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
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

profileEditBtn.addEventListener("click", () =>
  handleOpenEditModal(profileEditModal),
);

profileEditModal.addEventListener("submit", handleProfileFormSubmit);
closeEditModalBtn.addEventListener("click", () => closeModal(profileEditModal));

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

profileAddBtn.addEventListener("click", () => openModal(profileAddModal));
closeAddModalBtn.addEventListener("click", () => closeModal(profileAddModal));
closeImageModal.addEventListener("click", () => closeModal(imageModal));

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(newCardTitleInput.value, newCardImageInput.value, cardContainer);
  closeModal(profileAddModal);
  newCardTitleInput.value = "";
  newCardImageInput.value = "";
}
profileAddModal.addEventListener("submit", handleCardFormSubmit);
