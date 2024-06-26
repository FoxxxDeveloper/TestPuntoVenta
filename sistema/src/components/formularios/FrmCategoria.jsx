import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import '../../Css/forms.css'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {MDBIcon} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const noti = withReactContent(Swal)

const FrmCategoria = () => {
 
  // Declarando estados
  const [IdCategoria,setIdCategoria] = useState(0);
  const [Descripcion,setDescripcion] = useState("");
  const [EstadoValor,setEstadoValor] = useState(1);
  const [categoriasList,setCategorias] = useState([])
  const [editar,setEditar] = useState(false)

  
    // Función para registrar una nueva categoría
  const registrar = () =>{

    
    if(Descripcion==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar la categoria!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{
    Axios.post("http://localhost:3001/categoria/registrar",{
    Descripcion:Descripcion,
    EstadoValor:EstadoValor
    }).then(()=>{
      
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>La categoria <strong>{Descripcion}</strong> ha sido agregada correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()
      
    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar la categoria!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })

    }
  }
// Función para listar todas las categorías
  const listar = () =>{
    Axios.get("http://localhost:3001/categoria/").then((response)=>{
      setCategorias(response.data)
    })
  }
// Función limpiar los campos
  const limpiarCampos = () =>{
    setIdCategoria(0)
    setDescripcion("")
    setEstadoValor(1)
    setEditar(false)
    
  }
// Funcion para cargar la categoría a los inputs
  const editarCategoria = (val) =>{
    setEditar(true)
    setIdCategoria(val.IdCategoria)
    setDescripcion(val.Descripcion)
    setEstadoValor(val.Estado.data[0])

    
  }
 
  
// Función para editar una categoría
  const updateCategoria = () =>{

    if(Descripcion==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo editar la categoria!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{

    Axios.put("http://localhost:3001/categoria/editar",{
    IdCategoria:IdCategoria,
    Descripcion:Descripcion,
    EstadoValor:EstadoValor
    }).then(()=>{
      
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>La categoria <strong>{Descripcion}</strong> ha sido editada correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()

    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo actualizar la categoria!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })
    }
  }
// Alerta para preguntar si desea eliminar
  const pregdelete = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
// Función para eliminar una categoría
  const deleteCategoria = (categoria) =>{
    pregdelete.fire({
      title: '¿Estas seguro que desea eliminar la categoria "<strong>'+categoria.Descripcion+'</strong>"?' ,
      text: "¡Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
    if(result.isConfirmed){
      Axios.delete("http://localhost:3001/categoria/eliminar/"+categoria.IdCategoria)
      .then(()=>{
        noti.fire({
          title: <strong>¡Eliminada!</strong>,
          html: <i>La categoria <strong>{categoria.Descripcion}</strong> ha sido eliminada correctamente</i>,
          icon: 'success',
          timer: 3000
        })
        limpiarCampos() 
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡No se pudo eliminar la categoria!',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
        }) })




    } 
    })
  }


  useEffect(()=>{
    listar()
  },[categoriasList])

  return (
    
    <div className='divgeneral'>

    <Header/>
      
      
    <div className='contfrm2'>
      
    <Form className='for2'>
        <h3>Detalle Categoria</h3>
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
          <Button onClick={updateCategoria} style={{margin:"10px"}} variant="warning">Actualizar</Button>
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
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {categoriasList.map((categoria) =>
      
      (
        
        <tr key={categoria.IdCategoria}>
        <td> {categoria.Descripcion} </td>
        <td> {categoria.Estado.data[0]} </td>
        <td style={{width:"110px"}}>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={()=>{editarCategoria(categoria)}} ><MDBIcon fas icon="pencil-alt" /></Button>
          
          <Button onClick={()=>{deleteCategoria(categoria)}} style={{marginRight:"10px"}} variant='danger'><MDBIcon fas icon="trash-alt" /></Button> 
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

export default FrmCategoria