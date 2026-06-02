import type { UserValues } from "../types/types";

export class UserInfo {
    private userName: HTMLElement;
    private userJob: HTMLElement;
    private userAvatar: HTMLImageElement;

    constructor({nameSelector, descriptionSelector, avatarSelector}: {nameSelector: string, descriptionSelector: string, avatarSelector: string}) {
        this.userName = document.querySelector(nameSelector) as HTMLElement;
        this.userJob = document.querySelector(descriptionSelector) as HTMLElement;
        this.userAvatar = document.querySelector(avatarSelector) as HTMLImageElement;
    }

    getUserInfo(): UserValues {
        return {
            name: this.userName.textContent,
            description: this.userJob.textContent,
            avatar: this.userAvatar.src
        };
    }

    setUserInfo({name, description, avatar}: {name: string, description: string, avatar: string}): void {
        this.userName.textContent = name;
        this.userJob.textContent = description;
        this.userAvatar.src = avatar;
    }
}