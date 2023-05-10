import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import '../../Css/forms.css'
import { useState } from 'react';
import Axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {MDBIcon} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const noti = withReactContent(Swal)

const FrmCliente = () => {
  <Header/>
  const [IdCliente,setIdCliente] = useState(0);
  const [Documento,setDocumento] = useState("");
  const [NombreCompleto,setNombreCompleto] = useState("");
  const [Correo,setCorreo] = useState("");
  const [Telefono,setTelefono] = useState("");
  const [EstadoValor,setEstadoValor] = useState(1);
  const [clienteList,setClientes] = useState([])
  const [editar,setEditar] = useState(false)

  

  const registrar = () =>{

    
    if(Documento===""|| NombreCompleto===""|| Correo===""||Telefono==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el cliente!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{
    Axios.post("http://localhost:3001/createcliente",{
    Documento:Documento,
    NombreCompleto:NombreCompleto,
    Correo:Correo,
    Telefono:Telefono,
    EstadoValor:EstadoValor
    }).then(()=>{
      
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El cliente <strong>{NombreCompleto}</strong> ha sido agregado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()
      
    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el cliente!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })

    }
  }

  const listar = () =>{
    Axios.get("http://localhost:3001/clientes").then((response)=>{
      setClientes(response.data)
    })
  }

  const limpiarCampos = () =>{
    setIdCliente(0)
    setDocumento("")
    setNombreCompleto("")
    setCorreo("")
    setTelefono("")
    setEstadoValor(1)
    setEditar(false)
    
  }

  const editarCliente = (val) =>{
    setEditar(true)
    setIdCliente(val.IdCliente)
    setDocumento(val.Documento)
    setNombreCompleto(val.NombreCompleto)
    setCorreo(val.Correo)
    setTelefono(val.Telefono)
    setEstadoValor(val.Estado)

    
  }
 
  

  const updateCliente = () =>{

    if(Documento===""|| NombreCompleto===""|| Correo===""||Telefono==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo editar el cliente!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{

    Axios.put("http://localhost:3001/updatecliente",{
    IdCliente:IdCliente,
    Documento:Documento,
    NombreCompleto:NombreCompleto,
    Correo:Correo,
    Telefono:Telefono,
    EstadoValor:EstadoValor
    }).then(()=>{
      listar()
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El cliente <strong>{NombreCompleto}</strong> ha sido editado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()

    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo actualizar el cliente!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })
    }
  }

  const pregdelete = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const deleteCliente = (cliente) =>{
    pregdelete.fire({
      title: '¿Estas seguro que desea eliminar el cliente "<strong>'+cliente.NombreCompleto+'</strong>"?' ,
      text: "¡Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
    if(result.isConfirmed){
      Axios.delete("http://localhost:3001/deletecliente/"+cliente.IdCliente)
      .then(()=>{listar()
        noti.fire({
          title: <strong>¡Eliminado!</strong>,
          html: <i>El cliente <strong>{cliente.NombreCompleto}</strong> ha sido eliminado correctamente</i>,
          icon: 'success',
          timer: 3000
        })
        limpiarCampos() 
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡No se pudo eliminar el cliente!',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
        }) })




    } 
    })




    
  }


  listar()

  return (
    
    <div>

    <Header/>
      
      
    <div className='contfrm3'>
      
    <Form className='for '>
        <h3>Detalle Cliente</h3>
      <Form.Group className="mb-3 " controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Documento:
        </Form.Label>
        <Col>
          <Form.Control 
          onChange={(event) => {
            setDocumento(event.target.value)
          }}
          value={Documento}
          type="string" placeholder="Documento" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label>
          Nombre Completo:
        </Form.Label>
        <Col >
          <Form.Control 
          onChange={(event) => {
            setNombreCompleto(event.target.value)
          }}
          value={NombreCompleto}
          type="string" placeholder="Nombre Completo" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label>
          Correo:
        </Form.Label>
        <Col>
          <Form.Control 
          onChange={(event) => {
            setCorreo(event.target.value)
          }}
          value={Correo}
          type="string" placeholder="Correo" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label>
          Telefono:
        </Form.Label>
        <Col>
          <Form.Control
          onChange={(event) => {
            setTelefono(event.target.value)
          }}
          value={Telefono}
          type="number" placeholder="Telefono" />
        </Col>
      </Form.Group>

      <fieldset>
      <Form.Group onChange={(event) => {
            setEstadoValor(event.target.value)
          }} 
          
          className="mb-3" controlId="formHorizontalPassword">
        <Form.Label>  
          Estado
        </Form.Label>
        <Col>
        <select value={EstadoValor}
        // onChange={(event) => 
        //   setEstadoValor(event.target.value)
        // }
        >

    		<option value="1">Activo</option>
    		<option value="0">No Activo</option>
        
   		</select>
           </Col>
      </Form.Group>
      
      </fieldset>

      <Form.Group as={Row} className="mb-3">
        {
          editar?<Col   sm={{ span: 0, offset: 0 }}>
          <Button onClick={updateCliente} style={{margin:"10px"}} variant="warning">Actualizar</Button>
          <Button onClick={limpiarCampos} style={{margin:"10px"}} variant="success">Cancelar</Button>
        </Col>     
          :<Col   sm={{ span: 0, offset: 0 }}>
          <Button onClick={registrar} style={{margin:"10px"}} variant="primary">Registrar</Button>
        </Col> 
        }
            
          
      </Form.Group>
    </Form>
    {/* <Button style={{margin:"10px"}} variant="warning" type="submit" >Limpiar</Button> */}
    <Table striped bordered hover variant="dark" size="sm" style={{width:"1400px"}} className='dgv '>
    <thead>
      <tr>
        <th>Documento</th>
        <th>Nombre Completo</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {clienteList.map((cliente) =>
      
      (
        
        <tr key={cliente.IdCliente}>
         
        <td> {cliente.Documento} </td>
        <td> {cliente.NombreCompleto} </td>
        <td> {cliente.Correo} </td>
        <td> {cliente.Telefono} </td>
        <td> {cliente.Estado} </td>
        <td style={{width:"110px"}}>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={()=>{editarCliente(cliente)}} ><MDBIcon fas icon="pencil-alt" /></Button>
          
          <Button onClick={()=>{deleteCliente(cliente)}} style={{marginRight:"10px"}} variant='danger'><MDBIcon fas icon="trash-alt" /></Button> 
          </ButtonGroup>
          
        </td>

        
        </tr>
       
      ))}
      
    </tbody>
  </Table>
  </div>
  <Footer/>
 </div>
 
  )
  
}

export default FrmCliente