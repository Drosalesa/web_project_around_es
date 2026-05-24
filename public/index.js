import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { initialCards, defaultFormConfig, cardsContainer, cardTemplate, popupImageSelector, addCardBtn, editProfileBtn, newCardSelector, editProfileSelector, userSelector } from "./utils/constants.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { FormValidator } from "./components/FormValidator.js";
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardTemplate, (evt) => {
            const popupImage = new PopupWithImage(item, popupImageSelector);
            popupImage.open();
            popupImage.setEventListeners();
        });
        const cardElement = card.getCardElement();
        cardList.addItem(cardElement);
    }
}, cardsContainer);
cardList.renderItems();
const newCardPopup = new PopupWithForm((data) => {
    const item = {
        name: data.name,
        link: data.link
    };
    const card = new Card(item, cardTemplate, (evt) => {
        const popupImage = new PopupWithImage(item, popupImageSelector);
        popupImage.open();
        popupImage.setEventListeners();
    });
    const cardElement = card.getCardElement();
    cardList.addItem(cardElement);
}, newCardSelector);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardPopup.getForm());
addCardBtn?.addEventListener("click", () => {
    newCardPopup.open();
    newCardFormValidator.resetValidation();
    newCardFormValidator.enableValidation();
    newCardPopup.setEventListeners();
});
const userInfo = new UserInfo(userSelector);
const editProfilePopup = new PopupWithForm((data) => {
    userInfo.setUserInfo(data.name, data.description);
}, editProfileSelector);
const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfilePopup.getForm());
editProfileBtn?.addEventListener("click", () => {
    editProfilePopup.open();
    editProfilePopup.fillForm(userInfo.getUserInfo());
    editProfileFormValidator.resetValidation();
    editProfileFormValidator.enableValidation();
    editProfilePopup.setEventListeners();
});
