import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig, apiConfig } from "./utils/constants.js";
// =============================================
// API — instanciada una sola vez
// =============================================
const api = new Api(apiConfig);
// =============================================
// Selección de elementos del DOM
// =============================================
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const editAvatarForm = document.querySelector("#edit-avatar-form");
// =============================================
// UserInfo — instanciada una sola vez
// =============================================
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
// =============================================
// FormValidators — uno por formulario
// =============================================
const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
editProfileFormValidator.enableValidation();
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
newCardFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(defaultFormConfig, editAvatarForm);
editAvatarFormValidator.enableValidation();
// =============================================
// Popup: Ver imagen ampliada
// =============================================
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// =============================================
// Popup: Confirmar eliminación
// =============================================
const confirmDeletePopup = new PopupWithConfirmation("#confirm-delete-popup", () => { });
confirmDeletePopup.setEventListeners();
// =============================================
// Popup: Editar perfil
// =============================================
const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
    try {
        editProfilePopup.renderLoading(true);
        const userData = await api.updateUserInfo({
            name: inputValues["name"],
            about: inputValues["description"],
        });
        userInfo.setUserInfo(userData);
        editProfilePopup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        editProfilePopup.renderLoading(false);
    }
});
editProfilePopup.setEventListeners();
// =============================================
// Popup: Editar avatar
// =============================================
const editAvatarPopup = new PopupWithForm("#edit-avatar-popup", async (inputValues) => {
    try {
        editAvatarPopup.renderLoading(true);
        const userData = await api.updateAvatar({ avatar: inputValues["avatar"] });
        userInfo.setUserInfo(userData);
        editAvatarPopup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        editAvatarPopup.renderLoading(false);
    }
});
editAvatarPopup.setEventListeners();
// =============================================
// Section
// =============================================
let cardsSection;
// =============================================
// Función para crear tarjeta
// =============================================
const createCard = (cardData, userId) => {
    const card = new Card(cardData, "#card-template", userId, {
        handleCardClick: (name, link) => {
            imagePopup.open(name, link);
        },
        handleDeleteClick: (cardId) => {
            confirmDeletePopup.setSubmitHandler(async () => {
                try {
                    confirmDeletePopup.renderLoading(true);
                    await api.deleteCard(cardId);
                    card.deleteCard();
                    confirmDeletePopup.close();
                }
                catch (err) {
                    console.error(err);
                }
                finally {
                    confirmDeletePopup.renderLoading(false);
                }
            });
            confirmDeletePopup.open();
        },
        handleLikeClick: (cardId, isLiked) => {
            return isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
        },
    });
    return card.generateCard();
};
// =============================================
// Popup: Nueva tarjeta
// =============================================
const newCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
    try {
        newCardPopup.renderLoading(true, "Creando...");
        const cardData = await api.addCard({
            name: inputValues["place-name"],
            link: inputValues["link"],
        });
        cardsSection.addItem(createCard(cardData, cardData.owner));
        newCardPopup.close();
        newCardFormValidator.resetValidation();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        newCardPopup.renderLoading(false);
    }
});
newCardPopup.setEventListeners();
// =============================================
// Carga inicial: usuario y tarjetas en paralelo
// Las tarjetas aparecen solo tras recibir _id
// =============================================
const init = async () => {
    try {
        const [userData, cards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards(),
        ]);
        userInfo.setUserInfo(userData);
        const userId = userData._id;
        cardsSection = new Section({
            items: cards,
            renderer: (cardData) => {
                cardsSection.addItem(createCard(cardData, userId));
            },
        }, "#cards-list");
        cardsSection.renderItems();
    }
    catch (err) {
        console.error(err);
    }
};
init();
// =============================================
// Event listeners
// =============================================
profileEditButton.addEventListener("click", () => {
    const { name, description } = userInfo.getUserInfo();
    const nameInput = editProfileForm.querySelector("#profile-name-input");
    const descriptionInput = editProfileForm.querySelector("#profile-description-input");
    nameInput.value = name;
    descriptionInput.value = description;
    editProfileFormValidator.resetValidation();
    editProfilePopup.open();
});
profileAddButton.addEventListener("click", () => {
    newCardFormValidator.resetValidation();
    newCardPopup.open();
});
profileAvatarButton.addEventListener("click", () => {
    editAvatarFormValidator.resetValidation();
    editAvatarPopup.open();
});
