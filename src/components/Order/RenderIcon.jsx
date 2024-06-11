import React from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { CiUnlock } from 'react-icons/ci';
import { IoIosClose } from 'react-icons/io';
import { IoCheckmark } from 'react-icons/io5';

export default function RenderIcon({data, filtro}) {


    if(filtro === "AprobacionComercial"){

    if (data.margeninterno >= 42) {
        return <CiUnlock style={{ color: 'green', fontSize: '24px' }} />;
      } else if (data.aprobgte === "1") {
        return <IoCheckmark style={{ color: 'green', fontSize: '24px' }} />;
    } else if (data.aprobgte === "3") {
        return <AiOutlineSend style={{ color: 'green', fontSize: '24px' }} />;  
      } else {
        return <IoIosClose style={{ color: 'red', fontSize: '24px' }} />;
      }

    }



    if(filtro === "AprobacionCliente"){

       if (data.aprobcte === "1") {
            return <IoCheckmark style={{ color: 'green', fontSize: '40px' }} />;
        } else if (data.aprobcte === "3") {
            return <AiOutlineSend style={{ color: 'green', fontSize: '40px' }} />;  
          } else {
            return <IoIosClose style={{ color: 'red', fontSize: '40px' }} />;
          }
    
        }
}
