// src/components/OrderTotal.js

import { useEffect, useState } from 'react';
import '../../assets/css/OrderTotal.css';


const OrderTotal = ({ items, taxRate, onValueChange  }) => {
  const [peso , setPeso] = useState(0);
  const calculateSubtotal = () => {   
   return items.reduce((sum, item) => sum + item.vneto, 0);
  };
  const calculateSubtotalPvp = () => {
    return items.reduce((sum, item) => sum + item.pvp * item.cntped, 0);
   
   };

   useEffect(() => {
    
   let pesoDoc = items.reduce((pesototal, items ) =>{
    return pesototal + (items.peso / 1000) }, 0)



    setPeso(pesoDoc)
     
   },[items])
   

   

  let subTotalPvp = calculateSubtotalPvp()  
  let subtotal = calculateSubtotal();
  let subtotalPvpConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subTotalPvp);
  let subtotalConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal);
  let taxes = subtotal * taxRate;
  let taxesConvert = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal * taxRate);
  let total =  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal + taxes);
  let margenDoc =  (((subTotalPvp - subtotal) / subTotalPvp ) * 100).toFixed(2)
  let  margenPlata =  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format((subTotalPvp) - (subtotal) );  
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
      <div className="order-total-row">
        <span className="label">Peso(aprox) :</span>
        <span className="value">{peso.toFixed(2)} Ton</span>
      </div>
    </div>
  );
};

export default OrderTotal;
