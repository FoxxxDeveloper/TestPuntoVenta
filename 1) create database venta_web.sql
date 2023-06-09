

CREATE DATABASE DBSISTEMA_VENTA2;

USE DBSISTEMA_VENTA2;


create table ROL(
IdRol int auto_increment, 
Descripcion varchar (50),
FechaRegistro datetime  DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`IdRol`)
);

/*create table PERMISO(
IdPermiso int primary key identity, 
IdRol int references ROL(IdRol),
NombreMenu varchar (100),
FechaRegistro datetime default getdate()

)*/


create table PROVEEDOR(
IdProveedor int auto_increment, 
Documento varchar (50),
RazonSocial varchar (50),
Correo varchar (50),
Telefono varchar (50),
Estado bit,
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`IdProveedor`)
);


create table CLIENTE(
IdCliente int auto_increment, 
Documento varchar (50),
NombreCompleto varchar (50),
Correo varchar (50),
Telefono varchar (50),
Estado bit,
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`IdCliente`)
);

create table USUARIO(
idUsuario int auto_increment,
Documento varchar(50),
NombreCompleto varchar (50),
Correo varchar(50),
Clave varchar(50),
idRol int references ROL(idRol),
Estado bit,
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`idUsuario`)
)
;
create table CATEGORIA(
IdCategoria int auto_increment, 
Descripcion varchar (100),
Estado bit,
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`IdCategoria`)
)
;

create table PRODUCTO(
IdProducto int auto_increment, 
Codigo varchar(50),
Nombre varchar(500),
Descripcion varchar(50),
IdCategoria int ,
Stock int not null default 0,
PrecioCompra decimal(10,2) default 0,
PrecioVenta decimal(10,2) default 0,
Estado bit,
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`IdProducto`),
KEY `fkv_producto_categoria` (`IdCategoria`),
  CONSTRAINT `fkv_producto_categoria` FOREIGN KEY (`IdCategoria`) REFERENCES `CATEGORIA` (`IdCategoria`)
)
;

create TABLE COMPRA (
idCompra int auto_increment,
idUsuario int ,
idProveedor int,
TipoDocumento varchar(50),
Documento varchar(50),
MontoTotal decimal(10,2),
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`idCompra`),
KEY `fkv_compra_usuario` (`idUsuario`),
  CONSTRAINT `fkv_compra_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `USUARIO` (`idUsuario`),
  KEY `fkv_compra_proveedor` (`idProveedor`),
  CONSTRAINT `fkv_compra_proveedor` FOREIGN KEY (`idProveedor`) REFERENCES `PROVEEDOR` (`idProveedor`)
)
;


create TABLE DETALLE_COMPRA (
idDetalleCompra int auto_increment,
idCompra int ,
idProducto int ,
PrecioCompra decimal(10,2) default 0,
PrecioVenta decimal(10,2) default 0,
Cantidad int,
MontoTotal decimal(10,2),
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`idDetalleCompra`),
KEY `fkv_detallecompra_compras` (`idCompra`),
  CONSTRAINT `fkv_detallecompras_compras` FOREIGN KEY (`idCompra`) REFERENCES `COMPRA` (`idCompra`),
  KEY `fkv_detallecompra_producto` (`idProducto`),
  CONSTRAINT `fkv_detallecompra_producto` FOREIGN KEY (`idProducto`) REFERENCES `PRODUCTO` (`idProducto`)
)
;

create TABLE VENTA (
idVenta int auto_increment,
idUsuario int,
idCliente int ,
TipoDocumento varchar(50),
NumeroDocumento varchar(50),
MontoPago decimal(10,2),
MontoCambio decimal(10,2),
MontoTotal decimal(10,2),
MetodoPago varchar (50),
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`idVenta`),
KEY `fkv_venta_usuario` (`idUsuario`),
  CONSTRAINT `fkv_venta_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `USUARIO` (`idUsuario`),
  KEY `fkv_venta_cliente` (`idCliente`),
  CONSTRAINT `fkv_venta_cliente` FOREIGN KEY (`idCliente`) REFERENCES `CLIENTE` (`idCliente`)
)
;

create TABLE DETALLE_VENTA (
idDetalleVenta int auto_increment,
idVenta int,
idProducto int ,
PrecioVenta decimal(10,2),
Cantidad int,
SubTotal decimal(10,2),
FechaRegistro datetime default CURRENT_TIMESTAMP,
PRIMARY KEY (`idDetalleVenta`),
KEY `fkv_detalleventa_venta` (`idVenta`),
  CONSTRAINT `fkv_detalleventa_venta` FOREIGN KEY (`idVenta`) REFERENCES `VENTA` (`idVenta`),
  KEY `fkv_detalleventa_producto` (`idProducto`),
  CONSTRAINT `fkv_detalleventa_producto` FOREIGN KEY (`idProducto`) REFERENCES `PRODUCTO` (`idProducto`)
)
;

CREATE table NEGOCIO (
IdNegocio int auto_increment,
Nombre varchar (60),
CUIT varchar (60),
Direccion varchar (60),
PRIMARY KEY (`IdNegocio`))
;

CREATE table METODO_PAGO (
IdMetodoPago int auto_increment,
Descripcion varchar (60),
Porcentaje decimal (10,3),
PRIMARY KEY (`IdMetodoPago`))
;

