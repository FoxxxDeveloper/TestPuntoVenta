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

const FrmProducto = () => {
  <Header/>
  const [IdProducto,setIdProducto] = useState(0);
  const [Codigo,setCodigo] = useState("");
  const [Nombre,setNombre] = useState("");
  const [Descripcion,setDescripcion] = useState("");
  const [IdCategoria,setIdCategoria] = useState(1);
  const [Stock,setStock] = useState(0);
  const [PrecioCompra,setPrecioCompra] = useState(0);
  const [PrecioVenta,setPrecioVenta] = useState(0);
  const [EstadoValor,setEstadoValor] = useState(1);
  const [productosList,setProductos] = useState([])
  const [editar,setEditar] = useState(false)
  const [categoriasList,setCategorias] = useState([])
  

  const registrar = () =>{

    
    if(Codigo===""|| Nombre===""||Descripcion===""||PrecioCompra===0||PrecioVenta===0) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el producto!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{
    Axios.post("http://localhost:3001/createproducto",{
    Codigo:Codigo,
    Nombre:Nombre,
    Descripcion:Descripcion,
    IdCategoria:IdCategoria,
    Stock:Stock,
    PrecioCompra:PrecioCompra,
    PrecioVenta:PrecioVenta,
    EstadoValor:EstadoValor
    }).then(()=>{
      
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El producto <strong>{Nombre}</strong> ha sido agregado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()
      
    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar el producto!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })

    }
  }

  const listar = () =>{
    Axios.get("http://localhost:3001/productos").then((response)=>{
      setProductos(response.data)
    })
  }

  const limpiarCampos = () =>{
    setIdProducto(0)
    setCodigo("")
    setNombre("")
    setDescripcion("")
    setIdCategoria(1)
    setStock(0)
    setPrecioCompra(0)
    setPrecioVenta(0)
    setEstadoValor(1)
    setEditar(false)
    
  }

  const editarProducto = (val) =>{
    setEditar(true)
    setIdProducto(val.IdProducto)
    setCodigo(val.Codigo)
    setNombre(val.Nombre)
    setDescripcion(val.Descripcion)
    setIdCategoria(val.IdCategoria)
    setStock(val.Stock)
    setPrecioCompra(val.PrecioCompra)
    setPrecioVenta(val.PrecioVenta)
    setEstadoValor(val.Estado)

    
  }
 
  const listarCategorias = () =>{
    Axios.get("http://localhost:3001/categorias").then((response)=>{
      setCategorias(response.data)
    })
  }

  const updateProducto = () =>{

    if(Codigo===""|| Nombre===""||Descripcion===""||PrecioCompra===0||PrecioVenta===0) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo editar el producto!',
        footer: 'Debe rellenar todos los campos'
      }) 

    }else{

    Axios.put("http://localhost:3001/updateproducto",{
    IdProducto:IdProducto,
    Codigo:Codigo,
    Nombre:Nombre,
    Descripcion:Descripcion,
    IdCategoria:IdCategoria,
    Stock:Stock,
    PrecioCompra:PrecioCompra,
    PrecioVenta:PrecioVenta,
    EstadoValor:EstadoValor
    }).then(()=>{
      listar()
      noti.fire({
        title: <strong>¡Operacion exitosa!</strong>,
        html: <i>El producto <strong>{Nombre}</strong> ha sido editado correctamente</i>,
        icon: 'success',
        timer: 3000
      })
      limpiarCampos()

    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo actualizar el producto!',
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

  const deleteProducto = (producto) =>{
    pregdelete.fire({
      title: '¿Estas seguro que desea eliminar el producto "<strong>'+producto.Nombre+'</strong>"?' ,
      text: "¡Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
    if(result.isConfirmed){
      Axios.delete("http://localhost:3001/deleteproducto/"+producto.IdProducto)
      .then(()=>{listar()
        noti.fire({
          title: <strong>¡Eliminado!</strong>,
          html: <i>El producto <strong>{producto.Nombre}</strong> ha sido eliminado correctamente</i>,
          icon: 'success',
          timer: 3000
        })
        limpiarCampos() 
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡No se pudo eliminar el producto!',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
        }) })




    } 
    })




    
  }

  listar()
  listarCategorias()

  return (
    
    <div>

    <Header/>
      
      
    <div className='contfrm'>
      
    <Form className='for '>
        <h3>Detalle Producto</h3>
      <Form.Group className="mb-3 " controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Código:
        </Form.Label>
        <Col>
          <Form.Control 
          onChange={(event) => {
            setCodigo(event.target.value)
          }}
          value={Codigo}
          type="string" placeholder="Código" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHorizontalName">
        <Form.Label>
          Nombre:
        </Form.Label>
        <Col >
          <Form.Control 
          onChange={(event) => {
            setNombre(event.target.value)
          }}
          value={Nombre}
          type="string" placeholder="Nombre" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalDesc">
        <Form.Label>
          Descripción:
        </Form.Label>
        <Col>
          <Form.Control 
          onChange={(event) => {
            setDescripcion(event.target.value)
          }}
          value={Descripcion}
          type="string" placeholder="Descripción" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPrice">
        <Form.Label>
          Precio Compra:
        </Form.Label>
        <Col>
          <Form.Control
          onChange={(event) => {
            setPrecioCompra(event.target.value)
          }}
          value={PrecioCompra}
          type="number" placeholder="Precio Compra" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHorizontalPriceV">
        <Form.Label >
          Precio Venta:
        </Form.Label>
        <Col>
          <Form.Control 
          onChange={(event) => {
            setPrecioVenta(event.target.value)
          }}
          value={PrecioVenta}
          type="number" placeholder="Precio Venta" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalStock">
        <Form.Label >
          Stock
        </Form.Label>
        <Col>
          <Form.Control 
          onChange={(event) => {
            setStock(event.target.value)
          }}
          value={Stock}
          type="number" placeholder="Stock" />
        </Col>
      </Form.Group>
      <fieldset>
      <Form.Group onChange={(event) => {
            setIdCategoria(event.target.value)
          }} 
          
          className="mb-3" controlId="formHorizontalCategory">
        <Form.Label>  
          Categoria
        </Form.Label>
        <Col>
        <Form.Select value={IdCategoria}
        onChange={(event) => 
          setIdCategoria(event.target.value)
        }
        >
             {categoriasList.map((categoria) =>
      
              (
              <option key={categoria.IdCategoria} value={categoria.IdCategoria}>{categoria.Descripcion}</option>
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
          <Button onClick={updateProducto} style={{margin:"10px"}} variant="warning">Actualizar</Button>
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
        <th>Codigo</th>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Categoria</th>
        <th>Stock</th>
        <th>Precio Compra</th>
        <th>Precio Venta</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {productosList.map((producto) =>
      
      (
        
        <tr key={producto.IdProducto}>
         
        <td> {producto.Codigo} </td>
        <td> {producto.Nombre} </td>
        <td> {producto.Descripcion} </td>
        <td> {producto.DescripcionCategoria} </td>
        <td> {producto.Stock} </td>
        <td> {producto.PrecioCompra} </td>
        <td> {producto.PrecioVenta} </td>
        <td> {producto.Estado} </td>
        <td style={{width:"110px"}}>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={()=>{editarProducto(producto)}} ><MDBIcon fas icon="pencil-alt" /></Button>
          
          <Button onClick={()=>{deleteProducto(producto)}} style={{marginRight:"10px"}} variant='danger'><MDBIcon fas icon="trash-alt" /></Button> 
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

export default FrmProducto