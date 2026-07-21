export interface CardData {
  name: string;
  link: string;
}

export class Card {
  private data: CardData;
  private templateSelector: string;
  private handleCardClick: (name: string, link: string) => void;
  private element!: HTMLElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector<HTMLTemplateElement>(
      this.templateSelector
    ) as HTMLTemplateElement;
    return cardTemplate.content.querySelector(".card")!.cloneNode(true) as HTMLElement;
  }

  private handleLikeButton(): void {
    this.element
      .querySelector(".card__like-button")!
      .classList.toggle("card__like-button_is-active");
  }

  private handleDeleteButton(): void {
    this.element.remove();
  }

  private setEventListeners(): void {
    this.element
      .querySelector(".card__like-button")!
      .addEventListener("click", () => this.handleLikeButton());

    this.element
      .querySelector(".card__delete-button")!
      .addEventListener("click", () => this.handleDeleteButton());

    this.element
      .querySelector(".card__image")!
      .addEventListener("click", () =>
        this.handleCardClick(this.data.name, this.data.link)
      );
  }

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const cardImage = this.element.querySelector<HTMLImageElement>(".card__image")!;
    const cardTitle = this.element.querySelector<HTMLElement>(".card__title")!;

    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardTitle.textContent = this.data.name;

    this.setEventListeners();

    return this.element;
  }
}
