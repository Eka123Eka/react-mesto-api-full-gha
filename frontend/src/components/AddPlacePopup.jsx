import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm name='add-photo' title='Новое место' isOpen={isOpen}
      onClose={onClose} onSubmit={handleSubmit} buttonText='Добавить'>
      <label className="popup__label">
        <input className="popup__input-field" name="place-input" type="text" placeholder="Назовите место"
          minLength="2" maxLength="30" onChange={handleNameChange} value={name} required />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__input-field" name="urlImage-input" type="url"
          placeholder="Вставьте ссылку на фото места" onChange={handleLinkChange} value={link} required />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
