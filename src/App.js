import './App.css';
import OrderItem from './components/OrderItem';
import OrderTotal from './components/OrderTotal';
import ConfirmButton from './components/ConfirmButton';
import { useEffect, useState} from 'react';


const App = () => {

  const [responseData, setResponseData] = useState([]);
  const [cotizacion, setCotizacion] = useState(0);

  useEffect(() => {
    const postData = async () => {
      // Datos que vamos a enviar en el cuerpo de la solicitud
      const raw = JSON.stringify({
        "LCODIGO": "0010511306",
        "LTIPO": "C",
        "TPROCESO": "S",
        "PCODSOLICITANTE": "",
        "PHANDLE": "",
        "FECHAINI": "",
        "FECHAFIN": "",
        "cte": "0000141387"
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
        setCotizacion(result[0].pedido)
        setResponseData(result); // Actualizando el estado con los datos de la respuesta
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    postData();
  }, []); 

  const taxRate = 0.19; // 19% de impuestos

  return (
    <>
    <div className="App">
    <div className="logo-container">
      <img src="https://web.ceramicaitalia.com/log.png" alt="Logo" className="logo" />
    </div>
      <h1>Cotizacion </h1>
      {/* <h4 className='order-code'>{responseData[0].pedido}</h4>
      <h4 className='name-customer'>{responseData[0].nomcte}</h4> */}
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
      <ConfirmButton cotizacion={cotizacion}/>
    </div>
    </div>
    
    </>
  );
}

export default App;
