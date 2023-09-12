import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup ({ isOpen, onClose, deleteCard, onCardDelete, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(deleteCard);
  }
  
  return (
    <PopupWithForm 
      id="formDeleteCard" 
      title="Вы уверены?" 
      name="formDeleteCard" 
      isOpen={isOpen} 
      onClose={onClose} 
      buttonText={isLoading ? 'Удаление...' : 'Да' } 
      buttonLabelText={"Потвердить удаление карточки"} 
      onSubmit={handleSubmit} >
    </PopupWithForm>
  )
};

export default DeleteCardPopup;