// src/components/OrderTotal.js
import React from 'react';
import './OrderTotal.css';

const OrderTotal = ({ items, taxRate }) => {
  const calculateSubtotal = () => {
   // return items.reduce((sum, item) => sum + item.vneto * item.cntped, 0);
   return items.reduce((sum, item) => sum + item.vneto, 0);
  };

  const subtotal = calculateSubtotal();
  const subtotalConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal);
  const taxes = subtotal * taxRate;
  const taxesConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal * taxRate);
  const total =  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal + taxes);

  return (
    <div className="order-total">
      <div className="order-total-row">
        <span className="label">Subtotal:</span>
        <span className="value">{subtotalConvert}</span>
      </div>
      <div className="order-total-row">
        <span className="label">IVA ({(taxRate * 100)}%):</span>
        <span className="value">{taxesConvert}</span>
      </div>
      <div className="order-total-row total">
        <span className="label">Total:</span>
        <span className="value">{total}</span>
      </div>
    </div>
  );
};

export default OrderTotal;
