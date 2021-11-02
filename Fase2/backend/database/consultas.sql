#Obtener valores de cada banco
SELECT b.nombre AS banco, r.activo AS activo, f.fecha AS fecha 
FROM reporte r
JOIN banco b ON b.id = r.banco_id
JOIN periodo f ON f.id = r.fecha_id
ORDER BY r.activo DESC
