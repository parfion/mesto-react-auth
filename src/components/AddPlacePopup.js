import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from 'react';

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading }) {

  const placeNameRef = useRef(null);
  const placeLinkRef = useRef(null);

  useEffect(() => {
    placeNameRef.current.value='';
    placeLinkRef.current.value='';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value
    })
  }
  
  return (
    <PopupWithForm 
      id="addButton" 
      name="formCard" 
      title="Новое место" 
      isOpen={isOpen} 
      onClose={onClose} 
      buttonText={isLoading ? 'Сохранение...' : 'Создать' } 
      buttonLabelText={"Потвердить удаление карточки"} 
      onSubmit={handleSubmit} >
    
      <input 
        id="card-name-input" 
        className="popup__input popup__input_value_name-card" 
        ref={placeNameRef} 
        name="image" 
        type="text" 
        placeholder="Название" 
        minLength='2'
        maxLength='500' 
        required />
      <span className="card-name-input-error form__type-error"></span>

      <input 
        id="card-link-input" 
        className="popup__input popup__input_value_picture-card" 
        ref={placeLinkRef} 
        name="link" 
        type="url" 
        placeholder="Ссылка на картинку" 
        required />
      <span className="card-link-input-error form__type-error"></span>
  </PopupWithForm>
  )
};

export default AddPlacePopup;