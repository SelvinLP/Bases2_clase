#Carga al modelo banco
USE bases2n_g12;
INSERT INTO banco ( Nombre )
SELECT  nombre 
FROM tmp_banco;

#Carga al modelo periodos
USE bases2n_g12;
INSERT INTO periodo ( Fecha )
SELECT fecha 
FROM tmp_fecha;

#Carga al modelo reporte
USE bases2n_g12;
INSERT INTO reporte ( Activo, Pasivo, Capital, Banco_Id, Fecha_Id )
SELECT activo, pasivo, capital, ban.Id, b.Id
FROM bases2n_g12.tmp_reporte a
LEFT JOIN periodo b
	ON b.Fecha = a.fecha
LEFT JOIN banco ban
	ON ban.Nombre = a.banco;
-- USE bases2n_g12;
-- INSERT INTO reporte ( Activo, Pasivo, Capital, Banco_Id, Fecha_Id )
-- SELECT r.activo, r.pasivo, r.capital, p.Id, b.Id
-- FROM tmp_reporte r
-- INNER JOIN periodo p
-- 	ON p.Fecha = r.fecha
-- INNER JOIN banco b
-- 	ON b.Nombre = r.banco;

--  ALTER TABLE reporte CHARACTER SET UTF8MB4 COLLATE UTF8MB4_general_ci;   
-- SELECT @@character_set_database, @@collation_database;
-- ALTER DATABASE `db` CHARACTER SET utf8 COLLATE utf8_general_ci;