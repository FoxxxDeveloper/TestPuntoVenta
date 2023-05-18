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

const FrmMetodoPago = () => {
  <Header/>
  const [IdMetodoPago,setIdMetodoPago] = useState(0);
  const [Descripcion,setDescripcion] = useState("");
  const [Porcentaje,setPorcentaje] = useState(0);
  const [MetodoPagosList,setMetodoPagos] = useState([])
  const [editar,setEditar] = useState(false)

  

  const registrar = () =>{

    
    if(Descripcion==="" || Porcentaje==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el Metodo de Pago!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{
    Axios.post("http://localhost:3001/createMetodo_Pago",{
    Descripcion:Descripcion,
    Porcentaje:Porcentaje
    }).then(()=>{
      
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El Metodo de Pago <strong>{Descripcion}</strong> ha sido agregado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()
      
    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el Metodo de Pago!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })

    }
  }

  const listar = () =>{
    Axios.get("http://localhost:3001/Metodo_Pagos").then((response)=>{
      setMetodoPagos(response.data)
    })
    
  }

  const limpiarCampos = () =>{
    setIdMetodoPago(0)
    setDescripcion("")
    setPorcentaje(0)
    setEditar(false)
    
  }

  const editarMetodoPago = (val) =>{
    setEditar(true)
    setIdMetodoPago(val.IdMetodoPago)
    setDescripcion(val.Descripcion)
    setPorcentaje(val.Porcentaje)

    
  }
 
  

  const updateMetodoPago = () =>{

    if(Descripcion==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo editar el Metodo de Pago!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{

    Axios.put("http://localhost:3001/updateMetodo_Pago",{
    IdMetodoPago:IdMetodoPago,
    Descripcion:Descripcion,
    Porcentaje:Porcentaje
    }).then(()=>{console.log(IdMetodoPago)
      listar()
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El Metodo de Pago <strong>{Descripcion}</strong> ha sido editado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()

    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo actualizar el Metodo de Pago!',
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

  const deleteMetodoPago = (MetodoPago) =>{
    pregdelete.fire({
      title: '¿Estas seguro que desea eliminar el Metodo de Pago "<strong>'+MetodoPago.Descripcion+'</strong>"?' ,
      text: "¡Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
    if(result.isConfirmed){
      Axios.delete("http://localhost:3001/deleteMetodo_Pago/"+MetodoPago.IdMetodoPago)
      .then(()=>{listar()
        noti.fire({
          title: <strong>¡Eliminado!</strong>,
          html: <i>El MetodoPago <strong>{MetodoPago.Descripcion}</strong> ha sido eliminado correctamente</i>,
          icon: 'success',
          timer: 3000
        })
        limpiarCampos() 
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡No se pudo eliminar el Metodo de Pago!',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
        }) })

    } 
    })




    
  }


  listar()

  return (
    
    <div className='divgeneral'>

    <Header/>
      
      
    <div className='contfrm2'>
      
    <Form className='for2'>
        <h3>Detalle Metodo de Pago</h3>
      <Form.Group className="mb-3 " controlId="formHorizontalDesc">
        <Form.Label >
          Descripcion:
        </Form.Label>
        <Col>
          <Form.Control 
          onChange={(event) => {
            setDescripcion(event.target.value)
          }}
          value={Descripcion}
          type="string" placeholder="Descripcion" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formHorizontalPorc">
        <Form.Label >
          Porcentaje:
        </Form.Label>
        <Col>
          <Form.Control 
          onChange={(event) => {
            setPorcentaje(event.target.value)
          }}
          value={Porcentaje}
          type="number" placeholder="Porcentaje" />
        </Col>
      </Form.Group>

    

      <Form.Group as={Row} className="mb-3">
        {
          editar?<Col   sm={{ span: 0, offset: 0 }}>
          <Button onClick={updateMetodoPago} style={{margin:"10px"}} variant="warning">Actualizar</Button>
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
        <th>Descripcion</th>
        <th>Porcentaje</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {MetodoPagosList.map((MetodoPago) =>
      
      (
        
        <tr key={MetodoPago.IdMetodoPago}>
        <td> {MetodoPago.Descripcion} </td>
        <td> {MetodoPago.Porcentaje} </td>
        <td style={{width:"110px"}}>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={()=>{editarMetodoPago(MetodoPago)}} ><MDBIcon fas icon="pencil-alt" /></Button>
          
          <Button onClick={()=>{deleteMetodoPago(MetodoPago)}} style={{marginRight:"10px"}} variant='danger'><MDBIcon fas icon="trash-alt" /></Button> 
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

export default FrmMetodoPago