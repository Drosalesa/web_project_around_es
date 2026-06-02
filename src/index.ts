import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { initialCards, 
  defaultFormConfig, 
  cardsContainer, 
  cardTemplate, 
  popupImageSelector,
  addCardBtn,
  editProfileBtn,
  newCardSelector,
  editProfileSelector,
  userSelector } from "./utils/constants.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import type { CardData } from "./types/types.js";
import type { FormValues } from "./types/types.js";
import type { UserValues } from "./types/types.js";
import { FormValidator } from "./components/FormValidator.js";
import { Api } from "./components/Api.js";

/*const cardList = new Section<CardData> ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      cardTemplate,
      () => {
        const popupImage = new PopupWithImage(item, popupImageSelector)
        popupImage.open();
        popupImage.setEventListeners();
      }
    );
    const cardElement = card.getCardElement();
    cardList.addItem(cardElement);
  }
},
cardsContainer
);

cardList.renderItems();*/
const userInfo = new UserInfo (userSelector);

const apiResponse = new Api("https://around-api.es.tripleten-services.com/v1/");

try {
  const apiUser = await apiResponse.getUser();
  userInfo.setUserInfo({
    name: apiUser.name,
    description: apiUser.about,
    avatar: apiUser.avatar
  });

  const apiCards = await apiResponse.getCards();
  const cardList = new Section<CardData> ({
  items: apiCards,
  renderer: (item) => {
    const card = new Card(
      item, 
      cardTemplate,
      () => {
        const popupImage = new PopupWithImage(item, popupImageSelector)
        popupImage.open();
        popupImage.setEventListeners();
      }
    );
    const cardElement = card.getCardElement();
    cardList.addItem(cardElement);
  }
},
cardsContainer
);

cardList.renderItems();

const newCardPopup = new PopupWithForm((data: FormValues) => {
  
  const card = new Card(
    {
      name: data.name,
      link: data.link
    },
    cardTemplate,
    () => {
      const popupImage = new PopupWithImage({
      name: data.name,
      link: data.link
    }, popupImageSelector)
      popupImage.open();
      popupImage.setEventListeners();
    });
    const cardElement = card.getCardElement();
    cardList.addItem(cardElement);
  }, newCardSelector
);

const newCardFormValidator = new FormValidator(
    defaultFormConfig,
    newCardPopup.getForm()
);

addCardBtn?.addEventListener("click", () => {
  newCardPopup.open();
  newCardFormValidator.resetValidation();
  newCardFormValidator.enableValidation();
  newCardPopup.setEventListeners();
});

const editProfilePopup = new PopupWithForm ((data: FormValues) => {
  userInfo.setUserInfo({
    name: data.name,
    description: data.description,
    avatar: apiUser.avatar
  });
  apiResponse.patchUser({
    name: data.name,
    description: data.description 
  })
}, editProfileSelector);
const editProfileFormValidator = new FormValidator(
  defaultFormConfig,
  editProfilePopup.getForm()
);

editProfileBtn?.addEventListener("click", () => {
  editProfilePopup.open();
  editProfilePopup.fillForm(userInfo.getUserInfo());
  editProfileFormValidator.resetValidation();
  editProfileFormValidator.enableValidation();
  editProfilePopup.setEventListeners();
});

} catch (error) {
  console.log(`error: ${error}`);
}



