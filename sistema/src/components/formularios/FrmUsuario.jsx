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

const FrmUsuario = () => {
  <Header/>
  const [IdUsuario,setIdUsuario] = useState(0);
  const [Documento,setDocumento] = useState("");
  const [NombreCompleto,setNombreCompleto] = useState("");
  const [Correo,setCorreo] = useState("");
  const [Clave,setClave] = useState("");
  const [IdRol,setIdRol] = useState(1);
  const [EstadoValor,setEstadoValor] = useState(1);
  const [UsuarioList,setUsuarios] = useState([])
  const [editar,setEditar] = useState(false)
  const [rolList,setRoles] = useState([])
  

  const registrar = () =>{

    
    if(Documento===""|| NombreCompleto===""|| Correo===""||Clave==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el Usuario!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{
    Axios.post("http://localhost:3001/createUsuario",{
    
    Documento:Documento,
    NombreCompleto:NombreCompleto,
    Correo:Correo,
    Clave:Clave,
    IdRol:IdRol,
    EstadoValor:EstadoValor
    }).then(()=>{
      
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El Usuario <strong>{NombreCompleto}</strong> ha sido agregado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()
      
    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el Usuario!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })

    }
  }

  const listar = () =>{
    Axios.get("http://localhost:3001/Usuarios").then((response)=>{
      setUsuarios(response.data)
    })
  }

  const listarRoles = () =>{
    Axios.get("http://localhost:3001/roles").then((response)=>{
      setRoles(response.data)
    })
  }

  const limpiarCampos = () =>{
    setIdUsuario(0)
    setDocumento("")
    setNombreCompleto("")
    setCorreo("")
    setClave("")
    setIdRol(1)
    setEstadoValor(1)
    setEditar(false)
    
  }

  const editarUsuario = (val) =>{
    setEditar(true)
    setIdUsuario(val.IdUsuario)
    setDocumento(val.Documento)
    setNombreCompleto(val.NombreCompleto)
    setCorreo(val.Correo)
    setClave(val.Clave)
    setIdRol(val.IdRol)
    setEstadoValor(val.Estado.data[0])
    console.log(val)
    
  }
 
  

  const updateUsuario = () =>{

    if(Documento===""|| NombreCompleto===""|| Correo===""||Clave==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo editar el Usuario!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{

    Axios.put("http://localhost:3001/updateUsuario",{
    IdUsuario:IdUsuario,
    Documento:Documento,
    NombreCompleto:NombreCompleto,
    Correo:Correo,
    Clave:Clave,
    IdRol:IdRol,
    EstadoValor:EstadoValor
    }).then(()=>{
      listar()
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El Usuario <strong>{NombreCompleto}</strong> ha sido editado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()

    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo actualizar el Usuario!',
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

  const deleteUsuario = (Usuario) =>{
    pregdelete.fire({
      title: '¿Estas seguro que desea eliminar el Usuario "<strong>'+Usuario.NombreCompleto+'</strong>"?' ,
      text: "¡Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
    if(result.isConfirmed){
      Axios.delete("http://localhost:3001/deleteUsuario/"+Usuario.IdUsuario)
      .then(()=>{listar()
        noti.fire({
          title: <strong>¡Eliminado!</strong>,
          html: <i>El Usuario <strong>{Usuario.NombreCompleto}</strong> ha sido eliminado correctamente</i>,
          icon: 'success',
          timer: 3000
        })
        limpiarCampos() 
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡No se pudo eliminar el Usuario!',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
        }) })




    } 
    })




    
  }


  listar()
  listarRoles()

  return (
    
    <div className='divgeneral'>

    <Header/>
      
      
    <div className='contfrm3'>
      
    <Form className='for '>
        <h3>Detalle Usuario</h3>
      <Form.Group className="mb-3 " controlId="formHorizontalDoc">
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

      <Form.Group className="mb-3" controlId="formHorizontalName">
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
      
      <Form.Group className="mb-3" controlId="formHorizontalEmail">
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
          Clave:
        </Form.Label>
        <Col>
          <Form.Control
          onChange={(event) => {
            setClave(event.target.value)
          }}
          value={Clave}
          type="password" placeholder="Clave" />
        </Col>
      </Form.Group>
      <fieldset>
      <Form.Group onChange={(event) => {
            setIdRol(event.target.value)
          }} 
          
          className="mb-3" controlId="formHorizontalRol">
        <Form.Label>  
          Rol
        </Form.Label>
        <Col>
        <Form.Select value={IdRol}
        onChange={(event) => 
          setIdRol(event.target.value)
        }
        >
             {rolList.map((rol) =>
      
              (
              <option key={rol.IdRol} value={rol.IdRol}>{rol.Descripcion}</option>
            ))}
    		
        
   		</Form.Select>
           </Col>
      </Form.Group>
      
      </fieldset>
      <fieldset>
      <Form.Group onChange={(event) => {
            setEstadoValor(event.target.value)
          }} 
          
          className="mb-3" controlId="formHorizontalState">
        <Form.Label>  
          Estado
        </Form.Label>
        <Col>
        <Form.Select value={EstadoValor}
        onChange={(event) => 
          setEstadoValor(event.target.value)
        }
        >

    		<option value="1">Activo</option>
    		<option value="0">No Activo</option>
        
   		</Form.Select>
           </Col>
      </Form.Group>
      
      </fieldset>

      <Form.Group as={Row} className="mb-3">
        {
          editar?<Col   sm={{ span: 0, offset: 0 }}>
          <Button onClick={updateUsuario} style={{margin:"10px"}} variant="warning">Actualizar</Button>
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
        <th>ROL</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {UsuarioList.map((Usuario) =>
      
      (
        
        <tr key={Usuario.IdUsuario}>
        <td> {Usuario.Documento} </td>
        <td> {Usuario.NombreCompleto}</td>
        <td> {Usuario.Correo} </td>
        <td> {Usuario.Descripcion} </td>
        <td> {Usuario.Estado.data[0]} </td>
        <td style={{width:"110px"}}>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={()=>{editarUsuario(Usuario)}} ><MDBIcon fas icon="pencil-alt" /></Button>
          
          <Button onClick={()=>{deleteUsuario(Usuario)}} style={{marginRight:"10px"}} variant='danger'><MDBIcon fas icon="trash-alt" /></Button> 
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

export default FrmUsuario