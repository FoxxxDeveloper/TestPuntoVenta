import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from 'react-router-dom'
const Header = () => {

  const navigate = useNavigate()



  return (
    <>
      
      <br />
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate('/Inicio')}>Inicio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/Usuario')}>Usuarios</Nav.Link>

              <NavDropdown title="Configuración" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => navigate('/Categoria')}>Categoria</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/Producto')}>Producto</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/MetodoPago')}>Método de Pago</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/CodigoBarra')}>Código de barra</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Ventas" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => navigate('/Registro_Venta')}>Registrar</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/Detalle_Venta')}>Ver Detalle</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Compras" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => navigate('/Registro_Compra')}>Registrar</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/Detalle_Compra')}>Ver Detalle</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Reportes" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => navigate('/Reporte_Compra')}>Reporte Compras</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/Reporte_Venta')}>Reporte Ventas</NavDropdown.Item>
              </NavDropdown>


              <Nav.Link onClick={() => navigate('/Cliente')}>Cliente</Nav.Link>
              <Nav.Link onClick={() => navigate('/Proveedor')}>Proveedor</Nav.Link>
              <Nav.Link onClick={() => navigate('/Negocio')}>Negocio</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      <br />
      
    </>

  )
}

export default Header