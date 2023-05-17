
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
import mdProducto from './components/modales/mdProducto';
import Login from './pages/Login';
import {login, home, categoria, cliente, codigobarra, metodopago, negocio, producto, proveedor, registrocompra, registroventa, reportecompra, reporteventa, usuario, detalleventa, detallecompra, testmodal} from "./Routes/myRoutes"
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path={login} element={<Login />} />
    <Route path={home} element={<Home/>} />
    <Route path={categoria} element={<FrmCategoria />} />
    <Route path={cliente} element={<FrmCliente />} />
    <Route path={codigobarra} element={<FrmCodigoBarra />} />
    <Route path={metodopago} element={<FrmMetodoPago />} />
    <Route path={negocio} element={<FrmNegocio />} />
    <Route path={producto} element={<FrmProducto />} />
    <Route path={proveedor} element={<FrmProveedor />} />
    <Route path={registrocompra} element={<FrmRegistrarC />} />
    <Route path={registroventa} element={<FrmRegistrarV />} />
    <Route path={reportecompra} element={<FrmReporteC />} />
    <Route path={reporteventa} element={<FrmReporteV />} />
    <Route path={usuario} element={<FrmUsuario />} />
    <Route path={detalleventa} element={<FrmVerDetalleV />} />
    <Route path={detallecompra} element={<FrmVerDetalleC />} />
    <Route path={testmodal} element={<mdProducto/>} />
    {/* <Route path="/contact" component={ContactPage} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
