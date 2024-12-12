const express = require("express");
const bd = require("./bd.js");
const delito = express();
delito.get("/api/delito/listarTodosDelitos", (req, res) => {
  let limite = parseInt(req.query.limite);
  let pagina = parseInt(req.query.pagina);
  let OFFSET = parseInt((pagina - 1) * limite);
  let consulta2 = "SELECT COUNT(*) AS conteoDelito FROM tipo_delito ";
  let consulta = "SELECT grado_delito.grado,tipo_delito.idtipo_delito,tipo_delito.delito FROM tipo_delito INNER JOIN grado_delito ON grado_delito.id = tipo_delito.grado_delito_id LIMIT ? OFFSET ?";
  bd.query(consulta2, (Error, totalDelitos) => {
    bd.query(consulta, [limite, OFFSET], (error, delitos) => {
      res.send({
        TotalDelitos: totalDelitos,
        delitos: delitos,
        error: error
      });
    });
  });
});
delito.get("/api/delito/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM tipo_delito WHERE idtipo_delito = ?";
  bd.query(consulta, [id], (error, delitos) => {
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
        delitos: delitos
      });
    }
  });
});
delito.post("/api/delito/crearDelito", (req, res) => {
  let formDatosDelito = {
    delito: req.body.delito,
    grado_delito_id: req.body.grado_id
  };
  let consulta = "INSERT INTO tipo_delito SET ? ";
  bd.query(consulta, [formDatosDelito], (error, delito) => {
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
        delito: delito
      });
    }
  });
});
delito.delete("/api/delito/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM tipo_delito WHERE idtipo_delito = ? ";
  bd.query(consulta, [id], (error, respuesta) => {
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
        respuesta: respuesta
      });
    }
  });
});
delito.put("/api/delito/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosDelito = {
    delito: req.body.delito,
    grado_delito_id: req.body.grado_id
  };
  let consulta = "UPDATE tipo_delito SET ? WHERE idtipo_delito = ?";
  bd.query(consulta, [formDatosDelito, id], (error, respuesta) => {
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
        respuesta: respuesta
      });
    }
  });
});
module.exports = delito;