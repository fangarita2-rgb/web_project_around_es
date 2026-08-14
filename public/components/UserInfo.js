export class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector, }) {
        this.nameElement = document.querySelector(nameSelector);
        this.descriptionElement = document.querySelector(descriptionSelector);
        this.avatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            description: this.descriptionElement.textContent || "",
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.descriptionElement.textContent = data.about;
        this.avatarElement.src = data.avatar;
    }
}
