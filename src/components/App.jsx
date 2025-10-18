import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Popup from "./Main/Popup.jsx";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [cards, setCards] = useState([]);

  const [popup, setPopup] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [user, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        setCurrentUser(user);
        setCards(initialCards);
      } catch (err) {
        console.error("Error cargando datos iniciales:", err);
      }
    })();
  }, []);

  function handleOpenPopup(p) {
    setPopup(p);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  async function handleUpdateUser({ name, about }) {
    try {
      const newUser = await api.updateUserInfo({ name, about });
      setCurrentUser(newUser);
      handleClosePopup();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
    }
  }

  async function handleUpdateAvatar(avatarUrl) {
    try {
      const newUser = await api.updateAvatar(avatarUrl);
      setCurrentUser(newUser);
      handleClosePopup();
    } catch (err) {
      console.error("Error al actualizar avatar:", err);
    }
  }

  async function handleCardLike(card) {
    try {
      const toggled = await api.changeLikeCardStatus(card._id, !card.isLiked);
      setCards((prev) =>
        prev.map((c) => (c._id === card._id ? toggled : c))
      );
    } catch (err) {
      console.error("Error al cambiar like:", err);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((prev) => prev.filter((c) => c._id !== card._id));
    } catch (err) {
      console.error("Error al eliminar tarjeta:", err);
    }
  }

  async function handleAddPlaceSubmit({ name, link }) {
    try {
      const newCard = await api.addNewCard({ name, link });
      setCards((prev) => [newCard, ...prev]);
      handleClosePopup();
    } catch (err) {
      console.error("Error al crear tarjeta:", err);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <Footer />

        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}
