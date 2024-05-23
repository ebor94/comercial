// src/components/OrderTotal.js
import React from 'react';
import '../../assets/css/OrderTotal.css';

import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const OrderTotal = ({ items, taxRate, onValueChange  }) => {
  const calculateSubtotal = () => {
   // return items.reduce((sum, item) => sum + item.vneto * item.cntped, 0);
   return items.reduce((sum, item) => sum + item.vneto, 0);
  };
  const calculateSubtotalPvp = () => {
    return items.reduce((sum, item) => sum + ( item.costo / item.cntped ) * item.cntped, 0);
    //return items.reduce((sum, item) => sum + item.vneto, 0);
   };

  const subTotalCosto = calculateSubtotalPvp()  
  const subtotal = calculateSubtotal();
  const subTotalCostoConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subTotalCosto);
  const subtotalConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal);
  const taxes = subtotal * taxRate;
  const taxesConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal * taxRate);
  const total =  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal + taxes);
  const margenDoc =  ((( subtotal - subTotalCosto) / subtotal ) * 100).toFixed(2)
  const  margenPlata =  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format( (subtotal) - (subTotalCosto)); 
  localStorage.setItem('margenInterno', margenDoc); 

  margenDoc > 40 ? onValueChange("confirm-button-ok"): onValueChange("confirm-button")
  

  return (
    <div className="order-total">
      <div className="order-total-row">
        <span className="label">Subtotal:</span>
        <span className="value">{subtotalConvert}</span>
      </div>
      <div className="order-total-row">
        <span className="label">Subtotal Costo:</span>
        <span className="value">{subTotalCostoConvert}</span>
      </div>
      <div className="order-total-row" style={{borderTop: '1px solid gray',}}>
        <span className="label">Margen:</span>
        <span className="value"> 
         {margenPlata}
          <b>({margenDoc}%)</b>
          {margenDoc > 42 ? (
            <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
          ) : (
            <MdCancel style={{ color: 'red', fontSize: '24px' }} />
          )}
        </span>
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
