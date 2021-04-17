import api from "../utils/api";
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // const [cards, setCards] = useState([]);

    // useEffect(() => {
    //     api.getInitialCards().then((res) => {
    //         const initialCards = res.map((card) => {return card});
    //         setCards(initialCards);
    //     }).catch((err) => {
    //         console.log(err); 
    //     });
    // }, []);
    // function handleCardLike(card) {
    //     const isLiked = card.likes.some(i => i._id === currentUser._id);
    //     if (isLiked) {
    //         api.removeLike(card._id).then((newCard) => {
    //             setCards(cards.map((c) => {
    //                 return c._id === newCard._id ? newCard : c
    //             }))
    //         }).catch((err) => {
    //             console.log(err); 
    //         });
    //     } else {
    //         api.addLike(card._id).then((newCard) => {
    //             setCards(cards.map((c) => {
    //                 return c._id === newCard._id ? newCard : c
    //             }))
    //         }).catch((err) => {
    //             console.log(err); 
    //         });
    //     }
    // }
    // function handleCardDelete(card){
    //     api.deleteCard(card._id).then(()=>{
    //         setCards(cards.filter((c) => {
    //            return c._id !== card._id; 
    //         }))
    //     })
    // }
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={currentUser.avatar} alt="portrait of user" className="profile__avatar" />
                    <div className="profile__avatar-edit-container">
                        <button aria-label="Edit" type="button" className="profile__avatar-edit" onClick={props.onEditAvatar}></button>
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button aria-label="Edit" type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button aria-label="Add" type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                {props.cards.map((card) => {
                    return <Card key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.handleCardLike}
                        onCardDelete={props.handleCardDelete}
                    />;
                })}
            </section>
        </main>
    );
}

export default Main;