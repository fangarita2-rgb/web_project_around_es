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
        try {
            const res = await fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers,
            });
            return await this.handleResponse(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async getInitialCards() {
        try {
            const res = await fetch(`${this.baseUrl}/cards`, {
                headers: this.headers,
            });
            return await this.handleResponse(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async updateUserInfo(data) {
        try {
            const res = await fetch(`${this.baseUrl}/users/me`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            return await this.handleResponse(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async updateAvatar(data) {
        try {
            const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            return await this.handleResponse(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async addCard(data) {
        try {
            const res = await fetch(`${this.baseUrl}/cards`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            return await this.handleResponse(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async deleteCard(cardId) {
        try {
            const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: this.headers,
            });
            return await this.handleResponse(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async likeCard(cardId) {
        try {
            const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this.headers,
            });
            return await this.handleResponse(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async unlikeCard(cardId) {
        try {
            const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this.headers,
            });
            return await this.handleResponse(res);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}
