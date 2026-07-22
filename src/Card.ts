import { CardData } from "./constants.js";

export class Card {
  private _name: string;
  private _link: string;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _element: HTMLElement | null = null;

  constructor(data: CardData, templateSelector: string, handleCardClick: (name: string, link: string) => void) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  private _getTemplate(): HTMLElement {
    const template = document.querySelector(this._templateSelector) as HTMLTemplateElement;
    const cardElement = template.content.querySelector(".card")?.cloneNode(true) as HTMLElement;
    return cardElement;
  }

  generateCard(): HTMLElement {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector(".card__image") as HTMLImageElement;
    const titleElement = this._element.querySelector(".card__title") as HTMLElement;

    imageElement.src = this._link;
    imageElement.alt = this._name;
    titleElement.textContent = this._name;

    return this._element;
  }

  private _setEventListeners(): void {
    if (!this._element) return;

    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const cardImage = this._element.querySelector(".card__image");

    likeButton?.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    deleteButton?.addEventListener("click", () => {
      this._element?.remove();
      this._element = null;
    });

    cardImage?.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}