import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import auth from "../utils/Auth";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import AuthForm from "./AuthForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogIn, setIsLogIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccessReg, setSuccessReg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogIn) return;
    api.getUserInfoServer()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err));
    api.getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) => console.log(err));
  }, [isLogIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(currentCard) {
    setSelectedCard(currentCard);
  }

  function handleCardLike(currentCard) {
    const isLiked = [...currentCard.likes].some(i => i._id === currentUser._id);//!
    api.toogleLikeServer(currentCard._id, isLiked)
      .then((newCard) => setCards((state) => state.map((c) => c._id === currentCard._id ? newCard : c)))
      .catch((err) => console.log(err))
  }

  function handleCardDelete(currentCard) {
    api.deleteCardServer(currentCard._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== currentCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(dataUser) {
    api.sendUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.sendAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(dataCard) {
    api.addNewCardServer(dataCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const popupOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen
    || selectedCard || deletedCard || isInfoTooltipPopupOpen

  useEffect(() => {
    function closePopupEscButton(e) { if (e.key === 'Escape') { closeAllPopups() } };
    function handleClickOverlay(e) { if (e.target.classList.contains('popup_opened')) { closeAllPopups() } };

    if (popupOpen) {
      document.addEventListener('keydown', closePopupEscButton);
      document.addEventListener('mousedown', handleClickOverlay);
      return () => {
        document.removeEventListener('keydown', closePopupEscButton);
        document.removeEventListener('mousedown', handleClickOverlay);
      }
    }
  }, [popupOpen]);

  function handleConfirmCardDelete(currentCard) {
    setDeletedCard(currentCard);
  }

  useEffect(() => {
    const token = localStorage.getItem("JWT");
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          setEmail(res.data.email);//!
          setIsLogIn(true);
          navigate("/");
        })
        .catch((err) => {
          localStorage.removeItem("JWT");
          console.log(err)
        });
    }
  }, [navigate]);//, был isLogIn

  function handleRegister(inputData) {
    auth.register(inputData)
      .then(() => {
        handleInfoTooltip({ isSuccessReg: true });
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({ isSuccessReg: false });
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));
  }

  function handleAuthorization(authData) {
    auth.signIn(authData)
      .then(res => {
        res.token && localStorage.setItem('JWT', res.token);
        setEmail(authData.email);
        setIsLogIn(true);
        navigate("/");
      })
      .catch((err) => { console.log(err) });
  }

  function handleLogOut() {
    localStorage.removeItem("JWT");
    setIsLogIn(false);
  }

  function handleInfoTooltip({ isSuccessReg }) {
    setSuccessReg(isSuccessReg);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Routes>
            <Route path='/' element={<ProtectedRoute element={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmCardDelete}
              isLogIn = {isLogIn}
              email={email}
              onLogOut={handleLogOut} />}>
            </Route>
            <Route path='/signup'
              element={<AuthForm nameForm='register' onSubmit={handleRegister} />}>
            </Route>
            <Route path='/signin'
              element={<AuthForm nameForm='login' onSubmit={handleAuthorization} />}>
            </Route>
            <Route path='*' element={isLogIn ? <Navigate to='/' /> : <Navigate to='/signin' />} />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <ConfirmDeletePopup
            deletedCard={deletedCard}
            onClose={closeAllPopups}
            handleCardDelete={handleCardDelete}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccessReg}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
