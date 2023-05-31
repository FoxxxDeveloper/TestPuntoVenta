import React from 'react'
import {MDBIcon} from 'mdb-react-ui-kit';
import styled from 'styled-components'

const Modals = ({children, titulo, estado, setEstadoModal}) => {


  return (
    <>
    {estado &&
    <Overlay>
    <ContenedorModal>
    <EncabezadoModal>
      <h2>Listado de {titulo}</h2>
    </EncabezadoModal>

    <BotonCerrar onClick={()=> setEstadoModal(false)} ><MDBIcon size='lg' fas icon="times" /></BotonCerrar>

    {children}
    </ContenedorModal>      
  
 </Overlay>
 }
 </>
  )
  
}

export default Modals


const Overlay = styled.div`
width:100vw;
height: 100vh;
position:fixed;
top:0;
letft:0;
background:rgba(0,0,0,.5);
display: flex;
align-items: center;
justify-content: center;


`;

const ContenedorModal = styled.div`
min-height: 10px;
max-height:960px;
position:relative;
background: #fff;
border-radius: 5px;
box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
padding:20px;
background: rgb(238,174,202);
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);

`;


const EncabezadoModal = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
margin-bottom:20px;
padding-bottom:20px;
border-bottom:1px solid #E8E8E8;
margin-top:10px;

h2 {
  font-weight:500;
  font-size:18px;
  color: black;
}
`;

const BotonCerrar = styled.button `
position: absolute;
top:25px;
right: 20px;
width: 30px;
height:30px;
border:none;
background:none;
cursor:pointer;
transition: .3s ease all;
border-radius:5px;
color: red;

&:hover {
  background: #F2F2F2;
}
`;
