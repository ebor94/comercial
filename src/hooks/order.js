export const SaleDocument = async  (referencia, tipodoc) => {

    const raw = JSON.stringify({
        "IDOCREFERENCE": referencia,
        "TIPODOCNEW":tipodoc
      });


      try {
        // Realizando la solicitud POST
        const response = await fetch('https://lilix.ceramicaitalia.com:3001/clientes/order/', {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw})
          // Verificando si la solicitud fue exitosa
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Obteniendo los datos de la respuesta
        const result = await response.json();
        return   result[0].salesdocument
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return(error);
      }
      
}