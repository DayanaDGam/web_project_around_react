import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import avatarFallback from "../../images/avatar.jpg";
import EditProfile from "../EditProfile/EditProfile.jsx";
import NewCard from "../NewCard/NewCard.jsx";
import Card from "../Card/Card.jsx";

export default function Main({
  onOpenPopup,
  onClosePopup,     
  popup,            
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const openEditProfile = () =>
    onOpenPopup({ title: "Editar perfil", children: <EditProfile /> });

  const openNewCard = () =>
    onOpenPopup({
      title: "Nuevo lugar",
      children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
    });

  const openEditAvatar = openEditProfile;

  return (
    <main className="main">
      <section className="main__profile">
        <div className="main__content-image">
          <img
            src={currentUser?.avatar || avatarFallback}
            alt="Avatar"
            className="main__profile-image"
          />
        </div>

        <div className="main__content-paragraph">
          <h1 className="main__paragraph main__paragraph_name">
            {currentUser?.name || "—"}
          </h1>
          <p className="main__paragraph main__paragraph_about">
            {currentUser?.about || "—"}
          </p>
        </div>

        <button
          className="main__button main__button_edit"
          type="button"
          onClick={openEditProfile}
          aria-label="Editar perfil"
        />
        <button
          className="main__button main__button_add"
          type="button"
          onClick={openNewCard}
          aria-label="Agregar tarjeta"
        >
          +
        </button>
        <button
          className="main__button main__button_avatar"
          type="button"
          onClick={openEditAvatar}
          aria-label="Editar avatar (en el mismo popup)"
        >
          🖼️
        </button>
      </section>

      <section className="main__gallery">
        <ul className="cards__list">
          {cards?.map((card) => (
            <Card
              key={card._id}
              card={card}
              onLikeClick={() => onCardLike(card)}
              onDeleteClick={() => onCardDelete(card)}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

