export default function RemoveCard() {
  return (
    <form
      className="popup__form"
      name="remove-card-form"
      id="remove-card-form"
      noValidate
    >
      <h3 className="popup__title">¿Estás seguro?</h3>
      <button className="popup__button popup__button_confirm" type="submit">
        Sí
      </button>
    </form>
  );
}
