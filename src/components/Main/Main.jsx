import { useState } from "react";
import avatar from "../../images/avatar.jpg";
import Popup from "./Popup.jsx";
import NewCard from "../NewCard/NewCard.jsx";
import EditProfile from "../EditProfile/EditProfile.jsx";
import EditAvatar from "../Avatar/EditAvatar.jsx";
import RemoveCard from "../RemoveCard/RemoveCard.jsx";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";
import Card from "../Card/Card.jsx";

const cards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link:
      "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link:
      "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Editar avatar", children: <EditAvatar /> };

  const removeCardPopup = {
    title: "¿Estás seguro?",
    children: <RemoveCard />,
  };

  function getImagePopup(card) {
    return {
      title: null, 
      children: <ImagePopup card={card} onClose={handleClosePopup} />,
    };
  }

  function handleOpenPopup(p) {
    setPopup(p);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="main">

      <section className="main__profile">
        <div className="main__content-image">
          <img src={avatar} alt="Avatar" className="main__profile-image" />
        </div>

        <div className="main__content-paragraph">
          <h1 className="main__paragraph main__paragraph_name">Dayana Dávila</h1>
          <p className="main__paragraph main__paragraph_about">Estudiante</p>
        </div>

        <button
          className="main__button main__button_edit"
          type="button"
          onClick={() => handleOpenPopup(editProfilePopup)}
        />

        <button
          className="main__button main__button_add"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          +
        </button>

        <button
          className="main__button main__button_avatar"
          type="button"
          onClick={() => handleOpenPopup(editAvatarPopup)}
        >
          🖼️
        </button>
      </section>

      <section className="main__gallery">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onImageClick={() => handleOpenPopup(getImagePopup(card))}
              onDeleteClick={() => handleOpenPopup(removeCardPopup)}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
