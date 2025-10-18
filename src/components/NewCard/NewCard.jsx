import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit, onAfterSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await onAddPlaceSubmit?.({ name, link });
    setName("");
    setLink("");
    onAfterSubmit?.(); 
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <label className="popup__field">
        <input
          className="popup__input"
          placeholder="Título"
          name="card-name"
          minLength="1"
          maxLength="30"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <span className="popup__input-error" />
      </label>

      <label className="popup__field">
        <input
          className="popup__input"
          placeholder="Enlace de la imagen"
          name="link"
          type="url"
          required
          value={link}
          onChange={e => setLink(e.target.value)}
        />
        <span className="popup__input-error" />
      </label>

      <button className="popup__button popup__button_add" type="submit">
        Guardar
      </button>
    </form>
  );
}
