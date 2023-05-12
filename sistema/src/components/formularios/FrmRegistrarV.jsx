import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import '../../Css/registros.css'
const FrmRegistrarV = () => {
  return (
    <div>
      <Header/>
      
      <h2 style={{marginLeft:'120px'}}>Registrar Venta</h2>
      <div className='cont'>
      <div className='info'>
      <div className='infov'>
        info venta
      </div>

      <div className='infocli'>
        info cliente

      </div>

      </div>
      <div className='info'>
        <div>
      <div className='infoproducto'>
        Informacion del producto
      </div>
      <div className='listprod'>
        LISTA PRODUCTOS
      </div>
      </div>
      <div className='interacciones'>
        interacciones
      </div>
      
      
      </div>


      </div>


    <Footer/>
    </div>
  )
}

export default FrmRegistrarV