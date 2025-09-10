export default function EditAvatar() {
  return (
    <form className="popup__form" name="edit-avatar" id="edit-avatar-form" noValidate>
      <label className="popup__field">
        <input
          className="popup__input"
          id="avatar-input"
          name="avatar"
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          required
        />
        <span className="popup__error" id="avatar-input-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
