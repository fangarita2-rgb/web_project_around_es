export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    async handleResponse(res) {
        if (res.ok) {
            return await res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
    async getUserInfo() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
        });
        return this.handleResponse(res);
    }
    async getInitialCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        });
        return this.handleResponse(res);
    }
    async updateUserInfo(data) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return this.handleResponse(res);
    }
    async updateAvatar(data) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return this.handleResponse(res);
    }
    async addCard(data) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        });
        return this.handleResponse(res);
    }
    async deleteCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this.handleResponse(res);
    }
    async likeCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        });
        return this.handleResponse(res);
    }
    async unlikeCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this.handleResponse(res);
    }
}
