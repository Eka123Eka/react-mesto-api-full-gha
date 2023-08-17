import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ deletedCard, onClose, handleCardDelete }) {

  function handleSubmit(e) {
    e.preventDefault();
    handleCardDelete(deletedCard);
  }

  return (
    <PopupWithForm name='remove-card' title='Вы уверены?' buttonText='Да' isOpen={deletedCard} onClose={onClose}
      onSubmit={handleSubmit}>
    </PopupWithForm>
  );
}

export default ConfirmDeletePopup;
