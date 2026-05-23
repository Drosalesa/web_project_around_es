import type { UserValues } from "../types/types";

export class UserInfo {
    private userName: HTMLElement;
    private userJob: HTMLElement;

    constructor({nameSelector, descriptionSelector}: {nameSelector: string, descriptionSelector: string}) {
        this.userName = document.querySelector(nameSelector) as HTMLElement;
        this.userJob = document.querySelector(descriptionSelector) as HTMLElement;
    }

    getUserInfo(): UserValues {
        const userValues: UserValues = {
            name: "",
            description: "",
        };

        userValues.name = this.userName.textContent;
        userValues.description = this.userJob.textContent;

        return userValues;
    }

    setUserInfo(name: string, description: string): void {
        this.userName.textContent = name;
        this.userJob.textContent = description;
    }
}