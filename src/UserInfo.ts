interface UserSelectors {
  nameSelector: string;
  descriptionSelector: string;
}

interface UserData {
  name: string;
  description: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private descriptionElement: HTMLElement;

  constructor({ nameSelector, descriptionSelector }: UserSelectors) {
    this.nameElement = document.querySelector<HTMLElement>(nameSelector) as HTMLElement;
    this.descriptionElement = document.querySelector<HTMLElement>(descriptionSelector) as HTMLElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent || "",
      description: this.descriptionElement.textContent || "",
    };
  }

  public setUserInfo({ name, description }: UserData): void {
    this.nameElement.textContent = name;
    this.descriptionElement.textContent = description;
  }
}
