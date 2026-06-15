import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, cardsContainer, cardTemplate, popupImageSelector, addCardBtn, editProfileBtn, newCardSelector, editProfileSelector, userSelector, delConfSelector, avatar, editAvatarSelector } from "./utils/constants.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { FormValidator } from "./components/FormValidator.js";
import { Api } from "./components/Api.js";
const userInfo = new UserInfo(userSelector);
const apiResponse = new Api("https://around-api.es.tripleten-services.com/v1/");
let apiUser;
let apiCards;
let cardList;
try {
    [apiUser, apiCards] = await Promise.all([
        apiResponse.getUser(),
        apiResponse.getCards(),
    ]);
    userInfo.setUserInfo({
        name: apiUser.name,
        description: apiUser.about,
        avatar: apiUser.avatar,
    });
    apiCards.reverse();
    cardList = new Section({
        items: apiCards,
        renderer: (item) => {
            const card = new Card(item, cardTemplate, () => {
                const popupImage = new PopupWithImage(item, popupImageSelector);
                popupImage.open();
                popupImage.setEventListeners();
            }, async () => {
                try {
                    const newInfo = await apiResponse.toggleLike(card.getCardInfo()._id, card.getCardInfo().isLiked);
                    card.updateCardInfo(newInfo);
                }
                catch (err) {
                    console.log(err);
                }
            }, () => {
                const confirmationPopup = new PopupWithConfirmation(async () => {
                    try {
                        await apiResponse.deleteCard(card.getCardInfo()._id);
                        card.removeCard();
                        confirmationPopup.close();
                    }
                    catch (err) {
                        console.log(err);
                    }
                }, delConfSelector);
                confirmationPopup.open();
                confirmationPopup.setEventListeners();
            });
            const cardElement = card.getCardElement();
            cardList.addItem(cardElement);
        },
    }, cardsContainer);
    cardList.renderItems();
}
catch (error) {
    console.error("Error al cargar datos iniciales:", error);
}
const newCardPopup = new PopupWithForm(async (data) => {
    newCardPopup.renderLoading(true);
    try {
        const card = new Card({
            name: data.name,
            link: data.link,
            isLiked: false,
            _id: "",
            owner: "",
            createdAt: ""
        }, cardTemplate, () => {
            const popupImage = new PopupWithImage({
                name: data.name,
                link: data.link
            }, popupImageSelector);
            popupImage.open();
            popupImage.setEventListeners();
        }, async () => {
            const newInfo = await apiResponse.toggleLike(card.getCardInfo()._id, card.getCardInfo().isLiked);
            card.updateCardInfo(newInfo);
            console.log(card.getCardInfo());
        }, () => {
            const confirmationPopup = new PopupWithConfirmation(() => {
                apiResponse.deleteCard(card.getCardInfo()._id);
                card.removeCard();
                confirmationPopup.close();
            }, delConfSelector);
            confirmationPopup.open();
            confirmationPopup.setEventListeners();
        });
        const cardElement = card.getCardElement();
        cardList.addItem(cardElement);
        const cardInfo = await apiResponse.postNewCard({
            name: data.name,
            link: data.link
        });
        card.updateCardInfo(cardInfo);
        newCardPopup.close();
        newCardPopup.resetForm();
    }
    catch (err) {
        console.log(err);
    }
    finally {
        newCardPopup.renderLoading(false);
    }
}, newCardSelector);
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardPopup.getForm());
addCardBtn?.addEventListener("click", () => {
    newCardPopup.open();
    newCardPopup.setEventListeners();
    newCardFormValidator.resetValidation();
    newCardFormValidator.enableValidation();
});
const editProfilePopup = new PopupWithForm(async (data) => {
    editProfilePopup.renderLoading(true);
    try {
        userInfo.setUserInfo({
            name: data.name,
            description: data.description,
            avatar: apiUser.avatar
        });
        await apiResponse.patchUser({
            name: data.name,
            description: data.description
        });
        editProfilePopup.close();
    }
    catch (err) {
        console.log(err);
    }
    finally {
        editProfilePopup.renderLoading(false);
    }
}, editProfileSelector);
const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfilePopup.getForm());
editProfileBtn?.addEventListener("click", () => {
    editProfilePopup.open();
    editProfilePopup.setEventListeners();
    editProfilePopup.fillForm(userInfo.getUserInfo());
    editProfileFormValidator.resetValidation();
    editProfileFormValidator.enableValidation();
});
const editAvatarForm = new PopupWithForm(async (data) => {
    editAvatarForm.renderLoading(true);
    try {
        await apiResponse.editAvatar(data.avatar);
        userInfo.setUserInfo({
            name: apiUser.name,
            description: apiUser.about,
            avatar: data.avatar,
        });
        editAvatarForm.close();
    }
    catch (err) {
        console.log(err);
    }
    finally {
        editAvatarForm.renderLoading(false);
    }
}, editAvatarSelector);
const editAvatarFormValidator = new FormValidator(defaultFormConfig, editAvatarForm.getForm());
avatar?.addEventListener("click", () => {
    editAvatarForm.open();
    editAvatarForm.setEventListeners();
    editAvatarFormValidator.resetValidation();
    editAvatarFormValidator.enableValidation();
});
