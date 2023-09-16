import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useContext, useEffect } from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription]= useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return(
    <PopupWithForm 
      id="editButton" 
      name="formProfile" 
      title="Редактировать профиль" 
      isOpen={isOpen} 
      onClose={onClose} 
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить' } 
      buttonLabelText={"Сохранить личные данные"} 
      onSubmit={handleSubmit} >
    
      <input 
        id="profile-input" 
        className="popup__input popup__input_value_name" 
        name="name" 
        type="text" 
        required 
        minLength="2" 
        maxLength="40" 
        placeholder="Имя" 
        value={name || ''} 
        onChange={handleNameChange} />
      <span className="profile-input-error form__type-error"></span>

      <input 
        id="profession-input" 
        className="popup__input popup__input_value_profession" 
        name="profession" 
        type="text" 
        required 
        minLength="2" 
        maxLength="200" 
        placeholder="Вид деятельности" 
        value={description || ''} 
        onChange={handleDescriptionChange} />
      <span className="profession-input-error form__type-error"></span>
  </PopupWithForm>
  )
}

export default EditProfilePopup;