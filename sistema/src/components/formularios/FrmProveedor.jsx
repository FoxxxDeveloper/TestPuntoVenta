import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import '../../Css/forms.css'
import { useState, useEffect} from 'react';
import Axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {MDBIcon} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const noti = withReactContent(Swal)

const FrmProveedor = () => {


// DECLARACION DE ESTADOS
  const [IdProveedor,setIdProveedor] = useState(0);
  const [Documento,setDocumento] = useState("");
  const [RazonSocial,setRazonSocial] = useState("");
  const [Correo,setCorreo] = useState("");
  const [Telefono,setTelefono] = useState("");
  const [EstadoValor,setEstadoValor] = useState(1);
  const [ProveedorList,setProveedors] = useState([])
  const [editar,setEditar] = useState(false)
  const [tablaProveedores,setTablaProveedores] = useState([])
  const [filtro,setFiltro] = useState("Documento");
  const [busqueda,setBusqueda] = useState("")
  
//FUNCION PARA AGREGAR UN NUEVO PROVEEDOR
  const registrar = () =>{
   
    if(Documento===""|| RazonSocial===""|| Correo===""||Telefono==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el Proveedor!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{
    Axios.post("http://localhost:3001/createProveedor",{
    Documento:Documento,
    RazonSocial:RazonSocial,
    Correo:Correo,
    Telefono:Telefono,
    EstadoValor:EstadoValor
    }).then(()=>{
      
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El Proveedor <strong>{RazonSocial}</strong> ha sido agregado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()
      
    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el Proveedor!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })

    }
  }
//FUNCION PARA LISTAR TODOS LOS PROVEEDORES
  const listar = async () =>{
  await  Axios.get("http://localhost:3001/Proveedores").then((response)=>{
      setProveedors(response.data)
      setTablaProveedores(response.data)
    })
  }

  // FUNCION PARA LIMPIAR LOS INPUT 
  const limpiarCampos = () =>{
    setIdProveedor(0)
    setDocumento("")
    setRazonSocial("")
    setCorreo("")
    setTelefono("")
    setEstadoValor(1)
    setEditar(false)
    
  }
// FUNCION PARA TOMAR LOS VALORES DE CADA PROVEEDOR Y PODER EDITARLOS
  const editarProveedor = (val) =>{
    setEditar(true)
    setIdProveedor(val.IdProveedor)
    setDocumento(val.Documento)
    setRazonSocial(val.RazonSocial)
    setCorreo(val.Correo)
    setTelefono(val.Telefono)
    setEstadoValor(val.Estado.data[0])

    
  }
 
  
  //FUNCION PARA EDITAR LOS PROVEEDORES
  const updateProveedor = () =>{

    if(Documento===""|| RazonSocial===""|| Correo===""||Telefono==="") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo editar el Proveedor!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{

    Axios.put("http://localhost:3001/updateProveedor",{
    
    IdProveedor:IdProveedor,
    Documento:Documento,
    RazonSocial:RazonSocial,
    Correo:Correo,
    Telefono:Telefono,
    EstadoValor:EstadoValor
    }).then(()=>{
      listar()
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El Proveedor <strong>{RazonSocial}</strong> ha sido editado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()

    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo actualizar el Proveedor!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })
    }
  }
// ALERTA PREVIA PARA AVISAR QUE ESTA POR BORRAR UN PROVEEDOR
  const pregdelete = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  // FUNCION PARA BORRAR EL PRODUCTO
  const deleteProveedor = (Proveedor) =>{
    pregdelete.fire({
      title: '¿Estas seguro que desea eliminar el Proveedor "<strong>'+Proveedor.RazonSocial+'</strong>"?' ,
      text: "¡Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
    if(result.isConfirmed){
      Axios.delete("http://localhost:3001/deleteProveedor/"+Proveedor.IdProveedor)
      .then(()=>{listar()
        noti.fire({
          title: <strong>¡Eliminado!</strong>,
          html: <i>El Proveedor <strong>{Proveedor.RazonSocial}</strong> ha sido eliminado correctamente</i>,
          icon: 'success',
          timer: 3000
        })
        limpiarCampos() 
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡No se pudo eliminar el Proveedor!',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
        }) })




    } 
    })




    
  }

  //FUNCION PARA FILTRAR LOS PROVEEDOR
  const handleChange=e=> {
    setBusqueda(e.target.value)
    filtrar(e.target.value, filtro)
  }
  //FUNCION PARA FILTRAR LOS PROVEEDOR
  const filtrar=(cadenaBusqueda, filtro)=>{
    var resultadosBusqueda=tablaProveedores.filter((elemento)=>{
      if(elemento[filtro].toString().toLowerCase().includes(cadenaBusqueda.toLowerCase())){
        return elemento;
      }
      return 0;
    })
    setProveedors(resultadosBusqueda)
  }

  //LLAMADO A LA FUNCION LISTAR PROVEEDORES
  useEffect(()=>{
    listar()
  },[])

  return (
    
    <div className='divgeneral'>

    <Header/>
      
    <div>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label style={{marginLeft:'920px'}} column sm="2">
         Buscar por:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-18px'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Col >
                             <Form.Select onChange={(event) => 
                                setFiltro(event.target.value)
                                        }
                               style={{width:'200px', marginLeft:'920px'}} >
                                <option  value='Documento' >Documento</option> 
                                <option  value='RazonSocial' >Razon Social</option> 
                                <option  value='Correo' >Correo</option> 
                                <option  value='Telefono' >Telefono</option> 
                                 <option  value='Estado' >Estado</option> 
                                
                                
   	                          </Form.Select>
                             </Col>
    
                             <Form.Control value={busqueda} style={{width:'220px', marginRight:'420px'}} type='text' placeholder='Texto a buscar' onChange={handleChange} />
        </Form.Group>
      
    </Form>

      </div>         
    <div className='contfrm3'>
      
    <Form className='for '>
        <h3>Detalle Proveedor</h3>
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

      <Form.Group className="mb-3" controlId="formHorizontalRS">
        <Form.Label>
          Razon Social:
        </Form.Label>
        <Col >
          <Form.Control 
          onChange={(event) => {
            setRazonSocial(event.target.value)
          }}
          value={RazonSocial}
          type="string" placeholder="Razon Social" />
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
      
      <Form.Group className="mb-3" controlId="formHorizontalCel">
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
          <Button onClick={updateProveedor} style={{margin:"10px"}} variant="warning">Actualizar</Button>
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
        <th>Razon Social</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {ProveedorList.map((Proveedor) =>
      
      (
        
        <tr key={Proveedor.IdProveedor}>
         
        <td> {Proveedor.Documento} </td>
        <td> {Proveedor.RazonSocial} </td>
        <td> {Proveedor.Correo} </td>
        <td> {Proveedor.Telefono} </td>
        <td> {Proveedor.Estado.data[0]} </td>
        <td style={{width:"110px"}}>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={()=>{editarProveedor(Proveedor)}} ><MDBIcon fas icon="pencil-alt" /></Button>
          
          <Button onClick={()=>{deleteProveedor(Proveedor)}} style={{marginRight:"10px"}} variant='danger'><MDBIcon fas icon="trash-alt" /></Button> 
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

export default FrmProveedor