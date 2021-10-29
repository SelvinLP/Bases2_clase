--------------------------------------------------------
----  UNIVERSIDAD DE SAN CARLOS DE GUATEMALA  		----
----  FACULTAD DE INGENIERÍA                  		----
----  ESCUELA DE CIENCIAS Y SISTEMAS		  		----
----  SISTEMAS DE BASES DE DATOS 2 'N'        		---- 
----  PROYECTO 1                              		----
----  GRUPO 2                                 		----
----  SELVIN LISANDRO ARAGÓN PÉREZ    - 201701133   ----
----  KATHERINE LISSETH SÁNCHEZ GIRÓN - 201612408   ----
--------------------------------------------------------

------------------------- CONSULTA 1 -----------------------
---- Mostrar los 5 primeros bancos en orden ascendente que hayan tenido el mejor punteo en el
---- Ranking Bancario para el mes de octubre 2020.
USE bases2n_g12;

CREATE VIEW mejores_5_bancos_octubre_2021 as(
SELECT banco, ROW_NUMBER() OVER(ORDER BY T.activo DESC) AS posicion FROM 
(SELECT b.nombre AS banco, r.activo AS activo, f.fecha AS fecha 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE fecha = '2020-10-31'
ORDER BY r.activo DESC
LIMIT 5) T
ORDER BY posicion ASC)
;

SELECT * FROM mejores_5_bancos_octubre_2021;
-- '\nINDUSTRIAL, S. A.','1'
-- '\nDE DESARROLLO RURAL, S. A.','2'
-- '\nG&T CONTINENTAL, S. A.','3'
-- '\nDE AMÉRICA CENTRAL, S. A.','4'
-- '\nAGROMERCANTIL DE GUATEMALA, S. A.','5'






------------------------- CONSULTA 2 -----------------------
---- Mostrar los últimos 5 bancos en orden descendente que hayan tenido el peor punteo en el
---- Ranking Bancario para el mes de febrero 2021
CREATE VIEW peores_5_bancos_febrero_2021 as(
SELECT banco, ROW_NUMBER() OVER(ORDER BY T.activo) AS posicion FROM 
(SELECT b.nombre AS banco, r.activo AS activo, f.fecha AS fecha 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE fecha = '2021-02-28'
ORDER BY r.activo ASC
LIMIT 5) T
ORDER BY posicion DESC)
;

SELECT * FROM peores_5_bancos_febrero_2021;
-- '\nAZTECA DE GUATEMALA, S. A.','5'
-- '\nDE ANTIGUA, S. A.','4'
-- '\nINV, S. A.','3'
-- '\nVIVIBANCO, S. A.','2'
-- '\nCREDICORP, S. A.','1'




------------------------- CONSULTA 3 -----------------------
---- Mostrar los primeros 3 bancos en orden ascendente que hayan obtenido el mejor punteo en el
---- Ranking Bancario en el primer semestre quiere; decir del 31/07/2020 al 31/01/2021.

CREATE VIEW mejores_3_bancos_del_primer_semestre as(
SELECT banco, ROW_NUMBER() OVER(ORDER BY promedio) AS posicion FROM 
(SELECT DISTINCT b.nombre AS banco, AVG(r.activo) OVER (PARTITION BY b.id) AS promedio 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE fecha BETWEEN '2020-07-31' AND '2021-01-31'
ORDER BY promedio DESC
LIMIT 3) T
ORDER BY posicion ASC);


-- '\nG&T CONTINENTAL, S. A.', '1'
-- '\nDE DESARROLLO RURAL, S. A.', '2'
-- '\nINDUSTRIAL, S. A.', '3'




------------------------- CONSULTA 4 -----------------------
---- Mostrar al mejor banco quiere decir al banco que tenga la posición 1 en el Ranking Bancario 
---- durante el año completo; quiere decir del 31/07/2020 al 31/07/2021.
CREATE VIEW mejor_banco_delanio as(
SELECT banco, ROW_NUMBER() OVER(ORDER BY T.promedio) AS posicion FROM
(SELECT DISTINCT b.nombre AS banco, AVG(r.activo) OVER (PARTITION BY b.id) AS promedio 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE fecha BETWEEN '2020-07-31' AND '2021-07-31'
ORDER BY promedio DESC
LIMIT 1
) T)
;
SELECT * FROM mejor_banco_delanio;
-- INDUSTRIAL, S. A.  108890393461.5385
