import { Card, CardData } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, defaultFormConfig } from "./utils/constants.js";

// =============================================
// Selección de elementos del DOM
// =============================================
const profileEditButton = document.querySelector<HTMLButtonElement>(".profile__edit-button")!;
const profileAddButton = document.querySelector<HTMLButtonElement>(".profile__add-button")!;
const editProfileForm = document.querySelector<HTMLFormElement>("#edit-profile-form")!;
const newCardForm = document.querySelector<HTMLFormElement>("#new-card-form")!;

// =============================================
// Instancias
// =============================================
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues["name"],
    description: inputValues["description"],
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const cardData: CardData = {
    name: inputValues["place-name"],
    link: inputValues["link"],
  };
  const card = new Card(cardData, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  cardsSection.addItem(card.generateCard());
  newCardPopup.close();
  newCardFormValidator.resetValidation();
});
newCardPopup.setEventListeners();

const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
newCardFormValidator.enableValidation();

// =============================================
// Section y renderizado inicial
// =============================================
const cardsSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", (name, link) => {
        imagePopup.open(name, link);
      });
      cardsSection.addItem(card.generateCard());
    },
  },
  "#cards-list"
);
cardsSection.renderItems();

// =============================================
// Event listeners
// =============================================
profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  const nameInput = editProfileForm.querySelector<HTMLInputElement>(".popup__input_type_name")!;
  const descriptionInput = editProfileForm.querySelector<HTMLInputElement>(".popup__input_type_description")!;
  nameInput.value = name;
  descriptionInput.value = description;
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});
