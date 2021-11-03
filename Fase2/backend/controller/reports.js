var mysql = require('mysql');
const pool = require('./conexiondb');

const querydb = (query, params) => {
    return new Promise((resolve, reject)=>{
        pool.query(query, params, (error, results, fields)=>{
            if(error) return reject(error);
            return resolve(results);
        })
    })
}

const ranking = async(req, res) =>{
    let data = [];
    data = await getbank(data);
    for(let mes=1; mes<=13; mes++){
        //console.log('---------------------');
        data = await getpos(data, mes);
    }
    res.send({
        status: "success", 
        data: data
    })
}

async function getbank(datos) {
    let consulta = `SELECT Nombre FROM banco`;
    let results = await querydb(consulta, []);
    results = JSON.stringify(results); //remove RowDataPacket
    results = JSON.parse(results);
    results.forEach(async function (result) {
        result.Nombre = result.Nombre.slice(1);
        datos.push({
            name: result.Nombre,
            julio20: 0,
            agosto20: 0,
            septiembre20: 0,
            octubre20: 0,
            noviembre20: 0,
            diciembre20: 0,
            enero21: 0,
            febrero21: 0,
            marzo21: 0,
            abril21: 0,
            mayo21: 0,
            junio21: 0,
            julio21: 0
        });
    });
    
    return datos;
}

async function getpos(datos, mes){
    let consulta = `SELECT b.nombre AS banco, r.activo AS activo
                    FROM reporte r
                    JOIN banco b ON b.id = r.banco_id
                    JOIN periodo f ON f.id = r.fecha_id
                    WHERE r.fecha_id = `+ mes +`
                    ORDER BY r.activo DESC`;
    let results = await querydb(consulta, []);
    results = JSON.stringify(results); //remove RowDataPacket
    results = JSON.parse(results);
    let posicion = 1;
    results.forEach(function(result) { //Recorre lista de posiciones
        result.banco = result.banco.slice(1)
        //console.log(result);
        datos.forEach(function(resultdata) { // Recorre posiciones de data
            if(resultdata.name == result.banco){
                switch (mes) {
                    case 1:
                        resultdata.julio20 = posicion;
                        break;
                    case 2:
                        resultdata.agosto20 = posicion;
                        break;
                    case 3:
                        resultdata.septiembre20 = posicion;
                        break;
                    case 4:
                        resultdata.octubre20 = posicion;
                        break;
                    case 5:
                        resultdata.noviembre20 = posicion;
                        break;
                    case 6:
                        resultdata.diciembre20 = posicion;
                        break;
                    case 7:
                        resultdata.enero21 = posicion;
                        break;
                    case 8:
                        resultdata.febrero21 = posicion;
                        break;
                    case 9:
                        resultdata.marzo21 = posicion;
                        break;
                    case 10:
                        resultdata.abril21 = posicion;
                        break;
                    case 11:
                        resultdata.mayo21 = posicion;
                        break;
                    case 12:
                        resultdata.junio21 = posicion;
                        break;
                    case 13:
                        resultdata.julio21 = posicion;
                        break;
                }
            }
        });
        posicion++;
    });

    return datos;
}

module.exports = {
    ranking
}
