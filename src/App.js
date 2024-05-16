import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import OrderItem from './components/OrderItem';
import OrderTotal from './components/OrderTotal';
import ConfirmButton from './components/ConfirmButton';
import { useEffect, useState} from 'react';
 //?LCODIGO=0010513436&cte=0000109476

const App = () => {

  const [responseData, setResponseData] = useState([]);
  const [offer, setOffer] = useState(0);
  const [phoneNumber, setphoneNumber] = useState('');
  const [phoneNumberSeller, setphoneNumberSeller] = useState('');
  const [customer, setCustomer] = useState('');

  useEffect(() => {
    const postData = async () => {
      const myKeysValues =  window.location.search;
      const urlParams = new URLSearchParams(myKeysValues);
      const quote = urlParams.get("LCODIGO")
      const cte =  urlParams.get("cte");
      //console.log(quote);
    
      // Datos que vamos a enviar en el cuerpo de la solicitud
      const raw = JSON.stringify({
        "LCODIGO": quote,
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
        setOffer(result[0].pedido)
        setphoneNumber(result[0].telf1)
        setCustomer(result[0].nomcte)
        setphoneNumberSeller(result[0].telfvend)
        setResponseData(result); // Actualizando el estado con los datos de la respuesta
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    postData();
  }, []); 

  const taxRate = 0.19; 

  return (
    <>
    <div className="App">
    <div className="logo-container">
      <img src="https://web.ceramicaitalia.com/log.png" alt="Logo" className="logo" />
    </div>
      <h1>Cotizacion </h1>
       <h5 className='order-code'>{offer}</h5>
      <h4 className='name-customer'>{customer}</h4> 
      <div className="order-list">
        {responseData.map((data, index) => (
          <OrderItem
            key={index}
            image={`https://web.ceramicaitalia.com/temporada/${data.materi}.jpg`}
            name={data.descri}
            quantity={data.cntped}
            price={data.precio}
            totalPos={data.vneto}
          />
        ))}
      </div>
      <OrderTotal items={responseData} taxRate={taxRate} />
      <div className="app-container">
      <ConfirmButton
       offer={offer}
       phoneNumber={phoneNumber} 
       phoneNumberSeller={phoneNumberSeller} />
    </div>
    </div>
    
    </>
  );
}

export default App;
