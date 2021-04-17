import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const nameInput = useRef("")
    const descriptionInput = useRef("")

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name:nameInput.current.value,
            link:descriptionInput.current.value
        });
    }
    
    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit} title={"New place"} name="add">
           <input ref={nameInput} id="name-input" type="text" name="name" className="form__input form__input_type_name" minLength="2"
          maxLength="40" placeholder="Title" required />
        <span id="name-input-error" className="form__input-error"></span>
        <input ref={descriptionInput} id="description-input" type="url" name="about" className="form__input form__input_type_description"
          minLength="2" maxLength="200" placeholder="Image link" required />
        <span id="description-input-error" className="form__input-error"></span>
        </PopupWithForm>
       
    );
}

export default AddPlacePopup;