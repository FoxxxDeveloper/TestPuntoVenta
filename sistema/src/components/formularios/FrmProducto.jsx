import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import '../../Css/forms.css'
import { useState } from 'react';
import Axios from 'axios';





const FrmProducto = () => {
       
    
  const [Codigo,setCodigo] = useState("");
  const [Nombre,setNombre] = useState("");
  const [Descripcion,setDescripcion] = useState("");
  const [IdCategoria,setIdCategoria] = useState("");
  const [Stock,setStock] = useState(0);
  const [PrecioCompra,setPrecioCompra] = useState(0);
  const [PrecioVenta,setPrecioVenta] = useState(0);
  const [EstadoValor,setEstadoValor] = useState("");
  const [productosList,setProductos] = useState([])

  

  const registrar = () =>{
    var cod = document.getElementById("estadoo").value;
    Axios.post("http://localhost:3001/createproducto",{
    Codigo:Codigo,
    Nombre:Nombre,
    Descripcion:Descripcion,
    //IdCategoria:IdCategoria,
    IdCategoria:1,
    Stock:Stock,
    PrecioCompra:PrecioCompra,
    PrecioVenta:PrecioVenta,
    EstadoValor:cod
    }).then(()=>{
      alert("Producto registrado")
      
    })
  }

  const listar = () =>{
    Axios.get("http://localhost:3001/productos").then((response)=>{
      setProductos(response.data)
    })
  }

  

  return (
    
    <div>

      
      
      

      
    <Form className='for '>
        <h3>Detalle Producto</h3>
      <Form.Group className="mb-3 " controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Código:
        </Form.Label>
        <Col sm={2}>
          <Form.Control 
          onChange={(event) => {
            setCodigo(event.target.value)
          }}
          type="string" placeholder="Código" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Nombre:
        </Form.Label>
        <Col sm={2}>
          <Form.Control 
          onChange={(event) => {
            setNombre(event.target.value)
          }}
          type="string" placeholder="Nombre" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Descripción:
        </Form.Label>
        <Col sm={2}>
          <Form.Control 
          onChange={(event) => {
            setDescripcion(event.target.value)
          }}
          type="string" placeholder="Descripción" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Precio Compra:
        </Form.Label>
        <Col sm={2}>
          <Form.Control
          onChange={(event) => {
            setPrecioCompra(event.target.value)
          }}
          type="number" placeholder="Precio Compra" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Precio Venta:
        </Form.Label>
        <Col sm={2}>
          <Form.Control 
          onChange={(event) => {
            setPrecioVenta(event.target.value)
          }}
          type="number" placeholder="Precio Venta" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Stock
        </Form.Label>
        <Col sm={2}>
          <Form.Control 
          onChange={(event) => {
            setStock(event.target.value)
          }}
          type="number" placeholder="Stock" />
        </Col>
      </Form.Group>
      <fieldset>
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>  
          Estado
        </Form.Label>
        <Col sm={2}>
        <select id='estadoo'
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
        <Col   sm={{ span: 0, offset: 0 }}>
          <Button onClick={registrar} style={{margin:"10px"}} variant="success">Guardar</Button>
          <Button style={{margin:"10px"}} variant="warning" type="submit" >Limpiar</Button>
          <Button style={{margin:"10px"}} variant="danger" type="submit">Eliminar</Button>
        </Col>     
          
      </Form.Group>
    </Form>

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
      </tr>
    </thead>
    <tbody>
      {productosList.map((producto) =>
      
      (
        
        <tr key={producto.idProducto}>
         
        <td> {producto.Codigo} </td>
        <td> {producto.Nombre} </td>
        <td> {producto.Descripcion} </td>
        <td> {producto.DescripcionCategoria} </td>
        <td> {producto.Stock} </td>
        <td> {producto.PrecioCompra} </td>
        <td> {producto.PrecioVenta} </td>
        <td> {producto.Estado} </td>

        
        </tr>
       
      ))}
      
    </tbody>
  </Table>
  {listar()}
 </div>
  )
}

export default FrmProducto