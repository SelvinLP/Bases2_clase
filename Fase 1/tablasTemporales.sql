USE Bases2N_G12;

CREATE TEMPORARY TABLE tmp_fecha(
  fecha DATE
);

CREATE TEMPORARY TABLE tmp_banco(
  nombre VARCHAR(45)
);
#Tabla temporal Reporte
CREATE TEMPORARY TABLE tmp_reporte(
  activo bigint,
  pasivo bigint,
  capital bigint,
  banco VARCHAR(45),
  fecha DATE
);

