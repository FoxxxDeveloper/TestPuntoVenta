import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const FrmMetodoPago = () => {
        const handleChange = (e) => {
        this.setState({selectedValue: e.target.value})
      }
    

  return (
    
    <div>
    <Form>
        <h3>Detalle Metodo de Pago</h3>

      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Descripción:
        </Form.Label>
        <Col sm={2}>
          <Form.Control type="string" placeholder="Descripción" />
        </Col>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Porcentaje
        </Form.Label>
        <Col sm={2}>
          <Form.Control type="number" placeholder="Porcentaje" />
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
    </div>
  )
}

export default FrmMetodoPago