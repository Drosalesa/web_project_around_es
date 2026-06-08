import type { ApiCard } from "../types/types"

interface ApiUserInfo {
    name: string,
    about: string,
    avatar: string,
    "_id": string
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
            return data;
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async postNewCard({name, link}: {name: string, link: string}): Promise<ApiCard> {

        const res: Response = await fetch(`${this.apiUrl}cards`, {
            method: "POST",
            headers: {
                authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
                "Content-Type": "application/json; charset=UTF-8" 
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        });

        if (!res.ok) {
            throw new Error(res.status.toString());
         }

         const data: ApiCard = await res.json();
        return data;
    }

    async toggleLike(cardId: string, isLiked: boolean): Promise<ApiCard> {
        if(isLiked){
            return this.removeLike(cardId);
        }

        return this.addLike(cardId);
    }

    async addLike(cardId: string): Promise<ApiCard> {
        
        const res: Response = await fetch(`${this.apiUrl}cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
                "Content-Type": "application/json; charset=UTF-8" 
            },
        });

        if (!res.ok) throw new Error(res.status.toString());

        return await res.json();
    }

    async removeLike(cardId: string): Promise<ApiCard> {
        
        const res: Response = await fetch(`${this.apiUrl}cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
                "Content-Type": "application/json; charset=UTF-8" 
            },
        });

        if (!res.ok) throw new Error(res.status.toString());

        return await res.json();
    }

    async deleteCard(cardId: string): Promise<void> {
        
        const res: Response = await fetch(`${this.apiUrl}cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
                "Content-Type": "application/json; charset=UTF-8" 
            }
        });
    }
}