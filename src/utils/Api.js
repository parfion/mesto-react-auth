class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._checkResponse = this._checkResponse.bind(this)
    }

    // проверка
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
          }
    
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
      };
    
    // Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Редактирование профиля
    setUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkResponse)
    }

    // Добавление новой карточки
    createNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
              name,
              link
            })
        })
        .then(this._checkResponse)
    }

    // Удаление карточки
    deleteCard(card) {
        return fetch(`${this._baseUrl}/cards/${card}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Поставить или убрать лайк
    changeLikeCardStatus(card, isLike) {
        return fetch(`${this._baseUrl}/cards/${card}/likes`, {
            method: !isLike ? "DELETE" : "PUT",
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Обновление аватара пользователя
    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar,

            })
        })
        .then(this._checkResponse)
    }
}

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
	headers: {
	  authorization: 'b2eb4ceb-9d74-43f2-a64d-7dea4a8d5d3c',
	  'Content-Type': 'application/json'
	}
  }); 

export default api;