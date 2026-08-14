import { UserData } from "../utils/constants.js";

interface UserSelectors {
  nameSelector: string;
  descriptionSelector: string;
  avatarSelector: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private descriptionElement: HTMLElement;
  private avatarElement: HTMLImageElement;

  constructor({
    nameSelector,
    descriptionSelector,
    avatarSelector,
  }: UserSelectors) {
    this.nameElement = document.querySelector<HTMLElement>(
      nameSelector,
    ) as HTMLElement;
    this.descriptionElement = document.querySelector<HTMLElement>(
      descriptionSelector,
    ) as HTMLElement;
    this.avatarElement = document.querySelector<HTMLImageElement>(
      avatarSelector,
    ) as HTMLImageElement;
  }

  public getUserInfo(): { name: string; description: string } {
    return {
      name: this.nameElement.textContent || "",
      description: this.descriptionElement.textContent || "",
    };
  }

  public setUserInfo(data: UserData): void {
    this.nameElement.textContent = data.name;
    this.descriptionElement.textContent = data.about;
    this.avatarElement.src = data.avatar;
  }
}
