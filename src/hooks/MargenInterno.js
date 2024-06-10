


export const MargeInterno = async  (quote, cte, tipo) => {

   // console.log(quote, cte)
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
        if(tipo === "interno"){
            const subTotalCosto = calculateSubtotalPvp(result)  
            const subtotal = calculateSubtotal(result);
            const margenDoc =  ((( subtotal - subTotalCosto) / subtotal ) * 100).toFixed(2)
         return margenDoc
        }

        if(tipo === "aliado"){
            const subTotalPvp = calculateSubtotalPvpA(result)  
            const subtotal = calculateSubtotalA(result);
            const margenDoc =  (((subTotalPvp - subtotal) / subTotalPvp ) * 100).toFixed(2)
            return margenDoc
            }

        //console.log(margenDoc)
       

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return(0) ;
      }

}

const calculateSubtotal = (items) => {
    // return items.reduce((sum, item) => sum + item.vneto * item.cntped, 0);
    return items.reduce((sum, item) => sum + item.vneto, 0);
};

const calculateSubtotalPvp = (items) => {
    return items.reduce((sum, item) => sum + ( item.costo / item.cntped ) * item.cntped, 0);
      //return items.reduce((sum, item) => sum + item.vneto, 0);
     };


const calculateSubtotalA = (items) => {
    // return items.reduce((sum, item) => sum + item.vneto * item.cntped, 0);
    return items.reduce((sum, item) => sum + item.vneto, 0);
};
const calculateSubtotalPvpA = (items) => {
    return items.reduce((sum, item) => sum + item.pvp * item.cntped, 0);
    //return items.reduce((sum, item) => sum + item.vneto, 0);
    };     