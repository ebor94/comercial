import React from 'react'
import Table  from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import Loader from '../loader/loader';
import { Alert, Button, ButtonGroup } from 'react-bootstrap';
import {MargeInterno} from "../../hooks/MargenInterno"
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import SendMessage from '../Buttons/SendMessage';
import { CiUnlock } from "react-icons/ci";
import ViewQuote from '../Buttons/ViewQuote';
import Margin from './MarginAliado';
import RenderIcon from './RenderIcon';
import NavBar from '../navBar/NavBar';



export default function Orderlist() {

  const [quotes, setQuotes] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const getQuotes = async () =>{   
      let quotesIterada = [];
      try {
        let zona  = localStorage.getItem("zona").split("|")    
      //console.log(zona.length)
      for (const izona of zona) { 
        console.log(izona)
      const raw = JSON.stringify({        
          "BANDERA":"10",
          "OFERTA":"0005103269",
          "MARGENALIADO":"",
          "MARGENINTERNO":"",
          "TOKEN":"",
          "RESPUESTAWP":"",
          "USUARIOAPROB":"",
          "FILTRO" : izona          
      });
        const response = await fetch('https://lilix.ceramicaitalia.com:3001/clientes/quote/',{method : "POST", headers:{'Content-Type':"application/json"}, body: raw})
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      
      /* for (const iterator of result) {
        if(iterator.margeninterno === 0){
        iterator.margeninterno = await  calculateMargin(iterator.documento, iterator.identificacion,"interno")
      }
      if(iterator.margenaliado === 0){
        iterator.margenaliado = await  calculateMargin(iterator.documento, iterator.identificacion,"aliado")
      }
        //console.log(iterator)
      }   */
      quotesIterada.push(result)   
      
      }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError(error);
        
      }finally{
        let combinedArray = [];
        setLoading(false);
       if(quotesIterada.length === 2){
         combinedArray = [...quotesIterada[0], ...quotesIterada[1]];
       }
       if(quotesIterada.length === 1){
        setQuotes(quotesIterada[0]);
        return
      }
       
        setQuotes(combinedArray);
      }  
  }

       getQuotes()
  
  }, [])

  const updateMarginInterno = (index, newMargin) => {
    setQuotes(prevData => {
      const updatedData = [...prevData];
      updatedData[index].margeninterno = newMargin;
      return updatedData;
    });
  };

  const updateMarginAliado = (index, newMargin) => {
    setQuotes(prevData => {
      const updatedData = [...prevData];
      updatedData[index].margenaliado = newMargin;
      return updatedData;
    });
  };

 /*  const calculateMargin = async (doc, cte, tipo) => {

    try {
      const result = await MargeInterno(doc, cte, tipo);
      return result;
    } catch (err) {
      return err;
    }
  
  }; */

  if (loading) {
    return   <Loader/>;
  }
 
if(typeof localStorage.getItem("zona") == "undefined" ){
  return <div>
    <Alert  variant="danger">
      Error:  No tienes zona de venta matricualda para realizar esta operacion
    </Alert>
    </div>;
}  

if (error) {
    return <div>      
      <Alert  variant="danger">
      Error: {error.message}
    </Alert>
      </div>;
  }

  return (
    <><NavBar />
    <Container >
    <div className='mb-5 text-center'><h2 style={{color : "#615f5f"}}>Proformas a Gestionar</h2></div>
    <Row className="justify-content-md-center">
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th># proforma</th>
          <th >Aliado</th>
          <th >Zona</th>
          <th >Vendedor</th>
          <th >Contacto Comercial</th>
          <th >Margen Interno</th>         
          <th >Margen Aliado</th>
          <th >Aprobacion Comercial</th>
          <th >Aprobacion Del cliente</th>
          <th >Vista Del Cliente</th>
          <th >Accion</th>
          <th >Estatus</th>
        </tr>
      </thead>
      <tbody >        
          {quotes.map((data, index) => (
            <tr key={index} >
            <td >{data.documento}</td>
            <td >{data.nombre}</td>
            <td >{data.zonav}</td>
            <td >{data.vendedor}</td>
            <td >{data.telefono } </td>           
            <td >
              <Margin
               quote={data.documento}
               identificacion={data.identificacion}
               tipo={"interno"}
               onUpdateMargin={(newMargin) => updateMarginInterno(index, newMargin)}                
              />
            </td>
            <td >
              <Margin
               quote={data.documento}
               identificacion={data.identificacion} 
               tipo={"aliado"} 
               onUpdateMargin={(newMargin) => updateMarginAliado(index, newMargin)}
               />
            </td>
            <td>  
              <RenderIcon
              data={data}
              filtro={"AprobacionComercial"} 
              />          
            </td>
            <RenderIcon
              data={data}
              filtro={"AprobacionCliente"} 
              />  
            <td >{data.fechaaperturacte !=="" ?  data.fechaaperturacte+"/"+data.horaaperturacte : <IoIosClose style={{ color: 'red', fontSize: '24px' }}/> }</td>           
            <td>
              <ButtonGroup size="md" className="mb-2">
                <SendMessage data={data}/>
                <ViewQuote 
                cte={data.identificacion}
                quote={data.documento}
                nameCte={data.nombre}
                />
                    
              </ButtonGroup>
            </td> 
            <td  className="mb-2">{data.margeninterno >= 42 ? <FaCircleCheck  className="mb-2" style={{ color: 'green', fontSize: '24px' }}/> : <MdCancel  className="mb-2" style={{ color: 'red', fontSize: '24px' }}/>}</td>           
            </tr>
          ))}
       
      </tbody>
    </Table>
    </Row>
    </Container>
    </>
  )
}
