import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from 'react';

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef(null);

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return(
    <PopupWithForm 
      id="popupAvatar" 
      name="formEditAvatar" 
      title="Обновить аватар" isOpen={isOpen} 
      onClose={onClose} 
      buttonText={`Сохранить`} 
      buttonLabelText={"Сохранить новый аватар"} 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
      loadingButton={'Сохранение...'}>
      
      <input 
        id="avatar-link-input" 
        className="popup__input popup__input_value_picture-card" 
        name="link" 
        type="url" 
        placeholder="Ссылка на картинку" 
        ref={avatarRef} 
        minLength='2' 
        maxLength='500' 
        required />
      <span className="avatar-link-input-error form__type-error"></span>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;