export class Api {
    apiUrl;
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    async getUser() {
        try {
            const res = await fetch(`${this.apiUrl}users/me`, {
                headers: {
                    authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a"
                }
            });
            if (!res.ok) {
                throw new Error(res.status.toString());
            }
            return await res.json();
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async getCards() {
        try {
            const res = await fetch(`${this.apiUrl}cards`, {
                headers: {
                    authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a"
                }
            });
            if (!res.ok) {
                throw new Error(res.status.toString());
            }
            return await res.json();
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async patchUser({ name, description }) {
        try {
            const res = await fetch(`${this.apiUrl}users/me`, {
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
            const data = await res.json();
            return data;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    async postNewCard({ name, link }) {
        const res = await fetch(`${this.apiUrl}cards`, {
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
        const data = await res.json();
        return data;
    }
    async toggleLike(cardId, isLiked) {
        if (isLiked) {
            return this.removeLike(cardId);
        }
        return this.addLike(cardId);
    }
    async addLike(cardId) {
        const res = await fetch(`${this.apiUrl}cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
                "Content-Type": "application/json; charset=UTF-8"
            },
        });
        if (!res.ok)
            throw new Error(res.status.toString());
        return await res.json();
    }
    async removeLike(cardId) {
        const res = await fetch(`${this.apiUrl}cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
                "Content-Type": "application/json; charset=UTF-8"
            },
        });
        if (!res.ok)
            throw new Error(res.status.toString());
        return await res.json();
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this.apiUrl}cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
    }
}
