import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm name='change-avatar' title='Обновить аватар' isOpen={isOpen}
      onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <label className="popup__label">
        <input className="popup__input-field" name="urlAvatar-input" type="url"
          placeholder="Вставьте ссылку на новый аватар" ref={avatarRef} required />
        <span className="popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
