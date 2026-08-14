import { Popup } from "./Popup.js";

type ConfirmCallback = () => void;

export class PopupWithConfirmation extends Popup {
  private handleConfirm: ConfirmCallback;
  private formElement: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private submitButtonText: string;

  constructor(popupSelector: string, handleConfirm: ConfirmCallback) {
    super(popupSelector);
    this.handleConfirm = handleConfirm;
    this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
    this.submitButton = this.formElement.querySelector(".popup__button") as HTMLButtonElement;
    this.submitButtonText = this.submitButton.textContent || "";
  }

  public setSubmitHandler(callback: ConfirmCallback): void {
    this.handleConfirm = callback;
  }

  public renderLoading(isLoading: boolean, loadingText = "Eliminando..."): void {
    this.submitButton.textContent = isLoading ? loadingText : this.submitButtonText;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (evt: Event) => {
      evt.preventDefault();
      this.handleConfirm();
    });
  }
}