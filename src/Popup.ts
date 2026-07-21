export class Popup {
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    this.popupElement = document.querySelector<HTMLElement>(popupSelector) as HTMLElement;
  }

  private handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  public open(): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  public setEventListeners(): void {
    this.popupElement
      .querySelector(".popup__close")!
      .addEventListener("click", () => this.close());

    this.popupElement.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target === this.popupElement) {
        this.close();
      }
    });
  }
}
