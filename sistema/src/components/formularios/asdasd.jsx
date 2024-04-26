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

const Asdasd = () => {


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
    <div className='divgeneral' >
      <Header/>
      
      <h2 style={{marginLeft:'120px'}}>Detalle Venta</h2>
      <div className='cont' >
      <div className='info' >
      

      <div className='infoventa' >
      <Form >
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Número Documento:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-18px'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
       
        <Col sm="4">
          <Form.Control type='text' onChange={(e)=> setNumDocumento(e.target.value)}  />
        </Col>
        <Button style={{width:'100px', marginRight:'20px'}} variant="primary" onClick={verDetalleVenta}> <MDBIcon fas icon="search" /> Buscar</Button>
        <Button style={{width:'100px'}} variant="warning"> <MDBIcon fas icon="search" /> Limpiar</Button>
      </Form.Group>
    </Form>

      </div>

      </div>
      <div className='info2'>
        <div>
      <div className='infoproducto2'>
   

     
          <Form >
          <Form.Group as={Row} className="mb-2" style={{display:'flex'}} controlId="formPlaintextEmail">
            <Form.Label style={{marginLeft:'20px'}} column sm="4" >
             Fecha: 
            </Form.Label>
            <Form.Label column sm="4">
              Usuario Registro: 
            </Form.Label>
            
          </Form.Group>

          <Form.Group  style={{marginTop:'-5px', marginLeft:'1px', display:'flex'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Col sm="2">
              <Form.Control disabled readOnly value={fechaRegistro} style={{width:'190px'}} type='text' placeholder="Fecha Registro" />
            </Col>
            <Col sm="2">
              <Form.Control value={usuarioRegistro} style={{marginLeft:'210px', width:'500px'}} type='text' placeholder="Nombre Completo" disabled readOnly />
            </Col>
            
          </Form.Group>
          </Form> 
    

      </div>
      <div className='infoproducto2'>
      <Form >
      <Form.Group as={Row} className="mb-2" style={{display:'flex'}} controlId="formPlaintextEmail">
        <Form.Label style={{marginLeft:'20px'}} column sm="3">
          Número de Documento: 
        </Form.Label>
        <Form.Label  column sm="3">
          Tipo de Documento:
        </Form.Label>
        <Form.Label column sm="3">
          Nombre Completo:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-5px', marginLeft:'1px', display:'flex'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col sm="3">
          <Form.Control value={documentoCliente} style={{width:'200px'}} type='text' placeholder="Número de Documento" disabled readOnly />
        </Col>
        <Col sm="1">
          <Form.Control value={tipoDocumento} style={{width:'200px'}} type='text' placeholder="Tipo de Documento" disabled readOnly />
        </Col>
        <Col sm="1">
          <Form.Control value={nombreCliente} style={{marginLeft:'210px', width:'400px'}} type='text' placeholder="Nombre Completo" disabled readOnly />
        </Col>
        
      </Form.Group>
    </Form>
      </div>
      <div className='listprod2'>
      <Table striped bordered hover variant="dark" size="sm" style={{width:"1200px"}} className='dgv '>
      <thead>
      <tr>
        <th>Codigo</th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>SubTotal</th>
      </tr>
    </thead>
    {detalleVenta.map((dv)=>(

    <tbody>   
        <tr key={dv.idDetalleVenta}>
          
        <td> {dv.Codigo} </td>
        <td> {dv.Producto}  </td>
        <td> {dv.PrecioVenta} </td>
        <td> {dv.Cantidad} </td>
        <td> {dv.SubTotal} </td>      
        </tr>
      
    </tbody>
    ))}

    
    </Table>
        <div className='totales' style={{marginLeft:'10px'}}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Monto Total: 
              </Form.Label>
              <Col sm="2">
                <Form.Control value={montoTotal} disabled readOnly style={{marginLeft:'-90px'}} type="text" placeholder="Monto Total" />
              </Col>
              <Col sm="2">      
              <Button style={{width:'200px', marginLeft:'600px'}} variant="info"> <MDBIcon fas icon="arrow-circle-down" /> Descargar PDF</Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    
      </div>
    
      </div>


      </div>

      <Footer/>
 
    </div>
     
  )
}

export default Asdasd