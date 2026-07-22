import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement.querySelector(".popup__image");
        this._captionElement = this._popupElement.querySelector(".popup__caption");
    }
    // Se agregan los signos '?' para indicar que los parámetros son opcionales
    // cumpliendo así con la firma del método open() de la clase base Popup.
    open(name, link) {
        if (name && link) {
            this._imageElement.src = link;
            this._imageElement.alt = name;
            this._captionElement.textContent = name;
        }
        super.open();
    }
}
