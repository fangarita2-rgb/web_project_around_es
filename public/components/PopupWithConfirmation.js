import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this.handleConfirm = handleConfirm;
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.submitButton = this.formElement.querySelector(".popup__button");
        this.submitButtonText = this.submitButton.textContent || "";
    }
    setSubmitHandler(callback) {
        this.handleConfirm = callback;
    }
    renderLoading(isLoading, loadingText = "Eliminando...") {
        this.submitButton.textContent = isLoading ? loadingText : this.submitButtonText;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleConfirm();
        });
    }
}
