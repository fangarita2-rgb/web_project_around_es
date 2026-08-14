export class Card {
    constructor(data, templateSelector, userId, callbacks) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.userId = userId;
        this.callbacks = callbacks;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.templateSelector);
        return cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
    }
    isOwner() {
        return this.data.owner === this.userId;
    }
    handleLikeButton() {
        const isLiked = this.likeButton.classList.contains("card__like-button_is-active");
        this.callbacks
            .handleLikeClick(this.data._id, isLiked)
            .then((updatedCard) => {
            this.data.isLiked = updatedCard.isLiked;
            this.likeButton.classList.toggle("card__like-button_is-active", updatedCard.isLiked);
        })
            .catch((err) => console.error(err));
    }
    setEventListeners() {
        this.likeButton.addEventListener("click", () => this.handleLikeButton());
        const deleteButton = this.element.querySelector(".card__delete-button");
        if (deleteButton) {
            if (this.isOwner()) {
                deleteButton.addEventListener("click", () => this.callbacks.handleDeleteClick(this.data._id));
            }
            else {
                deleteButton.remove();
            }
        }
        this.element
            .querySelector(".card__image")
            .addEventListener("click", () => this.callbacks.handleCardClick(this.data.name, this.data.link));
    }
    deleteCard() {
        this.element.remove();
    }
    generateCard() {
        this.element = this.getTemplate();
        const cardImage = this.element.querySelector(".card__image");
        const cardTitle = this.element.querySelector(".card__title");
        this.likeButton =
            this.element.querySelector(".card__like-button");
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
