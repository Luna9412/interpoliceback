// ADMINISTRAR CIUDADANOS
const express = require("express");
const bd = require("./bd.js"); // CONEXION A LA BD
const cityzen = express();
cityzen.get("/api/cityzen/listarTodos", (req, res) => {
  let limite = parseInt(req.query.limite);
  let pagina = parseInt(req.query.pagina);
  let OFFSET = parseInt((pagina - 1) * limite);
  let consulta2 = "SELECT COUNT(*) AS conteoCitizen FROM citizen ";
  let consulta = "SELECT  citizen.id,citizen.nombre,citizen.apellidos,citizen.apodo,citizen.email,citizen.fechanace,especie_ciudadano.nombre as especie FROM citizen inner Join especie_ciudadano ON especie_ciudadano.idespecie_ciudadano =  citizen.especie_ciudadano_idespecie_ciudadano LIMIT ? OFFSET ?";
  bd.query(consulta2, (error, totalCityzen) => {
    bd.query(consulta, [limite, OFFSET], (error, cityzen) => {
      res.send({
        TotalCityzens: totalCityzen,
        cityzen: cityzen,
        error: error
      });
    });
  });
});
cityzen.get("/api/cityzen/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM citizen WHERE id = ?";
  bd.query(consulta, [id], (error, cityzen) => {
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
        cityzen: cityzen
      });
    }
  });
});
cityzen.post("/api/cityzen/crearCiudadano", (req, res) => {
  let formDatosCityzen = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    email: req.body.email,
    foto: req.body.foto,
    fechanace: req.body.fechanace,
    especie_ciudadano_idespecie_ciudadano: req.body.especie
  };
  let consulta = "INSERT INTO citizen SET ? ";
  bd.query(consulta, [formDatosCityzen], (error, cityzen) => {
    if (error) {
      res.send({
        status: "Error",
        message: "¡Error en la consulta!",
        error: error
      });
      console.log(error);
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa!",
        cityzen: cityzen
      });
    }
  });
});
cityzen.delete("/api/cityzen/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM citizen WHERE id = ? ";
  bd.query(consulta, [id], (error, cityzen) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "¡Error en la consulta!",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "¡Registro borrado!",
        cityzen: cityzen
      });
    }
  });
});
cityzen.put("/api/cityzen/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosCityzen = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    email: req.body.email,
    foto: req.body.foto,
    fechanace: req.body.fechanace,
    especie_ciudadano_idespecie_ciudadano: req.body.especie
  };
  let consulta = "UPDATE citizen SET ? WHERE id = ?";
  bd.query(consulta, [formDatosCityzen, id], (error, cityzen) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        cityzen: cityzen
      });
    }
  });
});
module.exports = cityzen;
