

export const TelDirComercial =  async () => {

    const raw = JSON.stringify({ "objetivo":"DIRVENTAS", "campo1":"APROBACION", "campo11":"OFERTAS"})
    try {
        const response = await fetch("https://lilix.ceramicaitalia.com:3001/zcisaparmetros/", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: raw });
        const result_1 = await response.json();
        return result_1[0].campo2;
    } catch (error) {
        return console.error(error);
    } 



}