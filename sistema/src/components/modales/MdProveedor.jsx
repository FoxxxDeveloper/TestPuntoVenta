import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import '../../Css/forms.css'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {MDBIcon} from 'mdb-react-ui-kit';
import Modals from './Modals';

const MdProveedor = ({ titulo, estado, setEstadoModalPr }) => {

 
  const [Proveedores,setProveedores] = useState([])
  const [tablaProveedores,setTablaProveedores] = useState([])
  const [busqueda,setBusqueda] = useState("")
  const [filtro,setFiltro] = useState("Documento")
  


  const listar =async () =>{
   await Axios.get("http://localhost:3001/Proveedor").then((response)=>{
    setProveedores(response.data)
    setTablaProveedores(response.data)
    })
  }

    
  

  const handleChange=e=> {
    setBusqueda(e.target.value)
    filtrar(e.target.value, filtro)
  }

  const filtrar=(cadenaBusqueda, filtro)=>{
    var resultadosBusqueda=tablaProveedores.filter((elemento)=>{
      if(elemento[filtro].toString().toLowerCase().includes(cadenaBusqueda.toLowerCase())){
        return elemento;
      }
      return 0;
    })
    setProveedores(resultadosBusqueda)
  }

  useEffect(()=>{
    listar()
  },[])
   

  return (
    
      <Modals titulo={titulo} estado= {estado} setEstadoModal= {setEstadoModalPr}>


    <div style={{width:'1200px', position:'relative'}} className='divgeneral'>

   
    <div >
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label style={{marginLeft:'620px'}} column sm="2">
         Buscar por:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-18px'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col >
                             <Form.Select onChange={(event) => 
                                setFiltro(event.target.value)
                                        }
                               style={{width:'200px', marginLeft:'620px'}} >
                                 <option  value='Documento' >Documento</option> 
                                <option  value='RazonSocial' >Razon Social</option> 
                                <option  value='Correo' >Correo</option> 
                                <option  value='Telefono' >Telefono</option> 
                                 <option  value='Estado' >Estado</option> 
                                
                                
                                
   	                          </Form.Select>
                             </Col>
                             <Form.Control value={busqueda} style={{width:'220px', marginRight:'60px'}} type='text' placeholder='Texto a buscar' onChange={handleChange} />
         </Form.Group>
      
               </Form>

      </div>                                        
      
    <div className='contfrm'>
    
    
    {/* <Button style={{margin:"10px"}} variant="warning" type="submit" >Limpiar</Button> */}
    <Table striped bordered hover variant="dark" size="sm" style={{width:"1200px"}} className='dgv '>
    <thead>
    <tr>
        <th>Documento</th>
        <th>Razon Social</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {Proveedores.map((Proveedor) =>
      
      (
        
        <tr key={Proveedor.IdProveedor}>
         
        <td> {Proveedor.Documento} </td>
        <td> {Proveedor.RazonSocial} </td>
        <td> {Proveedor.Correo} </td>
        <td> {Proveedor.Telefono} </td>
        <td> {Proveedor.Estado} </td>
        <td style={{width:"110px"}}>
        <ButtonGroup aria-label="Basic example">
          <Button  ><MDBIcon fas icon="check-square" /></Button>
         </ButtonGroup>
          
        </td>

        
        </tr>
       
      ))}
      
    </tbody>
  </Table>
  </div>
 </div>
 </Modals>
  )
  
}

export default MdProveedor

