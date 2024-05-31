export const serviceInvoice =  async (bandera,oferta,margenAliado,margenInterno,token,respuestaWp,usuarioAprob) => {
    const raw = JSON.stringify({
        "BANDERA":bandera,
        "OFERTA":oferta,
        "MARGENALIADO": margenAliado,
        "MARGENINTERNO": margenInterno,
        "TOKEN": token,
        "RESPUESTAWP": respuestaWp,
        "USUARIOAPROB":usuarioAprob,
        "FILTRO" : ""
      });


      try {
        // Realizando la solicitud POST
        const response = await fetch('https://lilix.ceramicaitalia.com:3001/clientes/quote/', {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw})
          // Verificando si la solicitud fue exitosa
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Obteniendo los datos de la respuesta
        const result = await response.json();
        return   result
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return(error);
      }
      


}