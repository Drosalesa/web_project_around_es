export class UserInfo {
    userName;
    userJob;
    userAvatar;
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this.userName = document.querySelector(nameSelector);
        this.userJob = document.querySelector(descriptionSelector);
        this.userAvatar = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this.userName.textContent,
            description: this.userJob.textContent,
            avatar: this.userAvatar.src
        };
    }
    setUserInfo({ name, description, avatar }) {
        this.userName.textContent = name;
        this.userJob.textContent = description;
        this.userAvatar.src = avatar;
    }
}
