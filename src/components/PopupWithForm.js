function PopupWithForm(props) {
  let modalClassName = `modal modal-${props.name}`;
  modalClassName = modalClassName + (props.isOpen ? ' modal_opened' : '');

  return (
    <div className={modalClassName}>
      <div className="modal__container">
        <form className="form" name="edit-profile">
          <h2 className="form__heading">{props.title}</h2>
          <input id="name-input" type="text" name="name" className="form__input form__input_type_name" minLength="2"
            maxLength="40" required />
          <span id="name-input-error" className="form__input-error"></span>
          <input id="description-input" type="text" name="about" className="form__input form__input_type_description"
            minLength="2" maxLength="200" required />
          <span id="description-input-error" className="form__input-error"></span>
          <button aria-label="Submit" type="submit" className="form__save-button">Save</button>
        </form>
        <button aria-label="Close" type="button" className="modal__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;