
import OrderItem2 from './OrderItem';
import OrderTotal from './OrderTotal';
import ConfirmButton from './ConfirmButton';
import {serviceInvoice} from '../../service/invoice'
import { useEffect, useState} from 'react';
import Loader from '../loader/loader';
import { useParams } from 'react-router-dom';


const Order = () => { 

    const [responseData, setResponseData] = useState([]);
    const [offer, setOffer] = useState(0);
    const [phoneNumber, setphoneNumber] = useState('');
    const [phoneNumberSeller, setphoneNumberSeller] = useState('');
    const [customer, setCustomer] = useState('');
    const [colorButtonConfirm, setcolorButtonConfirm] = useState('confirm-button');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { lcodigo } = useParams();
    const { cte } = useParams();
    useEffect(() => {
      const postData = async () => {
        //const myKeysValues =  window.location.search;
       // const urlParams = new URLSearchParams(myKeysValues);
        //const quote = urlParams.get("LCODIGO")
        //const cte =  urlParams.get("cte");

        
        //console.log(quote);
      
        // Datos que vamos a enviar en el cuerpo de la solicitud
        const raw = JSON.stringify({
          "LCODIGO": lcodigo,
          "LTIPO": "C",
          "TPROCESO": "S",
          "PCODSOLICITANTE": "",
          "PHANDLE": "",
          "FECHAINI": "",
          "FECHAFIN": "",
          "cte": cte
        });
  
        try {
          // Realizando la solicitud POST
          const response = await fetch('https://lilix.ceramicaitalia.com:3001/clientes/invoice/ ', {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw})
            // Verificando si la solicitud fue exitosa
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Obteniendo los datos de la respuesta
          const result = await response.json();
          console.log (result)  
          setOffer(result[0].pedido)
          setphoneNumber(result[0].telf1)
          setCustomer(result[0].nomcte)
          setphoneNumberSeller(result[0].telfvend)
          setResponseData(result); // Actualizando el estado con los datos de la respuesta
          const service = await serviceInvoice("06",result[0].pedido,"0","0","","",""); // actualizamos la apertura del cliente 
          console.log ("*********apertura cliente****************",service)    
        
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          setError(error,"60");
        }
        finally {
            setLoading(false);
          }           
      };        
      postData();
      
    }, []); 
  
    const taxRate = 0.19; 
  
    const handleColorChange = (newColor) => {
      setcolorButtonConfirm(newColor);
    };

    if (loading) {
        return   <Loader/>;
      }
    
    if (error) {
        return <div>Error: {error.message}</div>;
      }
    
    return (
      <>
      <div className="App">
      <div className="logo-container">
        <img src="https://web.ceramicaitalia.com/log.png" alt="Logo" className="logo" />
      </div>
        <h1>Proforma De Pedido </h1>
         <h5 className='order-code'>{offer}</h5>
        <h4 className='name-customer'>{customer}</h4> 
      {<div className="order-list">
          {responseData.map((data, index) => (
          <OrderItem2
              key={index}
              image={`https://web.ceramicaitalia.com/temporada/${data.materi}.jpg`}
              name={data.descri}
              quantity={data.cntped}
              price={data.precio}
              totalPos={data.vneto}
              pvp ={data.pvp}
            />
          ))}
        </div> }
         <OrderTotal 
          items={responseData}
          taxRate={taxRate}
          onValueChange={handleColorChange} 
          
         />
          <div className="app-container">
        <ConfirmButton
         offer={offer}
         phoneNumber={phoneNumber} 
         phoneNumberSeller={phoneNumberSeller} 
         colorButtonConfirm={colorButtonConfirm}
         customer={customer}
         
         
         />
        
      </div>
      </div> 
      
      </>
    );
  }
  
  export default Order;
  