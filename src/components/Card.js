function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="card">
            <button aria-label="delete" type="button" className="card__delete-button"></button>
            <img src={props.card.link} alt="nice place" className="card__image" onClick={handleClick} />
            <h2 className="card__text">{props.card.name}</h2>
            <div className="card__like">
                <button aria-label="Like" type="button" className="card__like-button card__like-button_disabled"></button>
                <div className="card__like-overlay"></div>
                <p className="card__like-count">{props.card.likes.length}</p>
            </div>
        </div>
    );
}

export default Card;