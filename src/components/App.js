import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import successIcon from '../images/successIcon.svg';
import errorIcon from '../images/errorIcon.svg';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfilePopup, setIsLoadingProfilePopup] = useState(false);
  const [isLoadingAddPlacePopup, setIsLoadingAddPlacePopup] = useState(false);
  const [isLoadingDeleteCardPopup, setIsLoadingDeleteCardPopup] = useState(false);
  const [isLoadingEditAvatarPopup, setIsLoadingEditAvatarPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardToDelete(card);
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
    setIsLoadingDeleteCardPopup(true);
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((item) => card._id !== item._id ));
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoadingDeleteCardPopup(false));
  };

  function handleUpdateUser(user) {
    setIsLoadingProfilePopup(true);
    api
      .setUserInfo(user.name, user.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoadingProfilePopup(false));
  };

  function handleUpdateAvatar(user) {
    setIsLoadingEditAvatarPopup(true);
    api
      .editAvatar(user.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoadingEditAvatarPopup(false));
  };

  function handleAddPlaceSubmit(data) {
    setIsLoadingAddPlacePopup(true);
    api
      .createNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
      .finally(() => setIsLoadingAddPlacePopup(false));
  };

  function handleRegister({email, password}) {
    setIsLoading(true);
    auth
      .register(email, password)
      .then((res) => {
        setIsSuccessRegistration(true);
        setIsInfoTooltipOpen(true);
        navigate('/signin');
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
        setIsSuccessRegistration(false);
        setIsInfoTooltipOpen(true);
      })
  };

  function handleLogin({email, password}) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if(res.token) {
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
          navigate('/', {replace: true});
          return res;
        } 
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  };

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) { checkToken(jwt) }
  }, [loggedIn])

  function checkToken(jwt) { 
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
        setLoggedIn(true);
        setEmail(res.data.email);
        navigate('/', {replace: true})
        }
      })
      .catch((err) => console.error(`Ошибка: ${err}`))
  } 

  function handleExit() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onExit={handleExit}/>

        <Routes>
          <Route path="/signup" element={<Register onRegister={handleRegister}/>} />
          <Route path="/signin" element={<Login onLogin={handleLogin}/>} />
          <Route path="/" element={ <ProtectedRoute 
            element={Main} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}  
            loggedIn={loggedIn} />} 
          /> 
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
          isLoading={isLoadingProfilePopup}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} 
          isLoading={isLoadingAddPlacePopup}
        />

        <DeleteCardPopup 
          isOpen={isDeleteCardPopupOpen} 
          onClose={closeAllPopups} 
          onCardDelete={handleCardDelete} 
          cardToDelete={cardToDelete} 
          isLoading={isLoadingDeleteCardPopup}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
          isLoading={isLoadingEditAvatarPopup}
        />

        <ImagePopup 
          id="popupImage" 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />

        <InfoTooltip 
          isOpen={isInfoTooltipOpen} 
          onClose={closeAllPopups} 
          text={isSuccessRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          image={isSuccessRegistration ? successIcon : errorIcon}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;