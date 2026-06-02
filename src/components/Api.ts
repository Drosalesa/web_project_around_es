import type { UserValues } from "../types/types.ts"

interface ApiUserInfo {
    name: string,
    about: string,
    avatar: string,
    "_id": string
}

interface ApiCard {
    isLiked: boolean,
    _id: string,
    name: string,
    link: string,
    owner: string,
    createdAt: string
}

export class Api {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getUser(): Promise<ApiUserInfo> {
        try {
            const res: Response = await fetch(`${this.apiUrl}users/me`, {
                headers: {
                    authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a"
                }
            });

            if (!res.ok) {
                throw new Error(res.status.toString());
            }                
            
            return await res.json() as ApiUserInfo;

        } catch (err: unknown) {
            console.log(err);
            throw err;
        }
    }

    async getCards(): Promise<ApiCard[]> {
        try {
            const res: Response = await fetch(`${this.apiUrl}cards`, {
                headers: {
                    authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a"
                }
            });

            if (!res.ok) {
                throw new Error(res.status.toString());
            }                
            
            return await res.json() as ApiCard[];

        } catch (err: unknown) {
            console.log(err);
            throw err;
        }
    }

    async patchUser({name, description}: {name: string, description: string}): Promise<ApiUserInfo> {
        try {
            const res: Response = await fetch (`${this.apiUrl}users/me`, {
                method: "PATCH",
                headers: {
                    authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    name: name,
                    about: description
                })
            });

            if (!res.ok) {
                throw new Error(res.status.toString());
            }

            const data: ApiUserInfo = await res.json();
            console.log(data);

            return data;
        } catch (err) {
            console.log(err);
            throw err
        }
    }
}