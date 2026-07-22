import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { initialCards, validationConfig } from "./constants.js";
// Instancias de Modales
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description"
});
// Renderizador de Tarjetas
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
    }
}, "#cards-list");
function createCard(item) {
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
const formValidators = {};
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
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
profileEditButton === null || profileEditButton === void 0 ? void 0 : profileEditButton.addEventListener("click", () => {
    var _a;
    const data = userInfo.getUserInfo();
    const nameInput = document.querySelector("#profile-name-input");
    const jobInput = document.querySelector("#profile-description-input");
    if (nameInput && jobInput) {
        nameInput.value = data.name;
        jobInput.value = data.job;
    }
    (_a = formValidators["edit-profile-form"]) === null || _a === void 0 ? void 0 : _a.resetValidation();
    editProfilePopup.open();
});
profileAddButton === null || profileAddButton === void 0 ? void 0 : profileAddButton.addEventListener("click", () => {
    var _a;
    (_a = formValidators["new-card-form"]) === null || _a === void 0 ? void 0 : _a.resetValidation();
    newCardPopup.open();
});
