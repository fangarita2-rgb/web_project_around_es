import { CardData } from "../utils/constants.js";

interface CardCallbacks {
  handleCardClick: (name: string, link: string) => void;
  handleDeleteClick: (cardId: string) => void;
  handleLikeClick: (cardId: string, isLiked: boolean) => Promise<CardData>;
}

export class Card {
  private data: CardData;
  private templateSelector: string;
  private callbacks: CardCallbacks;
  private userId: string;
  private element!: HTMLElement;
  private likeButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    templateSelector: string,
    userId: string,
    callbacks: CardCallbacks,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.userId = userId;
    this.callbacks = callbacks;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector<HTMLTemplateElement>(
      this.templateSelector,
    ) as HTMLTemplateElement;
    return cardTemplate.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;
  }

  private isOwner(): boolean {
    return this.data.owner === this.userId;
  }

  private async handleLikeButton(): Promise<void> {
    try {
      const isLiked = this.likeButton.classList.contains(
        "card__like-button_is-active",
      );
      const updatedCard = await this.callbacks.handleLikeClick(
        this.data._id,
        isLiked,
      );
      this.data.isLiked = updatedCard.isLiked;
      this.likeButton.classList.toggle(
        "card__like-button_is-active",
        updatedCard.isLiked,
      );
    } catch (err) {
      console.error(err);
    }
  }

  private setEventListeners(): void {
    this.likeButton.addEventListener("click", () => this.handleLikeButton());

    const deleteButton = this.element.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    );
    if (deleteButton) {
      if (this.isOwner()) {
        deleteButton.addEventListener("click", () =>
          this.callbacks.handleDeleteClick(this.data._id),
        );
      } else {
        deleteButton.remove();
      }
    }

    this.element
      .querySelector(".card__image")!
      .addEventListener("click", () =>
        this.callbacks.handleCardClick(this.data.name, this.data.link),
      );
  }

  public deleteCard(): void {
    this.element.remove();
  }

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const cardImage =
      this.element.querySelector<HTMLImageElement>(".card__image")!;
    const cardTitle =
      this.element.querySelector<HTMLElement>(".card__title")!;
    this.likeButton =
      this.element.querySelector<HTMLButtonElement>(".card__like-button")!;

    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardTitle.textContent = this.data.name;

    if (this.data.isLiked) {
      this.likeButton.classList.add("card__like-button_is-active");
    }

    this.setEventListeners();

    return this.element;
  }
}