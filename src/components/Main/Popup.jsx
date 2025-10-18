export default function Popup({ onClose, title, children }) {
  return (
    <div className="popup popup_opened">   
      <div className="popup__form">        
        <button
          aria-label="Cerrar ventana modal"
          className="popup__button_close" 
          type="button"
          onClick={onClose}
        />
        
        {title && <h3 className="popup__subtitle">{title}</h3>}

        <div className="popup__content">{children}</div>
      </div>
    </div>
  );
}



