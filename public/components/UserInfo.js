export class UserInfo {
    userName;
    userJob;
    constructor({ nameSelector, descriptionSelector }) {
        this.userName = document.querySelector(nameSelector);
        this.userJob = document.querySelector(descriptionSelector);
    }
    getUserInfo() {
        const userValues = {
            name: "",
            description: "",
        };
        userValues.name = this.userName.textContent;
        userValues.description = this.userJob.textContent;
        return userValues;
    }
    setUserInfo(name, description) {
        this.userName.textContent = name;
        this.userJob.textContent = description;
    }
}
//# sourceMappingURL=UserInfo.js.map