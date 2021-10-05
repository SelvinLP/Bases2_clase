#Carga al modelo banco
USE Bases2N_G12;
INSERT INTO banco ( Nombre )
SELECT  nombre 
FROM tmp_banco;

#Carga al modelo periodos
USE Bases2N_G12;
INSERT INTO periodo ( Fecha )
SELECT fecha 
FROM tmp_fecha;

#Carga al modelo reporte
USE Bases2N_G12;
INSERT INTO reporte ( Activo, Pasivo, Capital, Banco_Id, Fecha_Id )
SELECT r.activo, r.pasivo, r.capital, p.Id, b.Id
FROM tmp_reporte r
INNER JOIN periodo p
	ON p.Fecha = r.fecha
INNER JOIN banco b
	ON b.Nombre = r.banco;

