import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from './Header';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete,
  email, onLogOut }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header to={'/sign-in'} onClick={onLogOut} textLink='Выйти'>
        <div className="header__item">{email}</div>
      </Header>
      <main>
        <section className="profile" aria-label="Редактирование профиля">
          <div className="profile__container">
            <div className="profile__avatar">
              <img className="profile__avatar-photo" src={currentUser.avatar} alt="Аватарка пользователя." />
              <button className="profile__avatar-button" type="button"
                aria-label="Обновление аватарки пользователя" onClick={onEditAvatar}></button>
            </div>
            <div className="profile__info">
              <div className="profile__edit">
                <h1 className="profile__name overflow-text">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button"
                  aria-label="Кнопка редактирования профиля." onClick={onEditProfile}></button>
              </div>
              <p className="profile__career overflow-text">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button"
            aria-label="Кнопка добавления фото." onClick={onAddPlace}></button>
        </section>
        <section className="cards" aria-label="секция с фотографиями посещенных мест">
          {cards.map((item) => (
            <Card
              currentCard={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={item._id}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default Main;
