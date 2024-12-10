// ADMINISTRAR HISTORIAL
const express = require("express");
const bd = require("./bd.js");
const historial = express();
historial.get("/api/historial/historialCityzen/:id", (req, res) => {
  let id = req.params.id;
  let consulta = `
  SELECT registro_delito.idregistro_delito as id,citizen.nombre, citizen.apellidos, citizen.apodo, registro_delito.descripcion, tipo_delito.delito, grado_delito.grado FROM historial
  INNER JOIN citizen ON citizen.id = historial.citizen_id
  INNER JOIN registro_delito ON registro_delito.idregistro_delito = historial.registro_delito_idregistro_delito
  INNER JOIN tipo_delito ON tipo_delito.idtipo_delito = registro_delito.tipo_delito_idtipo_delito
  INNER JOIN grado_delito ON grado_delito.id = tipo_delito.grado_delito_id
  WHERE citizen.id = ? ;`;  
  bd.query(consulta, [id], (error, historiales) => {
    if (error) {
      res.send({
        status: "Error",
        message: "¡Error en la consulta!",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa!",
        historiales: historiales
      });
    }
  });
});
module.exports = historial;