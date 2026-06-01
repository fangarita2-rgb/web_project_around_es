import { setEventListeners, resetValidation } from "./validate.js";

// =============================================
// CONFIGURACIÓN DE VALIDACIÓN
// =============================================
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// =============================================
// 1. Array de tarjetas iniciales
// =============================================
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

// =============================================
// 2. Selección de elementos del DOM
// =============================================
const cardsList = document.querySelector("#cards-list");
const cardTemplate = document.querySelector("#card-template");

const editPopup = document.querySelector("#edit-popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileForm = document.querySelector("#edit-profile-form");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newCardPopup = document.querySelector("#new-card-popup");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// =============================================
// 3. Funciones de modal (abrir/cerrar)
// =============================================
const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// Cerrar al hacer clic fuera del contenido
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// =============================================
// 4. Funciones handler de tarjetas
// =============================================
function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteButton(evt) {
  evt.target.closest(".card").remove();
}

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// =============================================
// 5. Función que crea un elemento de tarjeta
// =============================================
function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardLikeButton.addEventListener("click", handleLikeButton);
  cardDeleteButton.addEventListener("click", handleDeleteButton);
  cardImage.addEventListener("click", function () {
    handleImageClick(name, link);
  });

  return cardElement;
}

// =============================================
// 6. Función que antepone una tarjeta al contenedor
// =============================================
function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

// =============================================
// 7. Funciones para el modal de editar perfil
// =============================================
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(editProfileForm, validationConfig);
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

// =============================================
// 8. Función handler para el formulario de nueva tarjeta
// =============================================
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);
  closeModal(newCardPopup);
  evt.target.reset();
  resetValidation(newCardForm, validationConfig);
}

// =============================================
// 9. Renderizado inicial de tarjetas
// =============================================
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

// =============================================
// 10. Inicializar validación en ambos formularios
// =============================================
setEventListeners(editProfileForm, validationConfig);
setEventListeners(newCardForm, validationConfig);

// =============================================
// 11. Event listeners
// =============================================
profileEditButton.addEventListener("click", handleOpenEditModal);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", function () {
  resetValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});
newCardForm.addEventListener("submit", handleCardFormSubmit);
