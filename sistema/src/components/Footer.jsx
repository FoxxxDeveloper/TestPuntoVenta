import React from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon
  } from 'mdb-react-ui-kit';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import "@fortawesome/fontawesome-free/css/all.min.css";

  const Footer = () => {
 

  return (
    <MDBFooter bgColor='primary' className='text-white text-center text-lg-left'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Información</h5>

            <p>
            LA PÁGINA SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO PARA QUIENES LA HAYAN RECIBIDO DE MANERA TERCIARIZADA. EN NINGÚN CASO EL CREADOR DE LA PÁGINA SERÁ RESPONSABLE DE CUALQUIER RECLAMO, DAÑO, U OTRA RESPONSABILIDAD.
            <br />
            <br />
            PROHIBIDA SU RE-VENTA
            </p>
          </MDBCol>

          <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h5 className='text-uppercase fw-bold mb-4'>Contacto</h5>
              <p style={{fontSize:'20px'}}>
             
                <MDBIcon  icon='home' className='me-2' size='lg' />
                Tucumán - Argentina
              </p>
              <p tyle={{fontSize:'20px'}}> <MDBIcon icon='envelope' className='me-3'size='lg' /> deoxysmu00@gmail.com </p>
              <p tyle={{fontSize:'20px'}}> <MDBIcon icon='phone' className='me-3' size='lg' /> + 54 9 3814031834 </p>
              <a href="https://instagram.com/fox._developer/"><p  style={{color: 'white', fontSize:'20px'}}>
                <MDBIcon fab  icon='instagram' className='me-3' size='lg'/> Fox Developer
              </p></a> 
            </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-white' href='https://instagram.com/fox._developer/' target='blank'>
          FOX DEVELOPER
        </a>
      </div>
    </MDBFooter>
  )
}

export default Footer