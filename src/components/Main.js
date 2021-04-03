import api from "../utils/api";
import React, { useState, useEffect } from 'react';
import Card from "./Card";

function Main(props) {

    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo().then((res) => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
        }).catch((err) => {
            console.log(err);
        });

    }, []);

    useEffect(() => {
        api.getInitialCards().then((res) => {
            const initialCards = res.map((card) => ({
                name: card.name,
                link: card.link,
                likes: card.likes,
                ownerId: card.owner._id,
                cardId: card._id
            }));
            setCards(initialCards);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={userAvatar} alt="portrait of user" className="profile__avatar" />
                    <div className="profile__avatar-edit-container">
                        <button aria-label="Edit" type="button" className="profile__avatar-edit" onClick={props.onEditAvatar}></button>
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button aria-label="Edit" type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button aria-label="Add" type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                {cards.map((card, i) => {
                    return <Card key={i}
                        card={card}
                        onCardClick={props.onCardClick}
                    />;
                })}
            </section>
        </main>
    );
}

export default Main;