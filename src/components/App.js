import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
      console.log(currentUser)
    }).catch((err) => {
      console.log(err);
    });

  }, []);

  function handleEditAvatarClick() {
    setEditAvatarModalOpen(true);
  }

  function handleEditProfileClick(userName, userDescription) {
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick} />
        <Footer />

        <PopupWithForm isOpen={isEditProfileModalOpen} onClose={handleCloseAllModals} title={"Edit profile"} name="edit" >
          <input id="name-input" type="text" name="name" className="form__input form__input_type_name" minLength="2"
            maxLength="40" placeholder="Name" required />
          <span id="name-input-error" className="form__input-error"></span>
          <input id="description-input" type="text" name="about" className="form__input form__input_type_description"
            minLength="2" maxLength="200" placeholder="About" required />
          <span id="description-input-error" className="form__input-error"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={isAddPlaceModalOpen} onClose={handleCloseAllModals} title={"New place"} name="add" inputOne={"Title"} inputTwo={"Image link"} >
          <input id="name-input" type="text" name="name" className="form__input form__input_type_name" minLength="2"
            maxLength="40" placeholder="Title" required />
          <span id="name-input-error" className="form__input-error"></span>
          <input id="description-input" type="url" name="about" className="form__input form__input_type_description"
            minLength="2" maxLength="200" placeholder="Image link" required />
          <span id="description-input-error" className="form__input-error"></span>
        </PopupWithForm>
        <PopupWithForm isOpen={isEditAvatarModalOpen} onClose={handleCloseAllModals} title={"Change profile picture"} name="avatar-edit">
          <input id="description-input" type="url" name="about" className="form__input form__input_type_description"
            minLength="2" maxLength="200" placeholder="url" required />
          <span id="description-input-error" className="form__input-error"></span>
        </PopupWithForm>

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
    </CurrentUserContext.Provider>
  );
}

export default App;
