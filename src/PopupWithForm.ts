import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  private _handleFormSubmit: (formData: Record<string, string>) => void;
  private _formElement: HTMLFormElement;
  private _inputList: NodeListOf<HTMLInputElement>;

  constructor(popupSelector: string, handleFormSubmit: (formData: Record<string, string>) => void) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form") as HTMLFormElement;
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }

  private _getInputValues(): Record<string, string> {
    const formValues: Record<string, string> = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners(): void {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close(): void {
    super.close();
    this._formElement.reset();
  }
}