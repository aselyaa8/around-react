import React, { useState } from 'react';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';




function App() {


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
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setEditAvatarModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} />
      <Footer />
      
      <PopupWithForm isOpen={isEditProfileModalOpen} onClose={handleCloseAllModals} title={"Edit profile"} name="edit" />
      <PopupWithForm isOpen={isAddPlaceModalOpen} onClose={handleCloseAllModals} title={"New place"} name="add" />
      <PopupWithForm isOpen={isEditAvatarModalOpen} onClose={handleCloseAllModals} title={"Change profile picture"} name="avatar-edit" />

      <ImagePopup card={selectedCard} onClose={handleCloseAllModals} />

      <div className="modal modal-delete-confirm">
        <div className="modal__container">
          <form className="form form-delete-confirm" name="delete-confirm">
            <h2 className="form__heading">Are you sure?</h2>
            <button aria-label="delete-confirm" type="submit" className="form__save-button">Yes</button>
          </form>
          <button aria-label="Close" type="button" className="modal__close-button"></button>
        </div>
      </div>
    </div>
  );
}

export default App;
