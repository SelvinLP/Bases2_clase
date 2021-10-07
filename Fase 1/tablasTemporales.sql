CREATE TEMPORARY TABLE tmp_fecha(
  fecha DATE
);

CREATE TEMPORARY TABLE tmp_banco(
  nombre VARCHAR(45)
);

CREATE TEMPORARY TABLE tmp_reporte(
  banco VARCHAR(45),
  fecha DATE,
  activo BIGINT,
  pasivo BIGINT,
  capital BIGINT
);