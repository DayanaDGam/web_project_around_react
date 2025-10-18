export default function Popup({ onClose, title, children }) {
  return (
    <div className="popup popup_opened">   {/* 🔹 Se agrega la clase popup_opened */}
      <div className="popup__form">        {/* 🔹 usa popup__form que ya tienes en el CSS */}
        <button
          aria-label="Cerrar ventana modal"
          className="popup__button_close" 
          type="button"
          onClick={onClose}
        />
        
        {/* 🔹 título opcional */}
        {title && <h3 className="popup__subtitle">{title}</h3>}

        {/* 🔹 contenido dinámico */}
        <div className="popup__content">{children}</div>
      </div>
    </div>
  );
}



