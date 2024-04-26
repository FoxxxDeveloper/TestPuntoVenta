
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import FrmCategoria from './components/formularios/FrmCategoria';
import FrmCliente from './components/formularios/FrmCliente';
import FrmCodigoBarra from './components/formularios/FrmCodigoBarra';
import FrmMetodoPago from './components/formularios/FrmMetodoPago';
import FrmProducto from './components/formularios/FrmProducto';
import FrmProveedor from './components/formularios/FrmProveedor';
import FrmRegistrarV from './components/formularios/FrmRegistrarV';
import FrmRegistrarC from './components/formularios/FrmRegistrarC';
import FrmReporteC from './components/formularios/FrmReporteC';
import FrmReporteV from './components/formularios/FrmReporteV';
import FrmVerDetalleC from './components/formularios/FrmVerDetalleC';
import FrmVerDetalleV from './components/formularios/FrmVerDetalleV';
import FrmUsuario from './components/formularios/FrmUsuario';
import Modals from './components/modales/Modals';
import Login from './pages/Login';
import {login, home, categoria, cliente, codigobarra, metodopago, producto, proveedor, registrocompra, registroventa, reportecompra, reporteventa, usuario, detalleventa, detallecompra, testmodal} from "./Routes/myRoutes"
import MdProducto from './components/modales/MdProducto';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* PUTO EL QUE LEE */}
    <Route path={login} element={<Login />} />
    <Route path={home} element={<Home/>} />
    <Route path={categoria} element={<FrmCategoria />} />
    <Route path={cliente} element={<FrmCliente />} />
    <Route path={codigobarra} element={<FrmCodigoBarra />} />
    <Route path={metodopago} element={<FrmMetodoPago />} />
    <Route path={producto} element={<FrmProducto />} />
    <Route path={proveedor} element={<FrmProveedor />} />
    <Route path={registrocompra} element={<FrmRegistrarC />} />
    <Route path={registroventa} element={<FrmRegistrarV />} />
    <Route path={reportecompra} element={<FrmReporteC />} />
    <Route path={reporteventa} element={<FrmReporteV />} />
    <Route path={usuario} element={<FrmUsuario />} />
    <Route path={detalleventa} element={<FrmVerDetalleV />} />
    <Route path={detallecompra} element={<FrmVerDetalleC />} />
    <Route path={testmodal} element={<Modals/>} />
    <Route path='/mdproducto' element={<MdProducto/>} />
    {/* <Route path="/contact" component={ContactPage} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
