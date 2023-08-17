function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_big-photo ${card ? 'popup_opened' : ''}`}>
      <figure className="popup__container popup__container_type_big-photo">
        <button className="popup__button-close popup__button-close_type_big-photo" type="button"
          aria-label="Закрыть окно" onClick={onClose}></button>
        <img className="popup__big-size-photo" src={card ? card.link : '#'} alt={card ? card.name : ''} />
        <figcaption className="popup__big-size-title">{card ? card.name : ''}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
