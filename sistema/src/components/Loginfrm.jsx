import React from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    //MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    //MDBCheckbox,
    //MDBIcon
  }
  from 'mdb-react-ui-kit';
  import fotoVent from '../assets/imgVenta.jpg'
  import 'bootstrap/dist/css/bootstrap.min.css';
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import '../Css/loginfrm.css'
const Loginfrm = () => {
  return (
    <MDBContainer fluid className='my-5 contain' >

      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>

              <h2 className="fw-bold mb-5">Inicio de sesión</h2>

              <MDBInput wrapperClass='mb-4' label='Usuario' id='form3' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Contraseña' id='form4' type='password'/>

              <MDBBtn className='w-100 mb-4' size='md'>Ingresar</MDBBtn>


            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src={fotoVent} class="rounded-4 shadow-4 imglog"
            alt="" fluid/>
        </MDBCol>

      </MDBRow>

    </MDBContainer>

  )
}

export default Loginfrm