import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import '../../Css/registros.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Axios from 'axios';
import { MDBIcon} from 'mdb-react-ui-kit';
import { useState, useEffect} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import MdProducto from '../modales/MdProducto';
import MdCliente from '../modales/MdCliente';

const FrmRegistrarV = () => {


  
  const fecha = new Date();
  const dia = fecha.getDate() 
  const mes=fecha.getMonth()+1
  const anio=fecha.getFullYear()

  const listar = () =>{
    Axios.get("http://localhost:3001/Metodo_Pagos").then((response)=>{
      setMetodoPagos(response.data)
    })
    
  }
 
  const [MetodoPagosList,setMetodoPagos] = useState([])
  const [estadoModalP, setEstadoModalP] = useState(false)
  const [estadoModalC, setEstadoModalC] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [IdProducto,setIdProducto] = useState(0);
  const [Codigo,setCodigo] = useState("");
  const [Nombre,setNombre] = useState("");
  const [Stock,setStock] = useState(0);
  const [Cantidad,setCantidad] = useState(1);
  const [PrecioVenta,setPrecioVenta] = useState(0);
  const [productosList,setProductosList] = useState([])
  //CLIENTE
  const [Documento,setDocumento] = useState("0");
  const [NombreCompleto,setNombreCompleto] = useState("Consumidor final");
  const [IdCliente,setIdCliente] = useState(1);
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  const limpiarCampos = () =>{
    setIdProducto(0)
    setCodigo("")
    setNombre("")
    setStock(0)
    setPrecioVenta(0)
    setCantidad(1)
    
  }

  const cargarProducto = (val) =>{
    setIdProducto(val.IdProducto)
    setCodigo(val.Codigo)
    setNombre(val.Nombre)
    setStock(val.Stock)
    setPrecioVenta(val.PrecioVenta)

    
  }
  const eliminarProducto = (id) =>{
   const arrayNuevo = productosList.filter((producto)=> producto.IdProducto !== id )
   console.log(arrayNuevo)
  setProductosList(arrayNuevo)
  }
  const handleAgregar = () =>{

    const existeProducto = productosList.find(
      (producto) => producto.IdProducto === IdProducto
    );
    if (existeProducto) {
      //AGREGAR ALERTA DE BOOTSTRAP
      alert('El producto ya existe');
    } else {
      if (IdProducto !== 0) {
        const nuevoProducto = {
          IdProducto: IdProducto,
          Codigo: Codigo,
          Nombre: Nombre,
          PrecioVenta: PrecioVenta,
          Cantidad: Cantidad,
          SubTotal: PrecioVenta * Cantidad
        };
  
        setProductosList([...productosList, nuevoProducto]);
        limpiarCampos();
      } else {
        //AGREGAR ALERTA DE BOOTSTRAP
        alert('Debe seleccionar un producto');
      }
    }




  }


  const handleSeleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  setEstadoModalC(false);

    setIdCliente(clienteSeleccionado.IdCliente)
    setDocumento(clienteSeleccionado.Documento)
    setNombreCompleto(clienteSeleccionado.NombreCompleto)


    //USAR ID CLIENTE PARA REGISTRAR LA VENTA
  console.log(IdCliente)
  };

  const handleSeleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setEstadoModalP(false);
  };
  useEffect(()=>{
    listar()
  },[])

  useEffect(()=>{
   productoSeleccionado!=null ? cargarProducto(productoSeleccionado) : setNombre("")
  },[productoSeleccionado])

  return (
    
    <div className='divgeneral'>
      <Header/>
      
      <h2 style={{marginLeft:'120px'}}>Registrar Venta</h2>
      <div className='cont'>
      <div className='info'>
      <div className='infov'>
      <Form style={{display:'flex'}}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Col sm="10">
        {mes < 10 ? (
        <Form.Control plaintext readOnly defaultValue={`Fecha: ${dia}-0${mes}-${anio}`} />
         ) : (
         <Form.Control plaintext readOnly defaultValue={`Fecha: ${dia}-${mes}-${anio}`} />
       )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="8">
          Tipo de comprobante:
        </Form.Label>
        <Col sm="17">
          <Form.Select aria-label="Tipo de comprobante">
            <option>Factura A</option>
          </Form.Select>
        </Col>
      </Form.Group>
    </Form>
      </div>

      <div className='infocli'>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Número Documento:
        </Form.Label>
        <Form.Label style={{marginLeft:'50px'}} column sm="4">
          Nombre Completo:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-18px'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
       
        <Col sm="4">
          <Form.Control value={Documento} type='text' disabled readOnly />
        </Col>
        <Button onClick={()=> setEstadoModalC(true)} style={{width:'50px'}} variant="primary"> <MDBIcon fas icon="search" /> </Button>
        <Col sm="7">
          <Form.Control value={NombreCompleto} type='text' disabled readOnly />
        </Col>
      </Form.Group>
    </Form>

      </div>

      </div>
      <div className='info'>
        <div>
      <div className='infoproducto'>
      <Form >
      <Form.Group as={Row} className="mb-2" style={{display:'flex'}} controlId="formPlaintextEmail">
        <Form.Label style={{marginLeft:'20px'}} column sm="4">
          Cod. Producto:
        </Form.Label>
        <Form.Label style={{marginLeft:'-185px', width: '20px'}} column sm="4">
          Producto:
        </Form.Label>
        <Form.Label style={{marginLeft:'205px', width: '20px'}} column sm="9">
          Precio:
        </Form.Label>
        <Form.Label style={{marginLeft:'150px', width: '20px'}} column sm="4">
          Stock:
        </Form.Label>
        <Form.Label style={{marginLeft:'150px', width: '20px'}} column sm="4">
          Cantidad:
        </Form.Label>
        
      </Form.Group>

      <Form.Group style={{marginTop:'-5px', marginLeft:'1px', display:'flex'}} as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col sm="2">
          <Form.Control  onChange={(event) => {
            setCodigo(event.target.value)
          }}
          value={Codigo} type='text' placeholder="Cod" />
        </Col>
        <Col sm="2">
          <Form.Control onChange={(event) => {
            setNombre(event.target.value)
          }}
          value={Nombre} type='text' placeholder="Producto" disabled readOnly />
        </Col>
        <Button onClick={()=> setEstadoModalP(true)} style={{width:'50px'}} variant="primary"> <MDBIcon fas icon="search" /></Button>
        <Col sm="2">
          <Form.Control onChange={(event) => {
            setPrecioVenta(event.target.value)
          }}
          value={PrecioVenta} type='number' placeholder="Precio" />
        </Col>
        <Col sm="2">
          <Form.Control onChange={(event) => {
            setStock(event.target.value)
          }}
          value={Stock} type='number' placeholder="Stock" disabled readOnly />
        </Col>
        <Col sm="2">
          <Form.Control  onChange={(event) => {
            setCantidad(event.target.value)
          }}
          value={Cantidad}type='number' placeholder='Cantidad'/>
        </Col>
      </Form.Group>
    </Form>
      </div>
      <div className='listprod'>
      <Table striped bordered hover variant="dark" size="sm" style={{width:"1048px"}} className='dgv '>
      <thead>
      <tr>
        <th>Id</th>
        <th>Codigo</th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>SubTotal</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
          
          
    {productosList.map((producto) =>
      
      (
        
        <tr key={producto.IdProducto}>
         <td> {producto.IdProducto} </td>
        <td> {producto.Codigo} </td>
        <td> {producto.Nombre} </td>
        <td> {producto.PrecioVenta} </td>
        <td> {producto.Cantidad} </td>
        <td> {producto.SubTotal} </td>
        <td style={{width:"40px"}}>
        <ButtonGroup aria-label="Basic example"> <Button onClick={()=> eliminarProducto(producto.IdProducto)} style={{marginRight:"10px"}} variant='danger'><MDBIcon fas icon="trash-alt" /></Button>  </ButtonGroup></td>


        
        </tr>
       
      ))} 
       
      
    </tbody>
    </Table>
      </div>
      </div>
      <div className='interacciones'>
      <ButtonGroup aria-label="Basic example"> <Button onClick={()=> handleAgregar()} style={{width:'80px', height:'80px', marginLeft:'35px'}} variant='success'> <MDBIcon far icon="plus-square" size='2x' />Agregar</Button>  </ButtonGroup>
      <Form style={{marginLeft:'10px'}}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="8">
          Metodo de Pago:
        </Form.Label>
        <Col>
        <Form.Select
        onChange={(event) => 
          setMetodoPagos(event.target.value)
        }
        >
             {MetodoPagosList.map((metodo) =>
      
              (
              <option key={metodo.IdMetodoPago} value={metodo.IdMetodoPago}>{metodo.Descripcion}</option>
            ))}
    		
        
   		</Form.Select>
           </Col>
      </Form.Group>


      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>SubTotal</Form.Label>
        <Form.Control type="text" placeholder="SubTotal" disabled readOnly />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Total</Form.Label>
        <Form.Control type="text" placeholder="Total" disabled readOnly />
      </Form.Group>
      <ButtonGroup aria-label="Basic example"> <Button style={{width:'130px', height:'50px', display: 'flex', marginTop:'50px'}} variant='primary'> <MDBIcon style={{marginRight:'10px'}} far icon="plus-square" size='2x'/>Registrar</Button>  </ButtonGroup>

    </Form>
      
      </div>
      
      
      </div>


      </div>


    <Footer/>
                <MdCliente titulo='Clientes' estado={estadoModalC} setEstadoModalC={setEstadoModalC} seleccionarCliente={handleSeleccionarCliente}></MdCliente>
               <MdProducto titulo='Productos' estado={estadoModalP} setEstadoModalP={setEstadoModalP} seleccionarProducto={handleSeleccionarProducto}></MdProducto>

                  

    </div>
  )
}

export default FrmRegistrarV