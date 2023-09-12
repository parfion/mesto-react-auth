import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button id="avatarEdit" className="profile__avatar-edit" type="button" 
        aria-label="Открыть попап редактирования аватара" onClick={props.onEditAvatar}>
          <img className="profile__avatar" name="avatar" alt="Аватар пользователя" src={currentUser.avatar} />
        </button>

        <div className="profile__info">
          <div className="profile__name-flex">
            <h1 className="profile__info-name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Открыть попап профайла" 
            onClick={props.onEditProfile}></button> 
          </div>
          <p className="profile__info-profession">{currentUser.about}</p> 
        </div>
        <button className="profile__add-button" type="button" aria-label="Открыть попап создания карточки"
        onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards.map((item) => (
          <Card 
            key={item._id} 
            card={item} 
            name={item.name} 
            src={item.link} 
            likes={item.likes.length}
            onCardClick={props.onCardClick} 
            onCardLike={props.onCardLike} 
            onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  )
};

export default Main;