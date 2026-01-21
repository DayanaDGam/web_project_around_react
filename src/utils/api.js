class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._token = null;
  }

  setToken(token) {
    this._token = token;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this._token}`,
    };
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me/`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards/`, {
      headers: this._getHeaders(),
    })
      .then(this._checkResponse)
      .then((data) => (Array.isArray(data) ? data : data?.cards || []));
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}cards/`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes/`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes/`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.dislikeCard(cardId);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}users/me/`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}users/me/avatar/`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
});
