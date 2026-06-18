export class Api {
    apiUrl;
    headers;
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.headers = {
            authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
            "Content-Type": "application/json",
        };
    }
    async request(endpoint, options = {}) {
        const res = await fetch(`${this.apiUrl}${endpoint}`, {
            headers: this.headers,
            ...options,
        });
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
    }
    getUser() {
        return this.request("users/me");
    }
    getCards() {
        return this.request("cards");
    }
    patchUser({ name, description, }) {
        return this.request("users/me", {
            method: "PATCH",
            body: JSON.stringify({
                name,
                about: description,
            }),
        });
    }
    postNewCard({ name, link, }) {
        return this.request("cards", {
            method: "POST",
            body: JSON.stringify({ name, link }),
        });
    }
    toggleLike(cardId, isLiked) {
        return isLiked
            ? this.removeLike(cardId)
            : this.addLike(cardId);
    }
    addLike(cardId) {
        return this.request(`cards/${cardId}/likes`, {
            method: "PUT",
        });
    }
    removeLike(cardId) {
        return this.request(`cards/${cardId}/likes`, {
            method: "DELETE",
        });
    }
    deleteCard(cardId) {
        return this.request(`cards/${cardId}`, {
            method: "DELETE"
        });
    }
    editAvatar(avatar) {
        return this.request("users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify({ avatar }),
        });
    }
}
