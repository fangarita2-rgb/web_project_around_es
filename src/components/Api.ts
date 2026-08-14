import {
  CardData,
  CardFormData,
  UserData,
  UserFormData,
  AvatarFormData,
} from "../utils/constants.js";

interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export class Api {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  async getUserInfo(): Promise<UserData> {
    try {
      const res = await fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
      });
      return await this.handleResponse<UserData>(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getInitialCards(): Promise<CardData[]> {
    try {
      const res = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
      });
      return await this.handleResponse<CardData[]>(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateUserInfo(data: UserFormData): Promise<UserData> {
    try {
      const res = await fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return await this.handleResponse<UserData>(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    try {
      const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return await this.handleResponse<UserData>(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async addCard(data: CardFormData): Promise<CardData> {
    try {
      const res = await fetch(`${this.baseUrl}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return await this.handleResponse<CardData>(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async deleteCard(cardId: string): Promise<void> {
    try {
      const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      });
      return await this.handleResponse<void>(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async likeCard(cardId: string): Promise<CardData> {
    try {
      const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this.headers,
      });
      return await this.handleResponse<CardData>(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async unlikeCard(cardId: string): Promise<CardData> {
    try {
      const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this.headers,
      });
      return await this.handleResponse<CardData>(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
