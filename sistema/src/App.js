
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import FrmCategoria from './components/formularios/FrmCategoria';
import FrmCliente from './components/formularios/FrmCliente';
import FrmCodigoBarra from './components/formularios/FrmCodigoBarra';
import FrmMetodoPago from './components/formularios/FrmMetodoPago';
import FrmNegocio from './components/formularios/FrmNegocio';
import FrmProducto from './components/formularios/FrmProducto';
import FrmProveedor from './components/formularios/FrmProveedor';
import FrmRegistrarV from './components/formularios/FrmRegistrarV';
import FrmRegistrarC from './components/formularios/FrmRegistrarC';
import FrmReporteC from './components/formularios/FrmReporteC';
import FrmReporteV from './components/formularios/FrmReporteV';
import FrmVerDetalleC from './components/formularios/FrmVerDetalleC';
import FrmVerDetalleV from './components/formularios/FrmVerDetalleV';
import FrmUsuario from './components/formularios/FrmUsuario';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Inicio" element={<Home/>} />
    <Route path="/Categoria" element={<FrmCategoria />} />
    <Route path="/Cliente" element={<FrmCliente />} />
    <Route path="/CodigoBarra" element={<FrmCodigoBarra />} />
    <Route path="/MetodoPago" element={<FrmMetodoPago />} />
    <Route path="/Negocio" element={<FrmNegocio />} />
    <Route path="/Producto" element={<FrmProducto />} />
    <Route path="/Proveedor" element={<FrmProveedor />} />
    <Route path="/Registro_Compra" element={<FrmRegistrarC />} />
    <Route path="/Registro_Venta" element={<FrmRegistrarV />} />
    <Route path="/Reporte_Compra" element={<FrmReporteC />} />
    <Route path="/Reporte_Venta" element={<FrmReporteV />} />
    <Route path="/Usuario" element={<FrmUsuario />} />
    <Route path="/Detalle_Venta" element={<FrmVerDetalleV />} />
    <Route path="/Detalle_Compra" element={<FrmVerDetalleC />} />

    {/* <Route path="/contact" component={ContactPage} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
