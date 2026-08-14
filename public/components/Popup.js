export class Popup {
    constructor(popupSelector) {
        this.handleEscClose = (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        };
        this.popupElement = document.querySelector(popupSelector);
    }
    open(name, link) {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        this.popupElement
            .querySelector(".popup__close")
            .addEventListener("click", () => this.close());
        this.popupElement.addEventListener("click", (evt) => {
            if (evt.target === this.popupElement) {
                this.close();
            }
        });
    }
}
