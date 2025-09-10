export default function EditProfile() {
  return (
    <form className="popup__form" name="edit-profile" id="edit-profile-form" noValidate>
      <label className="popup__field">
        <input
          className="popup__input"
          id="name-input"
          name="name"
          type="text"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error" id="name-input-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input"
          id="about-input"
          name="about"
          type="text"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error" id="about-input-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
