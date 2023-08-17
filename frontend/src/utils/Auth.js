class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  register({ email, password }) {
    return this._request("/signup", {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ email, password })
    }, `POST ${email}, "and input password" - `);
  }

  checkToken(token) {
    return this._request("/users/me", {
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }, `POST ${token} - `);
  }

  signIn({ email, password }) {
    return this._request("/signin", {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ email, password })
    }, `POST ${email}, "and input password" - `);
  }

  _checkResponse(res, sourceError) {
    return res.ok
      ? res.json()
      : Promise.reject(`${sourceError}${res.status}(${res.statusText})`)
  }

  async _request(url, props, sourceError) {
    const res = await fetch( `${this._baseUrl}${url}`, props );
    return this._checkResponse(res, sourceError);
  }
}

const auth = new Auth({
  baseUrl: 'https://api.elkod.nomoreparties.co',
  //baseUrl: 'http://127.0.0.1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;
