import React,{ useRef } from 'react'
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const noti = withReactContent(Swal)
const FrmRegistrarV = () => {
  
  const fecha = new Date();
  const dia = fecha.getDate() 
  const mes=fecha.getMonth()+1
  const anio=fecha.getFullYear()

  
 //DECLARACION DE ESTADOS 
  const [MetodoPagosList,setMetodoPagos] = useState([])
  const [estadoModalP, setEstadoModalP] = useState(false)
  const [estadoModalC, setEstadoModalC] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [IdProducto,setIdProducto] = useState(0);
  const [Codigo,setCodigo] = useState("");
  const [Nombre,setNombre] = useState("");
  const [TipoDocumento,setTipoDocumento] = useState("Factura A");
  const [MetodoPago,setMetodoPago] = useState("Efectivo");
  const [Porcentaje,setPorcentaje] = useState(0);
  const [Stock,setStock] = useState(0);
  const [IdVenta,setIdVenta] = useState(0);
  const [Cantidad,setCantidad] = useState(1);
  const [PrecioVenta,setPrecioVenta] = useState(0);
  const [productosList,setProductosList] = useState([])
  const [subTotal,setSubTotal] = useState(0);
  const [Total,setTotal] = useState(0);
  const CodigoRef = useRef(null);
  const [Documento,setDocumento] = useState("0");
  const [NombreCompleto,setNombreCompleto] = useState("Consumidor final");
  const [IdCliente,setIdCliente] = useState(1);
  const [clienteSeleccionado, setClienteSeleccionado] = useState([]);
  
  //FUNCION PARA LISTAR LOS METODOS DE PAGOS
  const listar = () =>{
    Axios.get("http://localhost:3001/Metodo_Pago").then((response)=>{
      setMetodoPagos(response.data)
    })
    
  }
  
  //FUNCION PARA LIMPIAR CAMPOS
  const limpiarCampos = () =>{
    setIdProducto(0)
    setCodigo("")
    setNombre("")
    setStock(0)
    setPrecioVenta(0)
    setCantidad(1)
    
  }
  //FUNCION PARA LIMPIAR CAMPOS
  const limpiarCampos2 = () =>{
    setIdProducto(0)
    setNombre("")
    setStock(0)
    setPrecioVenta(0)
    setCantidad(1)
    
  }

  //FUNCION PARA CARGAR EL PRODUCTO
  const cargarProducto = (val) =>{
    setIdProducto(val.IdProducto)
    setCodigo(val.Codigo)
    setNombre(val.Nombre)
    setStock(val.Stock)
    setPrecioVenta(val.PrecioVenta)   
  }

//FUNCION PARA CARGAR EL CLIENTE
  const cargarCliente = (val) =>{
    setIdCliente(val.IdCliente)
    setDocumento(val.Documento)
    setNombreCompleto(val.NombreCompleto)  
  }

  // FUNCION PARA ELIMINAR UN PRODUCTO DEL LISTADO DE VENTA
  const eliminarProducto = (id) =>{
   const arrayNuevo = productosList.filter((producto)=> producto.IdProducto !== id )
   console.log(arrayNuevo)
  setProductosList(arrayNuevo)
  }
  
  //FUNCION PARA AGREGAR UN PRODUCTO AL LISTADO DE LA VENTA
  const handleAgregar = () =>{
    const existeProducto = productosList.find(
    (producto) => producto.IdProducto === IdProducto
  );
  if (existeProducto) {
    const productosActualizados = productosList.map((producto) => {
      if (producto.IdProducto === IdProducto) {
        return {
          ...producto,
          Cantidad: Number(producto.Cantidad) + Number(Cantidad),
          SubTotal: (Number(producto.Cantidad) + Number(Cantidad)) * producto.PrecioVenta
        };
      }
      return producto;
    });
    setProductosList(productosActualizados);
    limpiarCampos();
      //AGREGAR ALERTA DE BOOTSTRAP
      //Editar Cantidad del producto en la tabla donde el idproducto sea igual al idproducto que estoy agregando
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

  

  //FUNCION PARA OBTENER EL NUMERO DE VENTA CORRELATIVA
  const buscarCorrelativo = async() =>{
    await Axios.get("http://localhost:3001/venta/correlativa").then((response)=>{
       setIdVenta(response.data[0].ultimaventa)
     })
   }

  //FUNCION PARA SELECCION UN CLIENTE
  const handleSeleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
  setEstadoModalC(false);
  };

  //FUNCION PARA SELECCION UN PRODUCTO
  const handleSeleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setEstadoModalP(false);
  };
  //LLAMADO A LA FUNCION LISTAR 
  useEffect(()=>{
    listar()
  },[])

  // 
  const handleKeyDown =  (event) => {
    
    if (event.key === 'Enter') {

      Axios.get(`http://localhost:3001/producto/buscar?Codigo=${Codigo}`)
        .then((response) => {
          console.log(response.data)
          // Maneja la respuesta del servidor
          const ProductoEncontrado = response.data;
          if (ProductoEncontrado) {
            // Producto encontrado        
             setIdProducto( ProductoEncontrado.IdProducto)
             setNombre( ProductoEncontrado.Nombre)
             setPrecioVenta (ProductoEncontrado.PrecioVenta)
             setStock (ProductoEncontrado.Stock)
            
          } else {
            // Producto no encontrado
            CodigoRef.current.style.backgroundColor = 'mistyrose';
            limpiarCampos2()
            // Actualiza los estados del componente según corresponda
            // ...
          }
        })
        .catch((error) => {
          // Maneja los errores de la solicitud
          CodigoRef.current.style.backgroundColor = 'mistyrose';
          limpiarCampos2()
        });
    }
  };

//FUNCIUON PARA REGISTRAR VENTA
const handleRegistrar = () => {
  if(productosList!=null){ 
    Axios.post("http://localhost:3001/venta/registrar",{
    idUsuario:1,
    idCliente:IdCliente,
    TipoDocumento:TipoDocumento,
    NumeroDocumento:IdVenta,
    MontoPago:0,
    MontoCambio:0,
    MontoTotal:subTotal,
    MetodoPago:MetodoPago
    }).then(()=>{
     
      productosList.forEach((producto) => {

        Axios.post("http://localhost:3001/venta/registrardetalle",{
        idVenta:IdVenta,
        idProducto:producto.IdProducto,
        PrecioVenta:producto.PrecioVenta,
        Cantidad:producto.Cantidad,
        SubTotal:producto.SubTotal
      
        }).then(()=>{
          
          Axios.put("http://localhost:3001/venta/descontarstock",{

          idProducto:producto.IdProducto,
          Cantidad:producto.Cantidad
          })

          
        }
        ).catch(function(error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No se pudo registrar los detalles de la venta!',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
          }) })
    
        })

        noti.fire({
          title: <strong>¡Operación exitosa!</strong>,
          html: <i>La venta <strong>{IdVenta}</strong> ha sido registrada correctamente</i>,
          icon: 'success',
          timer: 3000
        })

        limpiarCampos()
        setIdCliente(1)
        setDocumento(0)
        setNombreCompleto("Consumidor final")
        setProductosList([])



      
    }).catch(function(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No se pudo registrar la venta!',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Error en el servidor, intente más tarde":JSON.parse(JSON.stringify(error)).message
      }) })



   
    
    }
    else{ Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡No se pudo registrar la venta!',
      footer: 'La lista de productos está vacía'
    })}
}



const selectMetodoPago = (event) =>{
  setMetodoPago(event.target.options[event.target.selectedIndex].text)
          setPorcentaje(event.target.value)
          setTotal((subTotal*Porcentaje)/100 + subTotal)
}


  useEffect(()=>{
   productoSeleccionado!=null ? cargarProducto(productoSeleccionado) : setNombre("")
  },[productoSeleccionado])

  useEffect(()=>{
    clienteSeleccionado!=null ? cargarCliente(clienteSeleccionado) : setNombreCompleto("")
   },[clienteSeleccionado])

   useEffect(()=>{
    buscarCorrelativo()
   },[productosList])

   useEffect(()=>{
 
      if(productosList!=null){ 
        let nuevoSubTotal = 0;
        productosList.forEach((producto) => {
          nuevoSubTotal += producto.SubTotal;
        });
        setSubTotal(nuevoSubTotal);
        setTotal((nuevoSubTotal*Porcentaje)/100 + nuevoSubTotal)
        }
        else{ setSubTotal(0)}
    
   },[productosList, Porcentaje])


 

   
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
          <Form.Select aria-label="Tipo de comprobante" 
           onChange={(event) => 
          
            setTipoDocumento(event.target.options[event.target.selectedIndex].text)
            //setMetodoPagos(event.target.value)
          }>
            <option text="Factura A">Factura A</option>
            <option text="Factura B">Factura B</option>
            <option text="Boleta">Boleta A</option>
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
          <Form.Control onKeyDown={handleKeyDown} onChange={(event) => {
            setCodigo(event.target.value)
            event.target.style.backgroundColor = ''
          }}
          value={Codigo} type='text' placeholder="Cod" 
          ref={CodigoRef}
          />
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
          
          {selectMetodoPago(event)}
        }
        >
             {MetodoPagosList.map((metodo) =>
      
              (
              <option key={metodo.IdMetodoPago} value={metodo.Porcentaje} text={metodo.Descripcion}>{metodo.Descripcion}</option>
            ))}
    		
        
   		</Form.Select>
           </Col>
      </Form.Group>


      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>SubTotal</Form.Label>
        <Form.Control value={subTotal} type="text" placeholder="SubTotal" disabled readOnly />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Total</Form.Label>
        <Form.Control value={Total} type="text" placeholder="Total" disabled readOnly />
      </Form.Group>
      <ButtonGroup aria-label="Basic example"> <Button onClick={handleRegistrar} style={{width:'130px', height:'50px', display: 'flex', marginTop:'50px'}} variant='primary'> <MDBIcon style={{marginRight:'10px'}} far icon="plus-square" size='2x'/>Registrar</Button>  </ButtonGroup>

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