export const login = async (user, password) => {
    const raw = JSON.stringify({
        "user":user,
        "password":password
      });

      try {
        const response = await fetch('https://lilix.ceramicaitalia.com:3001/logins/', {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw});
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

