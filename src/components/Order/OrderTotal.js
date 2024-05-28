// src/components/OrderTotal.js
import React from 'react';
import '../../assets/css/OrderTotal.css';


const OrderTotal = ({ items, taxRate, onValueChange  }) => {
  const calculateSubtotal = () => {
   
   return items.reduce((sum, item) => sum + item.vneto, 0);
  };
  const calculateSubtotalPvp = () => {
    return items.reduce((sum, item) => sum + item.pvp * item.cntped, 0);
   
   };

  const subTotalPvp = calculateSubtotalPvp()  
  const subtotal = calculateSubtotal();
  const subtotalPvpConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subTotalPvp);
  const subtotalConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal);
  const taxes = subtotal * taxRate;
  const taxesConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal * taxRate);
  const total =  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal + taxes);
  const margenDoc =  (((subTotalPvp - subtotal) / subTotalPvp ) * 100).toFixed(2)
  const  margenPlata =  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format((subTotalPvp) - (subtotal) );  
  localStorage.setItem('margenAliado', margenDoc);

  margenDoc > 40 ? onValueChange("confirm-button-ok"): onValueChange("confirm-button")
  

  return (
    <div className="order-total">
      <div className="order-total-row">
        <span className="label">Subtotal:</span>
        <span className="value">{subtotalConvert}</span>
      </div>
      <div className="order-total-row">
        <span className="label">Subtotal Pvp:</span>
        <span className="value">{subtotalPvpConvert}</span>
      </div>
      <div className="order-total-row" style={{borderTop: '1px solid gray',}}>
        <span className="label">Margen:</span>
        <span className="value"> 
         {margenPlata}
          <b>({margenDoc}%)</b>
          {/* {margenDoc > 42 ? (
            <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
          ) : (
            <MdCancel style={{ color: 'red', fontSize: '24px' }} />
          )} */}
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
