import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import '../../Css/reportes.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { MDBIcon} from 'mdb-react-ui-kit';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { useState } from 'react';

const FrmReporteC = () => {
  const listar = () =>{
    Axios.get("http://localhost:3001/Proveedores").then((response)=>{
      setProveedores(response.data)
    })
    
  }
  listar()
  const [ProveedoresList,setProveedores] = useState([])

  return (
    <div className='divgeneral'>
      <Header/>
      
      <h2 style={{marginLeft:'120px'}}>Reporte Compras</h2>
      <div className='cont2'>
       <div>
      <div className='infoproducto2'>
      <Form >
      <Form.Group as={Row} className="mb-2" style={{display:'flex'}} controlId="formPlaintextEmail">
        <Form.Label style={{marginLeft:'20px'}} column sm="2">
          Fecha Inicio:
        </Form.Label>
        <Form.Label column sm="2">
          Fecha Fin:
        </Form.Label>
        <Form.Label column sm="2">
          Proveedor:
        </Form.Label>
      </Form.Group>

      <Form.Group style={{marginTop:'-5px', marginLeft:'1px', display:'flex'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
      <div>
        
                        <Form.Group style={{display:'flex'}} controlId="dob">
                            <Form.Control style={{width:'150px'}} type="date" name="dob" placeholder="Fecha Inicio" />
                            <Form.Control style={{width:'150px', marginLeft:'60px'}} type="date" name="dob" placeholder="Fecha Fin" />
                            <Col >
                             <Form.Select style={{width:'400px', marginLeft:'50px'}}
                                    
                                    onChange={(event) => 
                                        setProveedores(event.target.value) } >
                                                <option  value='0'>TODOS</option> 
                                     {ProveedoresList.map((proveedor) =>
      
                                                (
                                     <option key={proveedor.IdProveedor} value={proveedor.IdProveedor}>{proveedor.RazonSocial}</option>
                                                ))}
    		
                                          
   	                                      </Form.Select>
                             </Col>
     
                            <Button style={{width:'100px', marginRight:'200px'}} variant="primary"> <MDBIcon fas icon="search" /> Buscar</Button>
                        </Form.Group>
       </div>
           
        
        
      </Form.Group>
    </Form>
      </div>
      <div className='filtros'>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label style={{marginLeft:'600px'}} column sm="2">
         Buscar por:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-18px'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col >
                             <Form.Select style={{width:'200px', marginLeft:'600px'}} >
                                <option  value='0'>TODOS</option> 
   	                          </Form.Select>
                             </Col>
    
                             <Form.Control style={{width:'220px', marginRight:'20px'}} type='text' placeholder='Texto a buscar' />
        <Button style={{width:'40px', marginRight:'10px'}} variant="success"> <MDBIcon fas icon="search" /></Button>
        <Button style={{width:'40px', marginRight:'30px'}} variant="warning"> <MDBIcon fas icon="broom" /></Button>
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
      </div>
      


      </div>


    <Footer/>
    </div>
  )
}

export default FrmReporteC