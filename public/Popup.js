export class Popup {
    constructor(popupSelector) {
        const element = document.querySelector(popupSelector);
        if (!element) {
            throw new Error(`No se encontró el elemento con selector: ${popupSelector}`);
        }
        this._popupElement = element;
        this._handleEscCloseBind = this._handleEscClose.bind(this);
    }
    open() {
        this._popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscCloseBind);
    }
    close() {
        this._popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._handleEscCloseBind);
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
            const target = evt.target;
            if (target.classList.contains("popup_is-opened") || target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}
