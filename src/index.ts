import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { initialCards, validationConfig, CardData } from "./constants.js";

// Instancias de Modales
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});

// Renderizador de Tarjetas
const cardSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    }
  },
  "#cards-list"
);

function createCard(item: CardData): HTMLElement {
  const card = new Card(item, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
}

cardSection.renderItems();

// Formulario: Editar Perfil
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo(formData.name, formData.description);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// Formulario: Agregar Tarjeta
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const newCardElement = createCard({
    name: formData["place-name"],
    link: formData.link
  });
  cardSection.addItem(newCardElement);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

// Validadores
const formValidators: Record<string, FormValidator> = {};

const enableValidation = (config: typeof validationConfig) => {
  const formList = Array.from(document.querySelectorAll<HTMLFormElement>(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("id") || "";
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// Event Listeners de Botones de Apertura
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

profileEditButton?.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  const nameInput = document.querySelector<HTMLInputElement>("#profile-name-input");
  const jobInput = document.querySelector<HTMLInputElement>("#profile-description-input");

  if (nameInput && jobInput) {
    nameInput.value = data.name;
    jobInput.value = data.job;
  }

  formValidators["edit-profile-form"]?.resetValidation();
  editProfilePopup.open();
});

profileAddButton?.addEventListener("click", () => {
  formValidators["new-card-form"]?.resetValidation();
  newCardPopup.open();
});