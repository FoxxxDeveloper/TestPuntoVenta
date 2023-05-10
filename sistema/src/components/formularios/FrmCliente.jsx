import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from '../Header';
import Footer from '../Footer';

const FrmCliente = () => {
        const handleChange = (e) => {
        this.setState({selectedValue: e.target.value})
      }
    

  return (
    
    <div>
      <Header/>
    <Form>
        <h3>Detalle Cliente</h3>
      <Form.Group className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Documento:
        </Form.Label>
        <Col sm={2}>
          <Form.Control type="string" placeholder="Documento" />
        </Col>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Nombre Completo:
        </Form.Label>
        <Col sm={2}>
          <Form.Control type="string" placeholder="Nombre Completo" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Correo:
        </Form.Label>
        <Col sm={2}>
          <Form.Control type="string" placeholder="Correo" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Telefono
        </Form.Label>
        <Col sm={2}>
          <Form.Control type="number" placeholder="Telefono" />
        </Col>
      </Form.Group>
      <fieldset>
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>  
          Estado
        </Form.Label>
        <Col sm={2}>
        <select value= "Activo"onChange={(e) => handleChange(e)}>
    		<option value="1">Activo</option>
    		<option value="0">No Activo</option>
   		</select>
           </Col>
      </Form.Group>
      
      </fieldset>

      <Form.Group as={Row} className="mb-3">
        <Col   sm={{ span: 0, offset: 0 }}>
          <Button style={{margin:"10px"}} variant="success" type="submit">Guardar</Button>
          <Button style={{margin:"10px"}} variant="warning" type="submit" >Limpiar</Button>
          <Button style={{margin:"10px"}} variant="danger" type="submit">Eliminar</Button>
        </Col>     
          
      </Form.Group>
    </Form>
    <Footer/>
    </div>
  )
}

export default FrmCliente