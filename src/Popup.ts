export class Popup {
  protected _popupElement: HTMLElement;
  private _handleEscCloseBind: (evt: KeyboardEvent) => void;

  constructor(popupSelector: string) {
    const element = document.querySelector<HTMLElement>(popupSelector);
    if (!element) {
      throw new Error(`No se encontró el elemento con selector: ${popupSelector}`);
    }
    this._popupElement = element;
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }

  open(): void {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscCloseBind);
  }

  close(): void {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscCloseBind);
  }

  private _handleEscClose(evt: KeyboardEvent): void {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(): void {
    this._popupElement.addEventListener("mousedown", (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (target.classList.contains("popup_is-opened") || target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}