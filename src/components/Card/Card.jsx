export default function Card({ card, onImageClick }) {
  const { name, link } = card;

  return (
    <li className="main__gallery-card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(card)}
      />

      <button
        aria-label="Delete card"
        className="card__button_trash"
        type="button"
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className="card__like-button"
        />
      </div>
    </li>
  );
}

