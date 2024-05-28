import React from 'react'
import Table  from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import Loader from '../loader/loader';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AiOutlineSend, AiFillEye } from "react-icons/ai";
import {MargeInterno} from "../../hooks/MargenInterno"
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { LuTrash2 } from "react-icons/lu";


export default function Orderlist() {

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getQuotes = async () =>{

      const raw = JSON.stringify({
        
          "BANDERA":"09",
          "OFERTA":"",
          "MARGENALIADO":"",
          "MARGENINTERNO":"",
          "TOKEN":"",
          "RESPUESTAWP":"",
          "USUARIOAPROB":"",
          "FILTRO" : "ZONZ"
          
      });

      try {
        const response = await fetch('https://lilix.ceramicaitalia.com:3001/clientes/quote/',{method : "POST", headers:{'Content-Type':"application/json"}, body: raw})
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      
      for (const iterator of result) {
        if(iterator.margeninterno === 0){
        iterator.margeninterno = await  calculateMargin(iterator.documento, iterator.identificacion,"interno")
      }
      if(iterator.margenaliado === 0){
        iterator.margenaliado = await  calculateMargin(iterator.documento, iterator.identificacion,"aliado")
      }
        console.log(iterator)
      }     
      setQuotes(result);
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError(error);
        
      }finally{
        setLoading(false);
      }  

    }
  
    getQuotes()
  }, [quotes])


  const calculateMargin = async (doc, cte, tipo) => {

    try {
      const result = await MargeInterno(doc, cte, tipo);
      return result;
    } catch (err) {
      return err;
    }
  
  };

  if (loading) {
    return   <Loader/>;
  }

if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container >
    <div className='mb-5'><h1>Proformas a Gestionar</h1></div>
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
            <td >{data.telefono}</td>
            <td >{data.margeninterno}</td>
            <td >{data.margenaliado}</td>
            <td >{data.aprobgte}</td>
            <td >{data.aprobcte}</td>
            <td >{data.fechaaperturacte} / {data.horaaperturacte}</td>           
            <td>
              <ButtonGroup size="md" className="mb-2">
                <Button alt="Enviar" variant='success'><AiOutlineSend /></Button>
                <Button  variant='primary'><AiFillEye /></Button> 
                <Button alt="Enviar" variant='danger'><LuTrash2 /></Button>      
              </ButtonGroup>
            </td> 
            <td  className="mb-2">{data.margeninterno >= 42 ? <FaCircleCheck  className="mb-2" style={{ color: 'green', fontSize: '24px' }}/> : <MdCancel  className="mb-2" style={{ color: 'red', fontSize: '24px' }}/>}</td>           
            </tr>
          ))}
       
      </tbody>
    </Table>
    </Row>
    </Container>
  )
}
