// import axios from 'axios'
// import {useState, useEffect} from 'react'
// import {Link} from 'react-router-dom'
// import Table from 'react-bootstrap/Table';

// const URI = 'http://localhost:8000/Productos'

// const CompMostrarProductos = () => {
//     const [Productos, setProducto] = useState([])
//     useEffect(()=> {
//         getProductos()
//     },[])

//     //procedimiento para listar 
//     const getProductos = async() => {
//        const res = await axios.get(URI)
//        setProducto(res.data)
//     }
//     //procedimiento para eliminar
//     const deleteProducto = async(idProducto) => {
//         axios.delete({URI},{idProducto})
//         getProductos()
//     }
//     var Estado ="Activo"
//     return(
        
//     <Table striped bordered hover variant="dark" size="sm" style={{width:"1400px"}} className='dgv'>
//     <thead>
//       <tr>
//         <th>Codigo</th>
//         <th>Nombre</th>
//         <th>Descripcion</th>
//         <th>Categoria</th>
//         <th>Stock</th>
//         <th>Precio Compra</th>
//         <th>Precio Venta</th>
//         <th>Estado</th>
//       </tr>
//     </thead>
//     <tbody>
//       {Productos.map((producto) =>
      
//       (
        
       
       
//         <tr key={producto.idProducto}>
         
//         <td> {producto.Codigo} </td>
//         <td> {producto.Nombre} </td>
//         <td> {producto.Descripcion} </td>
//         <td> {producto.IdCategoria} </td>
//         <td> {producto.Stock} </td>
//         <td> {producto.PrecioCompra} </td>
//         <td> {producto.PrecioVenta} </td>
//         <td> {Estado} </td>

        
//         </tr>
//       ))}
      
//     </tbody>
//   </Table>
//     )


// }


//   export default CompMostrarProductos