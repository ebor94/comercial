// src/components/OrderItem.js
import React from 'react';
import './OrderItem.css';

const OrderItem = ({ image, name, quantity, price, totalPos }) => {
   const priceConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price); 
   const totalPosConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalPos);   
  return (
    <div className="order-item">
      <div className="order-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="order-item-details">
        <div className="order-item-name">{name}</div>
        <div className="order-item-quantity">Cantidad: <b>{quantity}</b></div>
        <div className="order-item-price">Precio m2: <b>{priceConvert}</b></div>
        <div className="order-item-price">Total Producto: <b>{totalPosConvert}</b></div>
      </div>
    </div>
  );
};

export default OrderItem;
