import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser, handleUpdateAvatar } =
    useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    setName(currentUser.name || "");
    setAbout(currentUser.about || "");
    setAvatar(currentUser.avatar || "");
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await handleUpdateUser({ name, about });
      if (avatar && avatar !== currentUser?.avatar) {
        await handleUpdateAvatar(avatar);
      }
    } catch (err) {
      console.error("Error guardando perfil:", err);
    }
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <div className="popup__field">
        <input
          type="text"
          name="name"
          id="owner-name"
          className="popup__input popup__input_type_name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__input-error" id="owner-name-error" />
      </div>

      <div className="popup__field">
        <input
          type="text"
          name="about"
          id="owner-about"
          className="popup__input popup__input_type_description"
          placeholder="Profesión / Acerca de mí"
          required
          minLength="2"
          maxLength="200"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <span className="popup__input-error" id="owner-about-error" />
      </div>

      {/* Avatar */}
      <h3 className="popup__subtitle" style={{ marginTop: 8 }}>
        Actualizar avatar
      </h3>
      <div className="popup__field">
        <input
          type="url"
          name="avatar"
          id="owner-avatar"
          className="popup__input popup__input_type_url"
          placeholder="https://… (URL de imagen)"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <span className="popup__input-error" id="owner-avatar-error" />
      </div>

      <button type="submit" className="popup__button popup__button_save">
        Guardar
      </button>
    </form>
  );
}
