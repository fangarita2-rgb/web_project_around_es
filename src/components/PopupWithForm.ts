import { Popup } from "./Popup.js";

type SubmitCallback = (inputValues: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private handleFormSubmit: SubmitCallback;
  private formElement: HTMLFormElement;
  private inputList: NodeListOf<HTMLInputElement>;
  private submitButton: HTMLButtonElement;
  private submitButtonText: string;

  constructor(popupSelector: string, handleFormSubmit: SubmitCallback) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this.popupElement.querySelector(".popup__form") as HTMLFormElement;
    this.inputList = this.formElement.querySelectorAll(".popup__input");
    this.submitButton = this.formElement.querySelector(".popup__button") as HTMLButtonElement;
    this.submitButtonText = this.submitButton.textContent || "";
  }

  private getInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};
    this.inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  public renderLoading(isLoading: boolean, loadingText = "Guardando..."): void {
    this.submitButton.textContent = isLoading ? loadingText : this.submitButtonText;
  }

  public setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (evt: Event) => {
      evt.preventDefault();
      this.handleFormSubmit(this.getInputValues());
    });
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }
}