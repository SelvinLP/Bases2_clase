#Obtener valores de cada banco
SELECT b.nombre AS banco, r.activo AS activo
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
WHERE r.fecha_id = 13
ORDER BY r.activo DESC;

SELECT Nombre FROM banco;
