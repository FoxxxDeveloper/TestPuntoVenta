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
const FrmVerDetalleC = () => {


  return (
    <div className='divgeneral'>
      <Header/>
      
      <h2 style={{marginLeft:'120px'}}>Detalle Compra</h2>
      <div className='cont2'>
      <div className='info2'>
      

      <div className='infoventa'>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Número Documento:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-18px'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
       
        <Col sm="4">
          <Form.Control type='text' value="0" disabled readOnly />
        </Col>
        <Button style={{width:'100px', marginRight:'20px'}} variant="primary"> <MDBIcon fas icon="search" /> Buscar</Button>
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
        <Form.Label style={{marginLeft:'20px'}} column sm="4">
          Fecha:
        </Form.Label>
        <Form.Label style={{width: '20px'}} column sm="4">
          Usuario:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-5px', marginLeft:'1px', display:'flex'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col sm="2">
          <Form.Control type='text' placeholder="Fecha" disabled readOnly/>
        </Col>
        <Col sm="2">
          <Form.Control style={{marginLeft:'210px', width:'400px'}} type='text' placeholder="Usuario" disabled readOnly />
        </Col>
        
      </Form.Group>
    </Form>
      </div>
      <div className='infoproducto2'>
      <Form >
      <Form.Group as={Row} className="mb-2" style={{display:'flex'}} controlId="formPlaintextEmail">
        <Form.Label style={{marginLeft:'20px'}} column sm="4">
          CUIT:
        </Form.Label>
        <Form.Label column sm="4">
          Razón Social:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-5px', marginLeft:'1px', display:'flex'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col sm="2">
          <Form.Control style={{width:'290px'}} type='text' placeholder="CUIT" />
        </Col>
        <Col sm="2">
          <Form.Control style={{marginLeft:'210px', width:'500px'}} type='text' placeholder="Razón Social" disabled readOnly />
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
    <tbody>
     
        
        <tr key='1'>

        <td> 'A001' </td>
        <td> 'Coca-Cola 3L' </td>
        <td> '849.5' </td>
        <td> '2' </td>
        <td> '1699' </td>        
        </tr>
      
    </tbody>
    </Table>
      </div>
      <div className='totales' style={{marginLeft:'10px'}}>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Monto Total:
        </Form.Label>
        <Col sm="2">
          <Form.Control style={{marginLeft:'-90px'}} type="text" placeholder="Monto Total" />
        </Col>
        <Button style={{width:'200px', marginLeft:'600px'}} variant="info"> <MDBIcon fas icon="arrow-circle-down" /> Descargar PDF</Button>
      </Form.Group>
    </Form>
      </div>
      </div>
      </div>


      </div>


    <Footer/>
    </div>
  )
}

export default FrmVerDetalleC