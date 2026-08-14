import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.inputList = this.formElement.querySelectorAll(".popup__input");
        this.submitButton = this.formElement.querySelector(".popup__button");
        this.submitButtonText = this.submitButton.textContent || "";
    }
    getInputValues() {
        const inputValues = {};
        this.inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    renderLoading(isLoading, loadingText = "Guardando...") {
        this.submitButton.textContent = isLoading ? loadingText : this.submitButtonText;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
