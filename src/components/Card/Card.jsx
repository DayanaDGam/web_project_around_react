// src/components/Card/Card.jsx
const noop = () => {};

export default function Card({
  card,
  onImageClick = noop,
  onCardLike = noop,
  onCardDelete = noop,
}) {
  const { name, link, isLiked } = card;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  return (
    <li className="main__gallery-card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={onImageClick}
      />

      <button
        aria-label="Delete card"
        className="card__button_trash"
        type="button"
        onClick={onCardDelete}       // ✅ usa el handler correcto
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={onCardLike}       // ✅ usa el handler correcto
        />
      </div>
    </li>
  );
}
