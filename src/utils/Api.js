const { REACT_APP_API_URL } = process.env;

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
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
  }

  // Загрузка карточек с сервера
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
  }

  // Редактирование профиля
  setUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
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
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
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
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
  }

  // Поставить или убрать лайк
  changeLikeCardStatus(card, isLike) {
      return fetch(`${this._baseUrl}/cards/${card}/likes`, {
          method: !isLike ? "DELETE" : "PUT",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
  }

  // Обновление аватара пользователя
  editAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
              avatar: avatar,

          })
      })
      .then(this._checkResponse)
  }
}

const api = new Api({
	baseUrl: REACT_APP_API_URL,
	headers: {
	  'Content-Type': 'application/json'
	}
  }); 

export default api;