USE Bases2N_G12;
SET GLOBAL local_infile=1;
LOAD DATA
LOCAL INFILE 'D:/Usac/Sistemas de Bases de Datos 2/Clase/Proyecto/Bases2_clase/Fase 1/fechas.csv'
INTO TABLE tmp_fecha
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r'
IGNORE 1 LINES
(fecha)
;

USE Bases2N_G12;
SET GLOBAL local_infile=1;
LOAD DATA
LOCAL INFILE 'D:/Usac/Sistemas de Bases de Datos 2/Clase/Proyecto/Bases2_clase/Fase 1/bancos.csv'
INTO TABLE tmp_banco
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r'
IGNORE 1 LINES
(nombre)
;

USE Bases2N_G12;
SET GLOBAL local_infile=1;
LOAD DATA
LOCAL INFILE 'D:/Usac/Sistemas de Bases de Datos 2/Clase/Proyecto/Bases2_clase/Fase 1/reportes.csv'
INTO TABLE tmp_reporte
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r'
IGNORE 1 LINES
(banco, fecha, activo, pasivo, capital)
;
