// src/components/OrderItem.js
import React from 'react';
import '../../assets/css/OrderItem.css';

// import { FaCheckCircle } from "react-icons/fa";
// import { MdCancel } from "react-icons/md";

const OrderItem2 = ({ image, name, quantity, price, totalPos, pvp }) => {
   const priceConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price); 
   const totalPosConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalPos);   
   const pvpConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(pvp);   
   const TotalpvpConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(pvp * quantity );  
   const margenpos =  (((pvp - price) / pvp ) * 100).toFixed(2)
   const  margenPlata =  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format((pvp * quantity) - (price * quantity) );  
  return (
    <div className="order-item">
      <div className="order-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="order-item-details">
        <div className="order-item-name">{name}</div>
        <div className="order-item-quantity">Cantidad: <b>{quantity}</b></div>
        <div className="order-item-price">Precio m2: <b>{priceConvert}</b>  / Pvp : <b>{pvpConvert}</b></div>
        <div className="order-item-price">Total Producto: <b>{totalPosConvert}</b> / Total Pvp  : <b>{TotalpvpConvert}</b></div>
        <div className="order-item-name">Margen :  {margenpos} % | {margenPlata}   
            {/* {margenpos > 42 ? (
            <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
          ) : (
            <MdCancel style={{ color: 'red', fontSize: '24px' }} />
          )} */}
        
        
        </div>
        <div className="order-item-name"> </div>
      </div>
    </div>
  );
};

export default OrderItem2;
