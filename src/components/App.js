import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from "../utils/Api";
import { useState } from 'react';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect } from 'react';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, serCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      serCurrentUser(userData);
      setCards(cardsData);
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setDeleteCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleCardClick(data) {
    setSelectedCard(data);
  };

  function handleCardLike(card) {
    setIsLoading(true);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false))
  };

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((item) => card._id !== item._id ));
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .setUserInfo(user.name, user.about)
      .then(res => {
        serCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api
      .editAvatar(user.avatar)
      .then(res => {
        serCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .createNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setDeleteCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
          isLoading={isLoading}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} 
          isLoading={isLoading}
        />

        <DeleteCardPopup 
          isOpen={isDeleteCardPopupOpen} 
          onClose={closeAllPopups} 
          onCardDelete={handleCardDelete} 
          deleteCard={deleteCard} 
          isLoading={isLoading}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          isLoading={isLoading}
        />

        <ImagePopup 
          id="popupImage" 
          card={selectedCard} 
          onClose={closeAllPopups} 
          isLoading={isLoading}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
