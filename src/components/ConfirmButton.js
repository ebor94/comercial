import React from 'react';
import './ConfirmButton.css';

const ConfirmButton = ({cotizacion}) => {
  
    const handleClick = (message) => {
        alert(message);
      };


  return (
    <button   className="confirm-button" onClick={() => handleClick(cotizacion)}>
    Confirmar Cotizacion
  </button>
  );
};

export default ConfirmButton;