class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getUserInfoServer() {
    return this._request("/users/me", { headers: this._headers }, `getUserInfo - `);
  }
  getInitialCards() {
    return this._request("/cards", { headers: this._headers }, `getInitialCards - `);
  }
  sendUserInfo(dataUser) {
    return this._request("/users/me", {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(dataUser)
    }, `PATCH ${dataUser.name}, ${dataUser.about} - `);
  }
  addNewCardServer(dataCard) {
    return this._request("/cards", {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataCard)
    }, `POST ${dataCard.link} - `);
  }
  deleteCardServer(idCard) {
    return this._request(`/cards/${idCard}`, {
      headers: this._headers,
      method: 'DELETE',
    }, `DELETE ${idCard} - `);
  }
  toogleLikeServer(idCard, isLike) {
    return this._request(`/cards/${idCard}/likes`, {
      headers: this._headers,
      method: isLike ? 'DELETE' : 'PUT'
    }, `TOGGLE like ${idCard} isLike = ${isLike} - `);
  }
  sendAvatar(urlAvatar) {
    return this._request("/users/me/avatar", {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: urlAvatar })
    }, `PATCH Avatar ${urlAvatar} - `);
  }

  async _request(url, props, sourceError) {
    props.headers.authorization =  `Bearer ${localStorage.getItem('JWT')}`;
    //const res = await fetch(`${this._baseUrl}${url}`, {...props, headers: { ...props.headers, authorization: `Bearer ${localStorage.getItem('JWT')}` }});
    const res = await fetch(`${this._baseUrl}${url}`, props);
    return this._checkResponse(res, sourceError);
  }

  _checkResponse(res, sourceError) {
    if (res.ok) {
      return res.json() //Promise.resolve(res.json());?
    } else {
      return Promise.reject(`${sourceError}${res.status}(${res.statusText})`)
    }
  }
}

const api = new Api({
  baseUrl: 'https://api.elkod.nomoreparties.co',
  //baseUrl: 'http://127.0.0.1',
  headers: {
    authorization: '',//'78fa951e-0cae-4fbe-aca5-f0de42ec035a',//сменить на получение токена с хранилища
    'Content-Type': 'application/json'
  }
});

export default api;
