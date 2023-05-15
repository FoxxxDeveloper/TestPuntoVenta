import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import '../../Css/registros.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Axios from 'axios';
import { MDBIcon} from 'mdb-react-ui-kit';
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
const FrmRegistrarV = () => {
  const fecha = new Date();
  const dia = fecha.getDate() 
  const mes=fecha.getMonth()+1
  const anio=fecha.getFullYear()

  const listar = () =>{
    Axios.get("http://localhost:3001/Metodo_Pagos").then((response)=>{
      setMetodoPagos(response.data)
    })
    
  }
  listar()
  const [MetodoPagosList,setMetodoPagos] = useState([])

  return (
    <div>
      <Header/>
      
      <h2 style={{marginLeft:'120px'}}>Registrar Venta</h2>
      <div className='cont'>
      <div className='info'>
      <div className='infov'>
      <Form style={{display:'flex'}}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Col sm="10">
        {mes < 10 ? (
        <Form.Control plaintext readOnly defaultValue={`Fecha: ${dia}-0${mes}-${anio}`} />
         ) : (
         <Form.Control plaintext readOnly defaultValue={`Fecha: ${dia}-${mes}-${anio}`} />
       )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="8">
          Tipo de comprobante:
        </Form.Label>
        <Col sm="17">
          <Form.Select aria-label="Tipo de comprobante">
            <option>Factura A</option>
          </Form.Select>
        </Col>
      </Form.Group>
    </Form>
      </div>

      <div className='infocli'>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Número Documento:
        </Form.Label>
        <Form.Label style={{marginLeft:'50px'}} column sm="4">
          Nombre Completo:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-18px'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
       
        <Col sm="4">
          <Form.Control type='text' value="0" disabled readOnly />
        </Col>
        <Button style={{width:'50px'}} variant="primary"> <MDBIcon fas icon="search" /></Button>
        <Col sm="7">
          <Form.Control type='text' value="Consumidor final" disabled readOnly />
        </Col>
      </Form.Group>
    </Form>

      </div>

      </div>
      <div className='info'>
        <div>
      <div className='infoproducto'>
      <Form >
      <Form.Group as={Row} className="mb-2" style={{display:'flex'}} controlId="formPlaintextEmail">
        <Form.Label style={{marginLeft:'20px'}} column sm="4">
          Cod. Producto:
        </Form.Label>
        <Form.Label style={{marginLeft:'-185px', width: '20px'}} column sm="4">
          Producto:
        </Form.Label>
        <Form.Label style={{marginLeft:'205px', width: '20px'}} column sm="9">
          Precio:
        </Form.Label>
        <Form.Label style={{marginLeft:'150px', width: '20px'}} column sm="4">
          Stock:
        </Form.Label>
        <Form.Label style={{marginLeft:'150px', width: '20px'}} column sm="4">
          Cantidad:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-5px', marginLeft:'1px', display:'flex'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col sm="2">
          <Form.Control type='text' placeholder="Cod" />
        </Col>
        <Col sm="2">
          <Form.Control type='text' placeholder="Producto" disabled readOnly />
        </Col>
        <Button style={{width:'50px'}} variant="primary"> <MDBIcon fas icon="search" /></Button>
        <Col sm="2">
          <Form.Control type='number' placeholder="Precio" />
        </Col>
        <Col sm="2">
          <Form.Control type='number' placeholder="Stock" disabled readOnly />
        </Col>
        <Col sm="2">
          <Form.Control type='number' placeholder='Cantidad'/>
        </Col>
      </Form.Group>
    </Form>
      </div>
      <div className='listprod'>
      <Table striped bordered hover variant="dark" size="sm" style={{width:"1048px"}} className='dgv '>
      <thead>
      <tr>
        <th>Id</th>
        <th>Codigo</th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>SubTotal</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     
        
        <tr key='1'>
         
        <td> '1' </td>
        <td> 'A001' </td>
        <td> 'Coca-Cola 3L' </td>
        <td> '849.5' </td>
        <td> '2' </td>
        <td> '1699' </td>
        <td style={{width:"40px"}}>
        <ButtonGroup aria-label="Basic example"> <Button style={{marginRight:"10px"}} variant='danger'><MDBIcon fas icon="trash-alt" /></Button>  </ButtonGroup></td>

        
        </tr>
      
    </tbody>
    </Table>
      </div>
      </div>
      <div className='interacciones'>
      <ButtonGroup aria-label="Basic example"> <Button style={{width:'80px', height:'80px'}} variant='success'> <MDBIcon far icon="plus-square" size='2x' />Agregar</Button>  </ButtonGroup>
      <Form style={{display:'flex'}}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="8">
          Metodo de Pago:
        </Form.Label>
        <Col>
        <Form.Select
        onChange={(event) => 
          setMetodoPagos(event.target.value)
        }
        >
             {MetodoPagosList.map((metodo) =>
      
              (
              <option key={metodo.IdMetodoPago} value={metodo.IdMetodoPago}>{metodo.Descripcion}</option>
            ))}
    		
        
   		</Form.Select>
           </Col>
      </Form.Group>
    </Form>
      
      </div>
      
      
      </div>


      </div>


    <Footer/>
    </div>
  )
}

export default FrmRegistrarV