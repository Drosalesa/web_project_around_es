import type { ApiCard } from "../types/types.js";
import type {ApiUserInfo } from "../types/types.js"

export class Api {
  private readonly apiUrl: string;
  private readonly headers: HeadersInit;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;

    this.headers = {
      authorization: "ff6ba0a7-3c3d-4270-8310-5f0e5ff66a4a",
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(`${this.apiUrl}${endpoint}`, {
      headers: this.headers,
      ...options,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return res.json() as Promise<T>;
  }

  getUser(): Promise<ApiUserInfo> {
    return this.request<ApiUserInfo>("users/me");
  }

  getCards(): Promise<ApiCard[]> {
    return this.request<ApiCard[]>("cards");
  }

  patchUser({
    name,
    description,
  }: {
    name: string;
    description: string;
  }): Promise<ApiUserInfo> {
    return this.request<ApiUserInfo>("users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name,
        about: description,
      }),
    });
  }

  postNewCard({
    name,
    link,
  }: {
    name: string;
    link: string;
  }): Promise<ApiCard> {
    return this.request<ApiCard>("cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  toggleLike(cardId: string, isLiked: boolean): Promise<ApiCard> {
    return isLiked
      ? this.removeLike(cardId)
      : this.addLike(cardId);
  }

  addLike(cardId: string): Promise<ApiCard> {
    return this.request<ApiCard>(`cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  removeLike(cardId: string): Promise<ApiCard> {
    return this.request<ApiCard>(`cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${this.apiUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
  }

  editAvatar(avatar: string): Promise<ApiUserInfo> {
    return this.request<ApiUserInfo>("users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }
}