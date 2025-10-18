import { useRef, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar, currentUser } = useContext(CurrentUserContext);
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const url = inputRef.current.value.trim();
    if (!url) return;
    handleUpdateAvatar({ avatar: url });
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <h3 className="popup__subtitle">Actualizar avatar</h3>

      <div className="popup__field">
        <input
          ref={inputRef}
          type="url"
          name="avatar"
          className="popup__input"
          placeholder="https://…"
          defaultValue={currentUser?.avatar || ""}
          required
        />
        <span className="popup__input-error" />
      </div>

      <button type="submit" className="popup__button_save">
        Guardar
      </button>
    </form>
  );
}
