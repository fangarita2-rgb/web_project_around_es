import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig, apiConfig, CardData } from "./utils/constants.js";

const api = new Api(apiConfig);

const profileEditButton = document.querySelector<HTMLButtonElement>(
  ".profile__edit-button",
)!;
const profileAddButton = document.querySelector<HTMLButtonElement>(
  ".profile__add-button",
)!;
const profileAvatarButton = document.querySelector<HTMLButtonElement>(
  ".profile__avatar-button",
)!;
const editProfileForm =
  document.querySelector<HTMLFormElement>("#edit-profile-form")!;
const newCardForm = document.querySelector<HTMLFormElement>("#new-card-form")!;
const editAvatarForm =
  document.querySelector<HTMLFormElement>("#edit-avatar-form")!;

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const editProfileFormValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm,
);
editProfileFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
newCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(
  defaultFormConfig,
  editAvatarForm,
);
editAvatarFormValidator.enableValidation();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const confirmDeletePopup = new PopupWithConfirmation(
  "#confirm-delete-popup",
  () => {},
);
confirmDeletePopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  editProfilePopup.renderLoading(true);
  api
    .updateUserInfo({
      name: inputValues["name"],
      about: inputValues["description"],
    })
    .then((userData) => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => editProfilePopup.renderLoading(false));
});
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-popup",
  (inputValues) => {
    editAvatarPopup.renderLoading(true);
    api
      .updateAvatar({ avatar: inputValues["avatar"] })
      .then((userData) => {
        userInfo.setUserInfo(userData);
        editAvatarPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => editAvatarPopup.renderLoading(false));
  },
);
editAvatarPopup.setEventListeners();

let cardsSection: Section<CardData>;

const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  newCardPopup.renderLoading(true, "Creando...");
  api
    .addCard({ name: inputValues["place-name"], link: inputValues["link"] })
    .then((cardData) => {
      cardsSection.addItem(createCard(cardData, cardData.owner));
      newCardPopup.close();
      newCardFormValidator.resetValidation();
    })
    .catch((err) => console.error(err))
    .finally(() => newCardPopup.renderLoading(false));
});
newCardPopup.setEventListeners();

const createCard = (cardData: CardData, userId: string): HTMLElement => {
  const card = new Card(cardData, "#card-template", userId, {
    handleCardClick: (name: string, link: string) => {
      imagePopup.open(name, link);
    },
    handleDeleteClick: (cardId: string) => {
      confirmDeletePopup.setSubmitHandler(() => {
        confirmDeletePopup.renderLoading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            confirmDeletePopup.close();
          })
          .catch((err) => console.error(err))
          .finally(() => confirmDeletePopup.renderLoading(false));
      });
      confirmDeletePopup.open();
    },
    handleLikeClick: (cardId: string, isLiked: boolean) => {
      return isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
    },
  });
  return card.generateCard();
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    const userId = userData._id;
    cardsSection = new Section<CardData>(
      {
        items: cards,
        renderer: (cardData) => {
          cardsSection.addItem(createCard(cardData, userId));
        },
      },
      "#cards-list",
    );
    cardsSection.renderItems();
  })
  .catch((err) => console.error(err));

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  const nameInput = editProfileForm.querySelector<HTMLInputElement>(
    "#profile-name-input",
  )!;
  const descriptionInput = editProfileForm.querySelector<HTMLInputElement>(
    "#profile-description-input",
  )!;
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
