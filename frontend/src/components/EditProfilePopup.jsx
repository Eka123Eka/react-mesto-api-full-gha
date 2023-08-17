import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm name='edit-profile' title='Редактировать профиль' isOpen={isOpen}
      onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <label className="popup__label">
        <input className="popup__input-field" name="name-input" type="text" placeholder="Имя"
          minLength="2" maxLength="40" required value={name || ''} onChange={handleSetName} />
        <span className="popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__input-field" name="career-input" type="text" placeholder="Род занятий"
          minLength="2" maxLength="200" required value={description || ''} onChange={handleSetDescription} />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
