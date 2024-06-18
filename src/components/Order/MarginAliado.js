import React, { useEffect } from 'react'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { MargeInterno } from '../../hooks/MargenInterno';

export default function Margin({quote , identificacion, tipo, onUpdateMargin }) {
    // const [doc, setDoc] = useState(quote)
    // const [bp, setBp] = useState(identificacion)
    const [loading, setLoading] = useState(true)
    const [margen,  setMargen] = useState(0)

    useEffect(() => {
       // setDoc(quote)
       // setBp(identificacion)
        //console.log(doc,bp,tipo)
        calculateMargin(quote,identificacion,tipo).then((result) => {
            setMargen(result)
            onUpdateMargin(result) 
            setLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [quote , identificacion, tipo])


    const calculateMargin = async (doc, cte, tipo) => {

        try {
          const result = await MargeInterno(doc, cte, tipo);
          return result;
        } catch (err) {
          return 0;
        }
      
      };
    

  if(loading){
    return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );

  }  
  return (
    <div>{margen}</div>
  )
}
