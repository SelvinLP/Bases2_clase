show variables like 'general_log_file';
show variables like 'general_log%';
#Activar el log
set global general_log=ON;
#Mostrar el log
select * from mysql.general_log order by event_time;

#Detener el log
set global general_log=OFF;
#Limpiar el log
truncate table mysql.general_log;