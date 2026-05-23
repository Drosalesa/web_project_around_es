import type { UserValues } from "../types/types";
export declare class UserInfo {
    private userName;
    private userJob;
    constructor({ nameSelector, descriptionSelector }: {
        nameSelector: string;
        descriptionSelector: string;
    });
    getUserInfo(): UserValues;
    setUserInfo(name: string, description: string): void;
}
//# sourceMappingURL=UserInfo.d.ts.map