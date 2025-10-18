import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Popup from "./Main/Popup.jsx";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
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
      } catch (e) {
        console.error("init error:", e);
      }
    })();
  }, []);

  function handleOpenPopup(p) {
    setPopup(p);
    console.log("[App] Abriendo popup:", p?.title ?? p);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  async function handleUpdateAvatar(payload) {
    try {
      const avatarUrl =
        typeof payload === "string" ? payload : payload?.avatar?.trim();

      if (!avatarUrl) {
        console.warn("handleUpdateAvatar: URL vacía");
        return;
      }

      const updated = await api.updateAvatar(avatarUrl);
      setCurrentUser(updated);
      handleClosePopup();
    } catch (err) {
      console.error("⛔ update avatar:", err);
    }
  }

  async function handleUpdateUser(data) {
    try {
      const updated = await api.updateUserInfo(data);
      setCurrentUser(updated);
      handleClosePopup();
    } catch (e) {
      console.error("update user:", e);
    }
  }

  async function handleCardLike(card) {
    try {
      const toggled = await api.changeLikeCardStatus(card._id, !card.isLiked);
      setCards((s) => s.map((c) => (c._id === card._id ? toggled : c)));
    } catch (e) {
      console.error("like:", e);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((s) => s.filter((c) => c._id !== card._id));
    } catch (e) {
      console.error("delete:", e);
    }
  }

  async function handleAddPlaceSubmit({ name, link }) {
    try {
      const newCard = await api.addNewCard({ name, link });
      setCards((s) => [newCard, ...s]);
      handleClosePopup();
    } catch (e) {
      console.error("add card:", e);
    }
  }

  const ctxValue = {
    currentUser,
    handleUpdateUser,
    handleUpdateAvatar,
  };

  return (
    <CurrentUserContext.Provider value={ctxValue}>
      <div className="page__content">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
        />

        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            <div className="popup__content">{popup.children}</div>
          </Popup>
        )}
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}



