export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.templateSelector);
        return cardTemplate.content.querySelector(".card").cloneNode(true);
    }
    handleLikeButton() {
        this.element
            .querySelector(".card__like-button")
            .classList.toggle("card__like-button_is-active");
    }
    handleDeleteButton() {
        this.element.remove();
    }
    setEventListeners() {
        this.element
            .querySelector(".card__like-button")
            .addEventListener("click", () => this.handleLikeButton());
        this.element
            .querySelector(".card__delete-button")
            .addEventListener("click", () => this.handleDeleteButton());
        this.element
            .querySelector(".card__image")
            .addEventListener("click", () => this.handleCardClick(this.data.name, this.data.link));
    }
    generateCard() {
        this.element = this.getTemplate();
        const cardImage = this.element.querySelector(".card__image");
        const cardTitle = this.element.querySelector(".card__title");
        cardImage.src = this.data.link;
        cardImage.alt = this.data.name;
        cardTitle.textContent = this.data.name;
        this.setEventListeners();
        return this.element;
    }
}
