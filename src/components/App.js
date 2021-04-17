import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setEditAvatarModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((res) => {
      const initialCards = res.map((card) => { return card });
      setCards(initialCards);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.removeLike(card._id).then((newCard) => {
        setCards(cards.map((c) => {
          return c._id === newCard._id ? newCard : c
        }))
      }).catch((err) => {
        console.log(err);
      });
    } else {
      api.addLike(card._id).then((newCard) => {
        setCards(cards.map((c) => {
          return c._id === newCard._id ? newCard : c
        }))
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function handleEditAvatarClick() {
    setEditAvatarModalOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileModalOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceModalOpen(true);
  }

  function handleCloseAllModals() {
    setEditAvatarModalOpen(false);
    setEditProfileModalOpen(false);
    setAddPlaceModalOpen(false);
    setSelectedCard({});
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function handleUpdateUser({ name, about }) {
    api.updateUserInfo({ name, about }).then((res) => {
      setCurrentUser(res);
      handleCloseAllModals();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUserAvatar(avatar) {
    api.updateUserAvatar(avatar).then((res) => {
      setCurrentUser(res);
      handleCloseAllModals();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter((c) => {
        return c._id !== card._id;
      }))
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlace(card){
    api.postCard(card).then((newCard)=>{
      setCards([newCard, ...cards]);
      handleCloseAllModals();
    }).catch((err) => {
      console.log(err);
    });
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfileModalOpen} onClose={handleCloseAllModals} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarModalOpen} onClose={handleCloseAllModals} onUpdateUserAvatar={handleUpdateUserAvatar} />
        <AddPlacePopup isOpen={isAddPlaceModalOpen} onClose={handleCloseAllModals} onAddPlace={handleAddPlace}/>
        <ImagePopup card={selectedCard} onClose={handleCloseAllModals} />
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
