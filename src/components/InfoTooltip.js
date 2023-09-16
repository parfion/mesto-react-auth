function InfoTooltip ({ isOpen, onClose, text, image }) {  
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container-register">
        <img className="popup__register-done" alt="Регистрация" src={image}></img>
        <h2 className="popup__title popup__title-register">{text}</h2>
        <button className="popup__close-button popup__close-button_profile" type="button" 
        aria-label="Закрыть попап профайла" onClick={onClose}></button>
      </div>
  </div>
)
};
  
export default InfoTooltip;