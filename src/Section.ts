export class Section<T> {
  private _renderedItems: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor({ items, renderer }: { items: T[]; renderer: (item: T) => void }, containerSelector: string) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector) as HTMLElement;
  }

  renderItems(): void {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}