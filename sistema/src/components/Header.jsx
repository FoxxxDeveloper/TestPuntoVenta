import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Header = () => {
  return (
    <>
      
      <br />
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Inicio</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Usuarios</Nav.Link>

              <NavDropdown title="Configuración" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Categoria</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Producto</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Método de Pago</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Código de barra</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Ventas" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Registrar</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Ver Detalle</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Compras" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Registrar</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Ver Detalle</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Reportes" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Reporte Compras</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Reporte Ventas</NavDropdown.Item>
              </NavDropdown>


              <Nav.Link href="#home">Cliente</Nav.Link>
              <Nav.Link href="#home">Proveedor</Nav.Link>
              <Nav.Link href="#home">Negocio</Nav.Link>

          </Nav>
        </Container>
      </Navbar>

      <br />
      
    </>

  )
}

export default Header