function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_image_opacity ${card ? "popup_opened" : ''}`}>
        <div className="popup__open-picture">
          <img className="popup__picture" alt={card?.name} src={card?.link} />
          <p className="popup__name">{card?.name}</p>
          <button className="popup__close-button popup__close-button_picture" type="button" 
          aria-label="Закрыть увеличенную карточку" onClick={onClose}></button>
        </div>
    </div>
  )
};

export default ImagePopup;