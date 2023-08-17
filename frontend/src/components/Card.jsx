import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ currentCard, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentCard.owner._id === currentUser._id;
  const isLiked = [...currentCard.likes].some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);

  function handleCardClick() {
    onCardClick(currentCard);
  }

  function handleLikeClick() {
    onCardLike(currentCard);
  }

  function handleDeleteClick() {
    onCardDelete(currentCard);
  }

  return (
    <article className="card">
      <img className="card__image" src={currentCard.link} alt={currentCard.name} onClick={handleCardClick} />
      {isOwn && <button className="card__trash-button" type="button"
        aria-label="Удалить карточку" onClick={handleDeleteClick}></button>}
      <div className="card__group">
        <h2 className="card__title overflow-text">{currentCard.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} type="button"
            aria-label="иконка лайк со счетчиком" onClick={handleLikeClick}></button>
          <p className="card__like-counter">{[...currentCard.likes].length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
