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

SELECT * FROM 
(SELECT b.nombre AS banco, r.activo AS activo, f.fecha AS fecha 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE fecha = '2020-10-31'
ORDER BY r.activo DESC
LIMIT 5) T
ORDER BY activo ASC
;

-- '\nAGROMERCANTIL DE GUATEMALA, S. A.','32026580000','2020-10-31'
-- '\nDE AMÉRICA CENTRAL, S. A.','33914821000','2020-10-31'
-- '\nG&T CONTINENTAL, S. A.','55939767000','2020-10-31'
-- '\nDE DESARROLLO RURAL, S. A.','83741783000','2020-10-31'
-- '\nINDUSTRIAL, S. A.','106787577000','2020-10-31'




------------------------- CONSULTA 2 -----------------------
---- Mostrar los últimos 5 bancos en orden descendente que hayan tenido el peor punteo en el
---- Ranking Bancario para el mes de febrero 2021
SELECT * FROM 
(SELECT b.nombre AS banco, r.activo AS activo, f.fecha AS fecha 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE fecha = '2021-02-28'
ORDER BY r.activo ASC
LIMIT 5) T
ORDER BY activo DESC
;

-- '\nAZTECA DE GUATEMALA, S. A.', '1911612000', '2021-02-28'
-- '\nDE ANTIGUA, S. A.', '1509598000', '2021-02-28'
-- '\nINV, S. A.', '932459000', '2021-02-28'
-- '\nVIVIBANCO, S. A.', '790974000', '2021-02-28'
-- '\nCREDICORP, S. A.', '447673000', '2021-02-28'



------------------------- CONSULTA 3 -----------------------
---- Mostrar los primeros 3 bancos en orden ascendente que hayan obtenido el mejor punteo en el
---- Ranking Bancario en el primer semestre quiere; decir del 31/07/2020 al 31/01/2021.
SELECT * FROM
(SELECT DISTINCT b.nombre AS banco, AVG(r.activo) OVER (PARTITION BY b.id) AS promedio 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE fecha BETWEEN '2020-07-31' AND '2021-01-31'
ORDER BY promedio DESC
LIMIT 3) T
ORDER BY promedio ASC
;

-- '\nG&T CONTINENTAL, S. A.','55512132000.0000'
-- '\nDE DESARROLLO RURAL, S. A.','83315011285.7143'
-- '\nINDUSTRIAL, S. A.','106018051142.8571'



------------------------- CONSULTA 4 -----------------------
---- Mostrar al mejor banco quiere decir al banco que tenga la posición 1 en el Ranking Bancario 
---- durante el año completo; quiere decir del 31/07/2020 al 31/07/2021.
SELECT DISTINCT b.nombre AS banco, AVG(r.activo) OVER (PARTITION BY b.id) AS promedio 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE fecha BETWEEN '2020-07-31' AND '2021-07-31'
ORDER BY promedio DESC
LIMIT 1
;

-- INDUSTRIAL, S. A.  108890393461.5385
