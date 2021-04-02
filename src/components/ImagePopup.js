
function ImagePopup(props) {
    let imageModalClass;
    if(Object.keys(props.card).length !== 0){
        imageModalClass = 'modal_opened'
    } else {
        imageModalClass = '';
    }

    return (
        <div className = {`modal modal-figure ${imageModalClass}`}>
            <div className="modal__container">
                <figure className="modal__figure">
                    <img src={props.card.link} alt="nice place opened" className="modal__image" />
                    <figcaption className="modal__image-caption">{props.card.name}</figcaption>
                </figure>
                <button aria-label="Close" type="button" className="modal__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;