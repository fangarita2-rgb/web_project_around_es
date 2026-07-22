export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._element = null;
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        var _a;
        const template = document.querySelector(this._templateSelector);
        const cardElement = (_a = template.content.querySelector(".card")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
        return cardElement;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const imageElement = this._element.querySelector(".card__image");
        const titleElement = this._element.querySelector(".card__title");
        imageElement.src = this._link;
        imageElement.alt = this._name;
        titleElement.textContent = this._name;
        return this._element;
    }
    _setEventListeners() {
        if (!this._element)
            return;
        const likeButton = this._element.querySelector(".card__like-button");
        const deleteButton = this._element.querySelector(".card__delete-button");
        const cardImage = this._element.querySelector(".card__image");
        likeButton === null || likeButton === void 0 ? void 0 : likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", () => {
            var _a;
            (_a = this._element) === null || _a === void 0 ? void 0 : _a.remove();
            this._element = null;
        });
        cardImage === null || cardImage === void 0 ? void 0 : cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}
