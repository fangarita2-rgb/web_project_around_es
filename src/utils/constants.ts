export interface FormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export const defaultFormConfig: FormConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface CardFormData {
  name: string;
  link: string;
}

export interface UserData {
  name: string;
  about: string;
  avatar: string;
  _id: string;
}

export interface UserFormData {
  name: string;
  about: string;
}

export interface AvatarFormData {
  avatar: string;
}

export const apiConfig = {
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "dbdc5328-8979-43b3-b397-f83ec213929b",
    "Content-Type": "application/json",
  },
};
