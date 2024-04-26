import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import '../../Css/detalles.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { MDBIcon} from 'mdb-react-ui-kit';
import Axios from 'axios';
import { useState} from 'react';

const FrmVerDetalleV = () => {


  const [detalleVenta, setDetalleVenta] = useState([])
  const [numDocumento, setNumDocumento] = useState("")
  const [usuarioRegistro, setUsuarioRegistro] = useState("")
  const [fechaRegistro, setFechaRegistro] = useState("")
  const [documentoCliente, setDocumentoCliente] = useState("")
  const [tipoDocumento,setTipoDocumento] = useState("")
  const [nombreCliente,setNombreCliente]= useState("")
  const [montoTotal, setMontoTotal] = useState("")

  
  const verDetalleVenta = () =>{
    Axios.get(`http://localhost:3001/venta/verDetalle?NumeroDocumento=${numDocumento}`).then((response)=>{
      setDetalleVenta(response.data)
      setUsuarioRegistro(response.data[0].UsuarioRegistro)
      setFechaRegistro(response.data[0].FechaRegistro)
      setDocumentoCliente(response.data[0].DocumentoCliente)
      setTipoDocumento(response.data[0].TipoDocumento)
      setNombreCliente(response.data[0].NombreCliente)
      setMontoTotal(response.data[0].MontoTotal)

    }).catch((error)=>{
        alert("casi pero no", error)
    })
  }







  return (
    <>
    <div className='divgeneral'>
    <Header/>
    <h2>Detalle Venta</h2>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          
        </div>
      </div>      
      

    </div>
    <Footer/>
    </div>
    </>
  )
}

export default FrmVerDetalleV