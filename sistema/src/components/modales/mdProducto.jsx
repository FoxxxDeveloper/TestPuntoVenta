import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import '../../Css/forms.css';
import Axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { MDBIcon } from 'mdb-react-ui-kit';
import Modals from './Modals';
import Paginacion from '../Paginacion';

const MdProducto = ({ titulo, estado, setEstadoModalP, seleccionarProducto }) => {
  const [Productos, setProductos] = useState([]);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('Codigo');

  // PAGINACION
  const productosPorPagina = 10;
  const [actualPagina, setActualPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const ultimoIndex = actualPagina * productosPorPagina;
  const primerIndex = ultimoIndex - productosPorPagina;

  const listar = async () => {
    await Axios.get('http://localhost:3001/productos').then((response) => {
      setProductos(response.data);
      setTablaProductos(response.data);
      setTotal(response.data.length);
    });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value, filtro);
    setActualPagina(1)
  };

  const filtrar = (cadenaBusqueda, filtro) => {
    var resultadosBusqueda = Productos.filter((elemento) => {
      if (elemento[filtro].toString().toLowerCase().includes(cadenaBusqueda.toLowerCase())) {
        return elemento;
      }
      return 0;
    });
    setTablaProductos(resultadosBusqueda);
    setTotal(resultadosBusqueda.length);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <Modals titulo={titulo} estado={estado} setEstadoModal={setEstadoModalP}>
      <div style={{ width: '1200px', position: 'relative' }} className="divgeneral">
        <div>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label style={{ marginLeft: '620px' }} column sm="2">
                Buscar por:
              </Form.Label>
            </Form.Group>

            <Form.Group style={{ marginTop: '-18px' }} as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Col>
                <Form.Select
                  onChange={(event) => setFiltro(event.target.value)}
                  style={{ width: '200px', marginLeft: '620px' }}
                >
                  <option value="Codigo">Codigo</option>
                  <option value="Nombre">Nombre</option>
                  <option value="Descripcion">Descripcion</option>
                  <option value="DescripcionCategoria">Categoria</option>
                  <option value="Stock">Stock</option>
                  <option value="PrecioCompra">Precio Compra</option>
                  <option value="PrecioVenta">Precio Venta</option>
                  <option value="Estado">Estado</option>
                </Form.Select>
              </Col>
              <Form.Control
                value={busqueda}
                style={{ width: '220px', marginRight: '60px' }}
                type="text"
                placeholder="Texto a buscar"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </div>

        <div className="contfrm">
          <Table striped bordered hover variant="dark" size="sm" style={{ width: '1200px' }} className="dgv ">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Categoria</th>
                <th>Stock</th>
                <th>Precio Compra</th>
                <th>Precio Venta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tablaProductos.slice(primerIndex, ultimoIndex).map((producto) => (
                <tr key={producto.IdProducto}>
                  <td> {producto.Codigo} </td>
                  <td> {producto.Nombre} </td>
                  <td> {producto.Descripcion} </td>
                  <td> {producto.DescripcionCategoria} </td>
                  <td> {producto.Stock} </td>
                  <td> {producto.PrecioCompra} </td>
                  <td> {producto.PrecioVenta} </td>
                  <td style={{ width: '75px' }}>
                    <ButtonGroup aria-label="Basic example">
                      <Button onClick={() => seleccionarProducto(producto)}>
                        <MDBIcon fas icon="check-square" />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paginacion
            productosPorPagina={productosPorPagina}
            actualPagina={actualPagina}
            setActualPagina={setActualPagina}
            total={total}
          />
        </div>
      </div>
    </Modals>
  );
};

export default MdProducto;